import Base from 'templates/Base'
import IngredientEdit from 'components/IngredientEdit'
import { useRouter } from 'next/router'

const IngredientEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Base>
      <IngredientEdit id={id as string} />
    </Base>
  )
}

export default IngredientEditPage
