import Base from 'templates/Base'
import CategoryEdit from 'components/CategoryEdit'
import { useRouter } from 'next/router'

const CategoryEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Base>
      <CategoryEdit id={id as string} />
    </Base>
  )
}

export default CategoryEditPage
