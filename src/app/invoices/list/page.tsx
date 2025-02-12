'use client'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
  CardContent,
  Card,
  Chip,
  IconButton,
} from '@mui/material'
import Menu from '@/components/Icons/Menu'

const invoices = [
  {
    name: 'Invoice 1',
    invoiceNumber: 'INV-1001',
    dueDate: '2025-02-15',
    amount: 50000,
    status: 'Paid',
  },
  {
    name: 'Invoice 2',
    invoiceNumber: 'INV-1002',
    dueDate: '2025-03-01',
    amount: 75000,
    status: 'Pending',
  },
  {
    name: 'Invoice 2',
    invoiceNumber: 'INV-1003',
    dueDate: '2025-03-01',
    amount: 75000,
    status: 'Unpaid',
  },
]

export default function InvoiceListPage() {
  const [filter, setFilter] = useState('')

  const filteredInvoices = filter
    ? invoices.filter((inv) => inv.status === filter)
    : invoices

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant='h1'>My Invoices</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder='Search'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SvgIcon>
                      <svg
                        width='18'
                        height='19'
                        viewBox='0 0 18 19'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          x='0.5'
                          y='0.5'
                          width='17'
                          height='18'
                          stroke='white'
                        />
                        <path
                          d='M8.25 15.0417C11.5637 15.0417 14.25 12.2061 14.25 8.70833C14.25 5.21053 11.5637 2.375 8.25 2.375C4.93629 2.375 2.25 5.21053 2.25 8.70833C2.25 12.2061 4.93629 15.0417 8.25 15.0417Z'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M15.75 16.625L12.4875 13.1812'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </SvgIcon>
                  </InputAdornment>
                ),
              },
            }}
            size='small'
          />
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
            size='small'
          >
            <MenuItem value=''>All Status</MenuItem>
            <MenuItem value='Paid'>Paid</MenuItem>
            <MenuItem value='Unpaid'>Unpaid</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
          </Select>
        </Box>
      </Box>

      <Card>
        <CardContent component={TableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.invoiceNumber}>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography>{invoice.name}</Typography>
                      <Typography variant='subtitle1' color='grey.500'>
                        {invoice.invoiceNumber}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={
                        invoice.status === 'Paid'
                          ? 'success'
                          : invoice.status === 'Unpaid'
                          ? 'error'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {invoice.amount.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Menu />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
