'use client'

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

interface NavItemProps {
  name: string
  path: string
  icon: JSX.Element
}
export default function NavItem({ name, path, icon }: NavItemProps) {
  const pathname = usePathname()
  const selected = useMemo(() => path === pathname, [path, pathname])

  return (
    <ListItemButton
      component={Link}
      selected={selected}
      href={path}
      sx={{
        pl: 4,
        py: 2,
        color: 'grey.500',
        '&.Mui-selected': {
          color: 'common.white',
          '&:hover': {
            color: 'common.white',
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 32,
          svg: {
            width: 18,
            height: 18,
            color: selected ? 'common.white' : 'grey.500',
          },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  )
}
