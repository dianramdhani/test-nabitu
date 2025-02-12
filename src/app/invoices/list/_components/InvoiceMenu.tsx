import Menu from '@/components/Icons/Menu'
import { IconButton, MenuItem, Popover, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { useInvoices } from '../_context/InvoiceContext'

interface InvoiceMenuProps {
  invoiceNumber: string
}

export default function InvoiceMenu({ invoiceNumber }: InvoiceMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { deleteInvoice } = useInvoices()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = useCallback(async () => {
    deleteInvoice(invoiceNumber)
    handleClose()
  }, [deleteInvoice, invoiceNumber])

  return (
    <>
      <IconButton onClick={handleClick}>
        <Menu />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleDelete}>
          <Typography>Delete</Typography>
        </MenuItem>
      </Popover>
    </>
  )
}
