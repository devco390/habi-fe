import Base from 'templates/Base'
import ProductEdit from 'components/ProductEdit'
import { useRouter } from 'next/router'

const ProductEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Base>
      <ProductEdit id={id as string} />
    </Base>
  )
}

export default ProductEditPage
