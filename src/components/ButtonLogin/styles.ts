import styled, { css } from 'styled-components'

export const Wrapper = styled.button`
  ${({ theme }) => css`
    align-content: space-between;
    color: #fff;
    display: flex;
    font-size: 16px;
    font-weight: 800;
    transition: opacity 0.3s ease;
    user-select: none;
    height: 48px;
    border-radius: 5px;
    border: none;
    background-color: ${theme.colors.gmailRed};
    color: white;
    outline: none;
    padding: 0;
    cursor: pointer;
    width: 100%;

    &[disabled] {
      pointer-events: none;
      opacity: 0.6;
    }

    & > svg {
      margin-right: 8px;
    }

    &:hover {
      opacity: 0.7;
    }

    > div {
      height: 100%;
      width: 40px;
      background-color: ${theme.colors.gmailDarkRed};
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
      > div {
        display: flex;
      }
    }
    label {
      flex: 1 1 auto;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `}
`
