import { createGlobalStyle, css, DefaultTheme } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  } 

  a,
  a:active,
  a:focus,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  ${({ theme }: { theme: DefaultTheme }) => css`
    html {
      height: 100%;
    }

    body {
      font-family: ${theme.font.family};
      font-size: 1rem;
      height: 100%;
    }

    #__next {
      height: 100%;
    }
  `}
`

export default GlobalStyles
