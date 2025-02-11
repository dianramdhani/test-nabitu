import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Box, Container, CssBaseline } from '@mui/material'
import Sidebar from './_components/Sidebar'
import Topbar from './_components/Topbar'

export const metadata: Metadata = {
  title: 'Test Nabitu',
  description: 'Test Nabitu',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1 }}>
              <Topbar />
              <Container sx={{ mt: 4 }}>{children}</Container>
            </Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
