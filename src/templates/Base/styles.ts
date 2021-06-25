import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`

export const Sidebar = styled.div`
  background: #ffffff;
  box-shadow: inset 0 2px 12px -8px rgba(0, 0, 0, 0.6);
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  left: 0;
  padding: 1rem;
  position: fixed;
  top: 48px;
  transform: translate3d(-300px, 0, 0);
  transition: transform 0.5s;
  z-index: 1020;
  width: 180px;
  &.open {
    transform: translate3d(0, 0, 0);
  }
`

export const Nav = styled.nav``

export const MenuItem = styled.span`
  ${({ theme }) => css`
    ${theme.typography.small}
  `}
`

export const WrapperLogo = styled.div`
  > div {
    padding: 0;
  }
`

export const Header = styled.div`
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgb(48 48 48 / 15%);
  display: flex;
  min-height: 48px;
  width: 100%;
  z-index: 1020;
  > div {
    display: flex;
    align-items: center;
  }
`

export const IconHamburger = styled.a`
  box-sizing: content-box;
  cursor: pointer;
  display: inline-block;
  padding: 0 16px;
  vertical-align: middle;
  width: 18px;

  i {
    background-color: #5d5d66;
    border-radius: 2px;
    content: '';
    display: block;
    height: 3px;
    width: 100%;

    &:nth-child(2) {
      margin: 2px 0;
    }
  }

  &.close {
    i:nth-child(1) {
      animation: outT 0.8s backwards;
      animation-direction: reverse;
    }

    i:nth-child(2) {
      animation: outM 0.8s backwards;
      animation-direction: reverse;
    }

    i:nth-child(3) {
      animation: outBtm 0.8s backwards;
      animation-direction: reverse;
    }
  }

  &.open {
    i:nth-child(1) {
      animation: inT 0.8s forwards;
    }

    i:nth-child(2) {
      animation: inM 0.8s forwards;
    }

    i:nth-child(3) {
      animation: inBtm 0.8s forwards;
    }
  }

  @keyframes inM {
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }

  @keyframes outM {
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }

  @keyframes inT {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(5px) rotate(0deg);
    }
    100% {
      transform: translateY(5px) rotate(135deg);
    }
  }

  @keyframes outT {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(5px) rotate(0deg);
    }
    100% {
      transform: translateY(5px) rotate(135deg);
    }
  }

  @keyframes inBtm {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-5px) rotate(0deg);
    }
    100% {
      transform: translateY(-5px) rotate(135deg);
    }
  }

  @keyframes outBtm {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-5px) rotate(0deg);
    }
    100% {
      transform: translateY(-5px) rotate(135deg);
    }
  }
`

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  overflow: auto;
`

export const HamburgerOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  cursor: inherit;
  height: 100%;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 48px;
  transition: opacity 0.5s;
  visibility: hidden;
  width: 100%;
  z-index: 1010;

  &.open {
    opacity: 1;
    visibility: visible;
  }
`

export const Content = styled.div`
  ${({ theme }) => css`
    ${theme.typography.mediumBold}
    background: ${theme.colors.background};
    display: flex;
    justify-content: center;
    padding: 2rem;
  `}
`

export const SidebarItemActive = css`
  ${({ theme }) => css`
    ${theme.typography.mediumBold}
    color: ${theme.colors.primaryColor};
  `}
`

export const SidebarItem = styled.li<{ active: boolean }>`
  ${({ theme, active }) => css`
    ${theme.typography.medium}
    list-style: none;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
    ${active && SidebarItemActive}
    :hover {
      cursor: pointer;
      ${SidebarItemActive}
    }
  `}
`

export const LogoutWrapper = styled.div`
  padding-right: 1rem;
  a {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`
