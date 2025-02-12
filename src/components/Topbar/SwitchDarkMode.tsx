import Moon from '@/components/Icons/Moon'
import Sun from '@/components/Icons/Sun'
import { styled, Switch, SwitchProps } from '@mui/material'
import { useState } from 'react'

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    top: 2,
    left: 2,
    backgroundColor: `${theme.palette.common.white} !important`,
    padding: 3,
    transitionDuration: '300ms',
    boxShadow:
      '2px 2px 5px rgba(0, 0, 0, 0.2), inset 2px 2px 5px rgba(0, 0, 0, 0.1)',
    '&.Mui-checked': {
      transform: 'translateX(26px)',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.grey[900],
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.background.default,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300,
    }),
  },

  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[500],
  },
}))

export default function SwitchDarkMode() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <StyledSwitch
      checked={darkMode}
      onChange={() => setDarkMode((prev) => !prev)}
      icon={<Sun />}
      checkedIcon={<Moon />}
    />
  )
}
