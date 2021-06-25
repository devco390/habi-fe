import * as S from './styles'

export type ButtonLoginProps = {
  children: React.ReactNode
  disabled: boolean
  onClick: () => void
}

const ButtonLogin = ({ children, disabled, onClick }: ButtonLoginProps) => (
  <S.Wrapper disabled={disabled} onClick={onClick}>
    {children}
  </S.Wrapper>
)

export default ButtonLogin
