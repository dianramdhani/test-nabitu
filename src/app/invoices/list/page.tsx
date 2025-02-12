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
  LinearProgress,
} from '@mui/material'
import { format } from 'date-fns'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import FieldSearch from './_components/FieldSearch'
import FieldStatusFilter from './_components/FieldStatusFilter'
import { useDebounce } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import SkeletonRows from './_components/SkeletonRows'
import InvoiceMenu from './_components/InvoiceMenu'
import { useInvoices, withInvoiceProvider } from './_context/InvoiceContext'

export type QueryType = {
  search: string
  status: string
}

function InvoiceListPage() {
  const methods = useForm<QueryType>({
    defaultValues: {
      search: '',
      status: '',
    },
  })
  const query = useWatch(methods) as QueryType
  const debouncedQuery = useDebounce(query, 300)
  const { fetchInvoices, isLoading, invoices } = useInvoices()

  useEffect(() => {
    fetchInvoices(debouncedQuery)
  }, [debouncedQuery, fetchInvoices])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant='h1'>My Invoices</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormProvider {...methods}>
            <FieldSearch />
            <FieldStatusFilter />
          </FormProvider>
        </Box>
      </Box>

      <Card>
        {isLoading && <LinearProgress />}
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
              {isLoading && !invoices.length && <SkeletonRows />}
              {!isLoading && !invoices.length && (
                <TableCell colSpan={5} height={300} align='center'>
                  No invoices
                </TableCell>
              )}
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
                    <InvoiceMenu invoiceNumber={invoice.invoiceNumber} />
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

export default withInvoiceProvider(InvoiceListPage)
