import { ICategoryGroup, IOrder, IProductQuantity } from 'models/order'
import { useEffect, useState } from 'react'
import * as S from './styles'
import useDateTimeFormat from 'hooks/useDateTimeFormat'

type BillProps = {
  order: IOrder
}

const Bill = ({ order }: BillProps) => {
  const [total, setTotal] = useState<number>(0)

  const getTotal = (categories: ICategoryGroup[]): number => {
    let totalPrice = 0
    categories.map((caterory: ICategoryGroup) => {
      return caterory.products.map((product: IProductQuantity) => {
        totalPrice += product.price * product.quantity
      })
    })

    return totalPrice
  }

  useEffect(() => {
    setTotal(getTotal(order.categories))
  }, [order])

  return (
    <S.Bill>
      <S.BillHeader>
        <S.BillInfo>
          <span>Orden: {order.code}</span>
          <span>Mesero: {order.user?.userName}</span>
        </S.BillInfo>
        <S.BillInfo>
          <span>Cliente: {order.client.name}</span>
          <span>
            Teléfono:{' '}
            {order.client.phone === 0 || !order.client.phone
              ? ''
              : order.client.phone}
          </span>
        </S.BillInfo>
        <S.BillInfo>
          <h2>Total: $ {new Intl.NumberFormat().format(total)}</h2>
          <span>
            Fecha: {order.createdAt && useDateTimeFormat(order.createdAt)}
          </span>
        </S.BillInfo>
        <S.BillBody>
          <S.ProductGrid className={'header'}>
            <span>Cant.</span>
            <span>Producto</span>
            <span>Valor unitario</span>
            <span>Valor total</span>
          </S.ProductGrid>
          <S.BillCategories>
            {order.categories.map((categoryData: ICategoryGroup) => {
              return (
                <S.BillProductsWrapper key={categoryData.id}>
                  <h2>{categoryData.name}</h2>
                  {categoryData.products.map(
                    ({ id, name, quantity, price }: IProductQuantity) => {
                      const totalPrice = quantity * price
                      return (
                        <S.ProductGrid key={id}>
                          <span>{quantity}</span>
                          <span>{name}</span>
                          <span>$ {new Intl.NumberFormat().format(price)}</span>
                          <span>
                            $ {new Intl.NumberFormat().format(totalPrice)}
                          </span>
                        </S.ProductGrid>
                      )
                    }
                  )}
                </S.BillProductsWrapper>
              )
            })}
          </S.BillCategories>
        </S.BillBody>
      </S.BillHeader>
    </S.Bill>
  )
}

export default Bill
