'use client'

import { AppBar, Badge, Box, IconButton, Switch, Toolbar } from '@mui/material'
import MenuIcon from './MenuIcon'
import { useState } from 'react'
import NotificationIcon from './NotificationIcon'
import ChatIcon from './ChatIcon'

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <AppBar position='static' color='inherit'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box component='span'>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <IconButton>
            <NotificationIcon />
          </IconButton>
          <IconButton>
            <Badge badgeContent={1} color='error'>
              <ChatIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
