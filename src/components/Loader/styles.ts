import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  align-items: center;
  background: rgb(204 204 204 / 0.8);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  justify-items: center;
  left: 0;
  opacity: 1;
  position: fixed;
  top: 0;
  transition: opacity 2s;
  width: 100%;
  z-index: 20;
`

export const WrapperDots = styled.div`
  ${({ theme }) => css`
    height: 80px;
    .circle {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: ${theme.colors.primaryColor};
      border-radius: 50%;
      animation: loading 1.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) infinite;
      transform-origin: bottom center;
      position: relative;
      margin-left: 4px;
      &.circle-1 {
        animation-delay: 0.1s;
      }
      &.circle-2 {
        animation-delay: 0.2s;
      }
      &.circle-3 {
        animation-delay: 0.3s;
      }
      &.circle-4 {
        animation-delay: 0.4s;
      }
      &.circle-5 {
        animation-delay: 0.5s;
      }
      &.circle-6 {
        animation-delay: 0.6s;
      }
      &.circle-7 {
        animation-delay: 0.7s;
      }
      &.circle-8 {
        animation-delay: 0.8s;
      }
    }

    @keyframes loading {
      0% {
        transform: translateY(0px);
        background-color: ${theme.colors.primaryColor};
      }
      50% {
        transform: translateY(50px);
        background-color: ${theme.colors.primaryColor};
      }
      100% {
        transform: translateY(0px);
        background-color: ${theme.colors.primaryColor};
      }
    }
  `}
`

export const WrapperMessage = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline4}
    color: ${theme.colors.text};
    padding-top: 1rem;
    text-align: center;
    width: 100%;
    &:after {
      content: '';
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-name: loading-text;
      position: absolute;
    }

    @keyframes loading-text {
      0% {
        content: '';
      }

      25% {
        content: '.';
      }

      50% {
        content: '..';
      }

      75% {
        content: '...';
      }
    }
  `}
`
