import { Box, Drawer, List, Typography } from '@mui/material'
import Image from 'next/image'
import AddInvoiceIcon from './AddInvoiceIcon'
import ListInvoicesIcon from './ListInvoicesIcon'
import NavItem from './NavItem'

export default function Sidebar() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          py: 4,
          boxSizing: 'border-box',
          color: 'common.white',
          bgcolor: 'grey.900',
        },
      }}
    >
      <Box pl={4} mb={4}>
        <Image
          src='/images/logo.svg'
          alt='Logo'
          width={166}
          height={44}
          priority
        />
      </Box>
      <List
        subheader={
          <Typography
            sx={{
              pl: 4,
              fontWeight: 'bold',
              fontSize: '0.875rem',
              color: 'grey.500',
            }}
          >
            MENU
          </Typography>
        }
      >
        <NavItem
          name='Add Invoice'
          path='/invoices/add'
          icon={<AddInvoiceIcon />}
        />
        <NavItem
          name='My Invoices'
          path='/invoices/list'
          icon={<ListInvoicesIcon />}
        />
      </List>
    </Drawer>
  )
}
