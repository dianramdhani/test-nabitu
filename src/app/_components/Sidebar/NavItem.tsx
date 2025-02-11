import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'

interface NavItemProps {
  name: string
  path: string
  icon: JSX.Element
}
export default function NavItem({ name, path, icon }: NavItemProps) {
  return (
    <ListItemButton
      component={Link}
      href={path}
      sx={{
        pl: 4,
        py: 2,
        '&:hover': {
          bgcolor: 'primary.lighter',
        },
        '&.Mui-selected': {
          bgcolor: 'primary.lighter',
          borderRight: '2px solid red',
          color: '#fff',
          '&:hover': {
            color: '#fff',
            bgcolor: 'primary.lighter',
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 32,
          svg: { width: 18, height: 18, color: '#fff' },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  )
}
