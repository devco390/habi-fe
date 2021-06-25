const FONT_WEIGHT = {
  BOLD: 700,
  NORMAL: 400
}

const SIZE_RESOLUTION = {
  DESKTOP: '1152px',
  MOBILE: '768px'
}

export default {
  font: {
    family: 'Roboto Condensed',
    normal: FONT_WEIGHT.NORMAL,
    bold: FONT_WEIGHT.BOLD
  },
  size: {
    desktop: SIZE_RESOLUTION.DESKTOP,
    mobile: SIZE_RESOLUTION.MOBILE
  },
  breakPoint: {
    mobile: `(min-width: ${SIZE_RESOLUTION.MOBILE})`,
    desktop: `(min-width: ${SIZE_RESOLUTION.DESKTOP})`
  },
  colors: {
    primaryColor: '#90decb',
    secondaryColor: '#90decb',
    textDark: '#333333',
    text: '#666666',
    highlight: '#999999',
    background: '#eeeeee',
    lightGray: '#dddddd',
    darkColor: '#373734',
    gmailRed: '#dd4b39',
    gmailDarkRed: '#ad3b2d',
    backgroundLogin: '#f5f5f5'
  },
  typography: {
    headline1: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '48px',
      lineHeight: '60px'
    },
    headline2: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '36px',
      lineHeight: '54px'
    },
    headline3: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '26px',
      lineHeight: '39px'
    },
    headline4: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '22px',
      lineHeight: '33px'
    },
    headline5: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '20px',
      lineHeight: '30px'
    },
    headline6: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '18px',
      lineHeight: '25px'
    },
    modal: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '32px',
      lineHeight: '48px'
    },
    medium: {
      fontWeight: FONT_WEIGHT.NORMAL,
      fontSize: '16px',
      lineHeight: '24px'
    },
    mediumBold: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '16px',
      lineHeight: '24px'
    },
    small: {
      fontWeight: FONT_WEIGHT.NORMAL,
      fontSize: '14px',
      lineHeight: '21px'
    },
    smallBold: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '14px',
      lineHeight: '21px'
    },
    extraSmall: {
      fontWeight: FONT_WEIGHT.NORMAL,
      fontSize: '12px',
      lineHeight: '18px'
    },
    extraSmallBold: {
      fontWeight: FONT_WEIGHT.BOLD,
      fontSize: '12px',
      lineHeight: '18px'
    }
  }
} as const
