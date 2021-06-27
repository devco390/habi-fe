import {
  ICategoryGroup,
  IOrder,
  IProductQuantity,
  ORDER_STATES
} from 'models/order'
import { useEffect, useState } from 'react'
import * as S from './styles'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'

type BillProps = {
  order: IOrder
  showExpand?: boolean
  children?: React.ReactNode
}

const Bill = ({ order, showExpand = false, children }: BillProps) => {
  const [total, setTotal] = useState<number>(0)
  const [showProducts, setShowProducts] = useState<boolean>(false)

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
    console.log(order)
    setTotal(getTotal(order.categories))
  }, [order])

  const billBody = (
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
  )

  const stateChip = (
    <>
      <Chip
        className={'state'}
        size={'small'}
        icon={<DoneIcon />}
        label={
          order.state === ('in_progress' as ORDER_STATES)
            ? 'En progreso'
            : 'Cerrado'
        }
        color={
          order.state === ('in_progress' as ORDER_STATES)
            ? 'primary'
            : 'default'
        }
        variant="outlined"
      />
      {order.state === ('in_progress' as ORDER_STATES) && children}
    </>
  )

  return (
    <S.Bill showExpand={showExpand}>
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
          <span>Fecha: {useDateTimeFormat(order.createdAt)}</span>
        </S.BillInfo>
        {showExpand && (
          <>
            {showProducts ? (
              <S.Expand>
                <div
                  onClick={() => {
                    setShowProducts(false)
                  }}
                >
                  <span>Ocultar productos</span>
                  <ExpandLess />
                </div>
                <div>{stateChip}</div>
              </S.Expand>
            ) : (
              <S.Expand>
                <div
                  onClick={() => {
                    setShowProducts(true)
                  }}
                >
                  <span>Ver productos</span>
                  <ExpandMore />
                </div>
                <div>{stateChip}</div>
              </S.Expand>
            )}
          </>
        )}

        {showExpand ? (
          <Collapse in={showProducts} timeout="auto" unmountOnExit>
            {billBody}
          </Collapse>
        ) : (
          billBody
        )}
      </S.BillHeader>
    </S.Bill>
  )
}

export default Bill
