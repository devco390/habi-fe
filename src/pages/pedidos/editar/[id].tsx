import Base from 'templates/Base'
import OrderEdit from 'components/OrderEdit'
import { useRouter } from 'next/router'

const OrderEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Base>
      <OrderEdit id={id as string} />
    </Base>
  )
}

export default OrderEditPage
