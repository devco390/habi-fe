import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.backgroundLogin};
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`

export const LoginForm = styled.form`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    @media screen and ${theme.breakPoint.desktop} {
      height: auto;
      width: auto;
    }
  `}
`
export const WrapperLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
`
export const Content = styled.div`
  ${({ theme }) => css`
    background-color: #fff;
    height: 100%;
    width: 100%;
    padding: 2rem;
    @media screen and ${theme.breakPoint.desktop} {
      height: 350px;
      width: 350px;
    }

    input {
      background-color: #f8f8f8;
      width: 100%;
      padding: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      outline: none;
      box-sizing: border-box;
      margin-bottom: 1.5rem;
    }
    ::placeholder {
      color: #bebebe;
    }
  `}
`
