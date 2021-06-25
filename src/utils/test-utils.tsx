import { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

const customRender = (components: ReactElement, { ...renderOptions } = {}) =>
  render(
    <ThemeProvider theme={theme}>{components}</ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'

export { customRender as render }
