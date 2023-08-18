import { createTheme } from '@mui/material/styles'

const palette = {
    red: '#A7001E',
    black: '#000000',
    blue: '#317AC1',
    grey: '#E5E7E6',
    greyText: '#7E7E7E',
    greyCard: '#CACACA',
    logocolor: '#ff2600',
    green: '#00f900',
}

const typo = {
    bigTitleBold: {
        fontSize: 38,
        fontWeight: 'bold',
    },
    bigTitle: {
        fontSize: 38,
    },
    titleBold: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
    },
    normal: {
        fontSize: 18,
        fontWeight: 'light',
    },
    normalBold: {
        fontSize: 18,
        fontWeight: 'bold',
    },
}

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            // light, dark, contrastText: will be calculated from palette.primary.main,
            main: palette.red,
        },
        blue: {
            main: palette.blue,
        },
        black: {
            main: palette.black,
        },
        background: {
            default: '#000000',
            paper: palette.grey,
        },
        secondary: {
            main: palette.greyText,
            dark: palette.greyCard,
            //light, dark: will be calculated from palette.secondary.main,
        },
        text: {
            primary: palette.red,
            secondary: '#000000',
        },
        logocolor: {
            main: palette.logocolor,
        },
        green: {
            main: palette.green,
        },
        /*custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },*/
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        ...typo,
        fontFamily: 'Montserrat, sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    spacing: 8,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1560,
        },
    },
})

export default theme
