'use client'

import { AppBar, IconButton, styled, Toolbar } from '@mui/material'
import SwitchDarkMode from './SwitchDarkMode'
import User from './User'
import Chat from '../Icons/Chat'
import Notification from '../Icons/Notification'

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'highlight',
})<{ highlight?: boolean }>(({ highlight, theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  ...(highlight && {
    '&::after': {
      content: '""',
      width: 16,
      height: 16,
      position: 'absolute',
      top: -2,
      right: -2,
      border: `4px solid ${theme.palette.common.white}`,
      borderRadius: '50%',
      backgroundColor: theme.palette.error.main,
    },
  }),
  svg: { color: theme.palette.grey[500] },
}))

export default function Topbar() {
  return (
    <AppBar position='static' color='inherit' sx={{ boxShadow: 'unset' }}>
      <Toolbar
        sx={{
          height: 80,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <SwitchDarkMode />
        <StyledIconButton>
          <Notification />
        </StyledIconButton>
        <StyledIconButton highlight>
          <Chat />
        </StyledIconButton>
        <User />
      </Toolbar>
    </AppBar>
  )
}
