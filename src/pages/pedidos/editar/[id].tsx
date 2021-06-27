import Base from 'templates/Base'
import OrderEdit from 'components/OrderEdit'
import { useRouter } from 'next/router'
import useUser from 'hooks/useUser'

const OrderEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useUser()

  return <Base>{user && <OrderEdit id={id as string} />}</Base>
}

export default OrderEditPage
