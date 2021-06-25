import * as S from './styles'

export type LoaderProps = {
  loading: boolean
  message?: string
}
const Loader = ({ loading, message }: LoaderProps) => (
  <>
    {loading && (
      <S.Wrapper data-testid={'loader-wrapper'}>
        <S.WrapperDots>
          {[...Array(8).keys()].map((_, index: number) => (
            <span key={index} className={`circle circle-${index + 1}`}></span>
          ))}
        </S.WrapperDots>
        <S.WrapperMessage>
          <span>{message && message.length > 0 ? message : 'Cargando'}</span>
        </S.WrapperMessage>
      </S.Wrapper>
    )}
  </>
)

export default Loader
