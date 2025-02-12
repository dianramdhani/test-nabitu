'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  CardContent,
  Card,
  Chip,
  IconButton,
} from '@mui/material'
import Menu from '@/components/Icons/Menu'
import { InvoiceType } from '@/lib/schemas/invoice'
import { format } from 'date-fns'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import FieldSearch from './_components/FieldSearch'
import FieldFilter from './_components/FieldFilter'
import { useDebounce } from '@uidotdev/usehooks'
import { useEffect } from 'react'

const invoices: InvoiceType[] = [
  {
    name: 'Invoice 1',
    invoiceNumber: 'INV-1001',
    dueDate: new Date('2025-02-15'),
    amount: 50000,
    status: 'Paid',
  },
  {
    name: 'Invoice 2',
    invoiceNumber: 'INV-1002',
    dueDate: new Date('2025-03-01'),
    amount: 75000,
    status: 'Pending',
  },
  {
    name: 'Invoice 2',
    invoiceNumber: 'INV-1003',
    dueDate: new Date('2025-03-01'),
    amount: 75000,
    status: 'Unpaid',
  },
]

export type QueryType = {
  search: string
  filter: string
}

export default function InvoiceListPage() {
  const methods = useForm<QueryType>({
    defaultValues: {
      search: '',
      filter: '',
    },
  })
  const query = useWatch(methods)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    console.log(debouncedQuery)
  }, [debouncedQuery])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant='h1'>My Invoices</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormProvider {...methods}>
            <FieldSearch />
            <FieldFilter />
          </FormProvider>
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoiceNumber}>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography>{invoice.name}</Typography>
                      <Typography variant='subtitle1' color='grey.500'>
                        {invoice.invoiceNumber}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {format(invoice.dueDate, 'MMM d, yyyy')}
                  </TableCell>
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
