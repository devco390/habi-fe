import Link from 'next/link'
import Logo from 'components/Logo'
import useUser from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from 'components/Loader'
import { USER_LOGIN_STATES } from 'models/login'

import { logoutGmail } from 'firebase/AuthSession'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import LinkMaterial from '@material-ui/core/Link'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import * as S from './styles'
import { IUser, UserRol } from 'models/user'

export type BaseTemplateProps = {
  children?: React.ReactNode
}

interface IItemSidebar {
  name: string
  label: string
  url: string
  enabledRoles?: UserRol[]
}

const ITEMS_SIDEBAR: IItemSidebar[] = [
  { name: 'dashboard', label: 'Dashboard', url: 'dashboard' },
  {
    name: 'usuarios',
    label: 'Usuarios',
    url: 'usuarios',
    enabledRoles: ['it_manager', 'manager']
  }
]

const DEFAULT_CURRENT_ITEM = ITEMS_SIDEBAR[0].url

const Base = ({ children }: BaseTemplateProps) => {
  const { route } = useRouter()
  const { user }: { user: IUser | undefined | null } = useUser()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentItem, setCurrentItem] = useState<string>(DEFAULT_CURRENT_ITEM)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickLink = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement)
    event.preventDefault()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = () => {
    logoutGmail()
      .then(() => {
        console.log('logout success')
      })
      .catch((error) => {
        console.log(`Logout failed ${error}`)
      })
  }

  const showItemByRole = (item: IItemSidebar) => {
    return (
      !item.enabledRoles ||
      (user?.rol && item.enabledRoles.indexOf(user?.rol) !== -1)
    )
  }

  useEffect(() => {
    const path = route.split('/')[1]
    const currentItem = path.length === 0 ? DEFAULT_CURRENT_ITEM : path
    setCurrentItem(currentItem)
  }, [route])

  return (
    <>
      {user === USER_LOGIN_STATES.NOT_LOGGED ||
        (user === USER_LOGIN_STATES.NOT_KNOWN && <Loader loading={true} />)}
      {user && (
        <S.Wrapper>
          <S.Header>
            <div>
              <S.IconHamburger
                className={isOpen ? 'open' : 'close'}
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              >
                <i></i>
                <i></i>
                <i></i>
              </S.IconHamburger>
              <S.HamburgerOverlay className={isOpen ? 'open' : 'close'} />
              <S.WrapperLogo>
                <Logo />
              </S.WrapperLogo>
            </div>
            <S.LogoutWrapper>
              <LinkMaterial href="#" onClick={handleClickLink}>
                {user && user?.userName} <ArrowDropDownIcon />
              </LinkMaterial>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant={'selectedMenu'}
              >
                <MenuItem
                  onClick={() => {
                    handleClose()
                    logout()
                  }}
                >
                  <S.MenuItem>Cerrar sesión</S.MenuItem>
                </MenuItem>
              </Menu>
            </S.LogoutWrapper>
          </S.Header>

          <S.Main>
            <S.Sidebar className={isOpen ? 'open' : 'close'}>
              <S.Nav>
                <ul>
                  {ITEMS_SIDEBAR.map((item: IItemSidebar) => {
                    return (
                      showItemByRole(item) && (
                        <S.SidebarItem
                          key={item.name}
                          active={item.url === currentItem}
                        >
                          <Link href={`/${item.url}`}>{item.label}</Link>
                        </S.SidebarItem>
                      )
                    )
                  })}
                </ul>
              </S.Nav>
            </S.Sidebar>
            <S.Content>{children}</S.Content>
          </S.Main>
        </S.Wrapper>
      )}
    </>
  )
}

export default Base
