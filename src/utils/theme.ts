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
    h1: { fontSize: 1.5 },
  },
  palette: {
    primary: {
      main: '#3C50E0',
    },
    background: {
      default: '#F1F5F9',
    },
    grey: {
      '500': '#64748B',
      '900': '#1C2434',
    },
    success: {
      main: '#34D399',
    },
    error: {
      main: '#f00',
    },
  },
})

export default theme
