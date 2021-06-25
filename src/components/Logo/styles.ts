import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1.25rem;
    height: 100%;
    font-size: 1rem;
    @media (min-width: 768px) {
      font-size: 1.25rem;
    }

    h1 {
      color: ${theme.colors.darkColor};
      font-family: 'Times New Roman';
      font-size: 1em;
      margin: 0;
      padding: 0;
      font-weight: normal;
      user-select: none;
    }
  `}
`
