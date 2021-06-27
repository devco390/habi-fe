import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'
import * as nextImage from 'next/image'

export const decorators = [
  (Story) => (
    <RouterContext.Provider
      value={{
        prefetch: () => Promise.resolve()
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    </RouterContext.Provider>
  )
]

// Replace next/image for Storybook
// eslint-disable-next-line no-import-assign
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  // eslint-disable-next-line react/display-name
  value: (props) => {
    const { width, height } = props
    const ratio = (height / width) * 100
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: 'relative'
        }}
      >
        <img {...props} />
      </div>
    )
  }
})
