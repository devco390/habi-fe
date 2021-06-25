import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  border-radius: inherit;
  height: 100%;
  position: relative;
  > svg {
    border-radius: inherit;
    position: absolute;
  }
  > div {
    border-radius: inherit;
  }
  img {
    border-radius: inherit;
  }
`

export const WrapperError = styled.div`
  ${({ theme }) => css`
    align-items: center;
    border: 1px dashed ${theme.colors.lightGray};
    display: flex;
    flex-direction: column;
    height: 100%;
    left: 0;
    padding: 1rem 0.5rem;
    position: absolute;
    top: 0;
    width: 100%;

    h5 {
      ${theme.typography.medium}
      padding-bottom: 1rem;
    }
  `}
`

export const LinkStyle = css`
  ${({ theme }) => css`
    ${theme.typography.extraSmall}
    background-color: #ffffff;
    border: none;
    color: ${theme.colors.primaryColor};
    outline: none;
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `}
`
export const ReloadImage = styled.button`
  ${LinkStyle}
  padding-bottom: 0.5rem;
`

export const OpenNewTab = styled.a`
  ${LinkStyle}
  text-decoration: none;
`
