import { firestore } from 'firebaseApp/Admin'
import { IApiResponse } from 'models/api'
import {
  getSuccessResponse,
  getServerErrorResponse,
  getCreatedResponse,
  getBadRequestResponse
} from 'utils/api-utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
class GenericCrudService {
  collection: string

  constructor(collection: string) {
    this.collection = collection
  }

  async getAll<T>(): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .get()
        .then((querySnapshot: any) => {
          const dataTranformed: T[] = []
          querySnapshot.forEach((doc: any) => {
            const id = doc.id
            const data = doc.data()
            const { createdAt } = data
            try {
              dataTranformed.push({
                id,
                ...data,
                createdAt: createdAt.toDate()
              })
            } catch (e) {
              dataTranformed.push({
                id,
                ...data
              })
            }
          })
          return getSuccessResponse(dataTranformed)
        })
        .catch((error) => {
          return getBadRequestResponse(error)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }

  async getRecord(id: string): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .doc(id)
        .get()
        .then((doc: any) => {
          const data = doc.exists ? doc.data() : null
          const id = doc.id
          const { createdAt } = data
          return getSuccessResponse({
            ...data,
            id,
            createdAt: +createdAt.toDate()
          })
        })
        .catch((error) => {
          return getBadRequestResponse(error)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }

  async delete(id: string): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .doc(id)
        .delete()
        .then(() => {
          return getSuccessResponse({ deleted: true })
        })
        .catch((error) => {
          return getBadRequestResponse(error)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }

  async update<T>(id: string, dataRecord: T): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .doc(id)
        .set({ ...dataRecord, createdAt: new Date() }, { merge: true })
        .then(() => {
          return getSuccessResponse({ updated: true })
        })
        .catch((error) => {
          return getBadRequestResponse(error)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }

  async updateRecordWithKeyValidation<T>(
    id: string,
    dataRecord: T,
    fieldToMatch: string,
    valueToMatch: string
  ): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .where(fieldToMatch, '==', valueToMatch)
        .get()
        .then(({ docs }) => {
          const docsData = docs
            .filter((doc: any) => {
              const docId = doc.id
              return docId !== id
            })
            .map((doc: any) => {
              return doc.data()
            })

          const data = docsData[0] || null

          if (data === null) {
            return firestore
              .collection(this.collection)
              .doc(id)
              .set({ ...dataRecord, createdAt: new Date() }, { merge: true })
              .then(() => {
                return getSuccessResponse({ updated: true })
              })
              .catch((error) => {
                return getBadRequestResponse(error)
              })
          } else {
            throw new Error('primary_key_violation')
          }
        })
        .catch((error) => {
          return getBadRequestResponse(error.message)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }

  async add<T>(dataRecord: T): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .add({
          ...dataRecord,
          createdAt: new Date(),
          lastUpdate: new Date()
        })
        .then((ref) => {
          return getCreatedResponse({ id: ref.id })
        })
        .catch((error) => {
          return getBadRequestResponse(error.message)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }

  async addWithFieldValidation<T>(
    dataRecord: T,
    fieldToMatch: string,
    valueToMatch: string
  ): Promise<IApiResponse> {
    try {
      return firestore
        .collection(this.collection)
        .where(fieldToMatch, '==', valueToMatch)
        .get()
        .then(({ docs }) => {
          const docsData = docs
            .filter((doc: any) => {
              return doc.exists
            })
            .map((doc: any) => {
              return doc.data()
            })

          const data = docsData[0] || null

          if (data === null) {
            return firestore
              .collection(this.collection)
              .add({
                ...dataRecord,
                createdAt: new Date(),
                lastUpdate: new Date()
              })
              .then((ref) => {
                return getCreatedResponse({ id: ref.id })
              })
              .catch((error) => {
                return getBadRequestResponse(error.message)
              })
          } else {
            throw new Error('existing_record')
          }
        })
        .catch((error) => {
          return getBadRequestResponse(error.message)
        })
    } catch (error) {
      return getServerErrorResponse(error)
    }
  }
}

export default GenericCrudService
