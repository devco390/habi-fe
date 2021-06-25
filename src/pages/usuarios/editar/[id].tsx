import Base from 'templates/Base'
import UserEdit from 'components/UserEdit'
import { useRouter } from 'next/router'

const UserEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Base>
      <UserEdit id={id as string} />
    </Base>
  )
}

export default UserEditPage
