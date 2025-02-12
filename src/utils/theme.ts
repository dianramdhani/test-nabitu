'use client'

import { createTheme } from '@mui/material/styles'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#3C50E0',
    },
    background: {
      default: '#F1F5F9',
    },
    grey: {
      '300': '#E2E8F0',
      '500': '#64748B',
      '900': '#1C2434',
    },
    success: {
      main: '#34D399',
    },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          paddingInline: theme.spacing(4),
        }),
        title: {
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingTop: theme.spacing(4),
          paddingInline: theme.spacing(4),
        }),
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingInline: theme.spacing(4),
          paddingBottom: theme.spacing(4),
          justifyContent: 'flex-end',
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: 'relative',
          left: -14,
          fontSize: '0.875rem',
          fontWeight: 600,
          color: theme.palette.common.black,
          opacity: 1,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: 250,
          backgroundColor: theme.palette.common.white,
        }),
      },
      defaultProps: { size: 'small' },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: 250,
          backgroundColor: theme.palette.common.white,
        }),
      },
      defaultProps: { size: 'small' },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '.MuiTableCell-root': { fontSize: '1rem' },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          '.MuiTableCell-root': { fontWeight: 600 },
        }),
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '.MuiTableRow-root:last-child .MuiTableCell-root': {
            border: 'unset',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const color = ownerState.color as keyof typeof theme.palette
          const paletteColor = theme.palette[color]

          return paletteColor &&
            typeof paletteColor === 'object' &&
            'main' in paletteColor
            ? {
                backgroundColor: `${paletteColor.main}30`,
                color: paletteColor.main,
              }
            : {}
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          '.MuiFormLabel-asterisk': { color: theme.palette.error.main },
        }),
      },
    },
  },
})

export default theme
