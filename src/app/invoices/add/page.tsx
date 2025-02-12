'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { zInvoice, InvoiceType } from '@/lib/schemas/invoice'
import { useState } from 'react'
import {
  Button,
  Snackbar,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid2,
  Alert,
  LinearProgress,
} from '@mui/material'
import FieldInvoiceName from './_components/FieldInvoiceName'
import FieldInvoiceNumber from './_components/FieldInvoiceNumber'
import FieldDueDate from './_components/FieldDueDate'
import FieldAmount from './_components/FieldAmount'
import FieldStatus from './_components/FieldStatus'
import { useRouter } from 'next/navigation'

export default function AddInvoicePage() {
  const router = useRouter()
  const methods = useForm<InvoiceType>({
    resolver: zodResolver(zInvoice),
    defaultValues: {
      name: '',
      invoiceNumber: `INV-${Math.floor(Math.random() * 100000)}`,
      dueDate: undefined,
      amount: undefined,
      status: undefined,
    },
    mode: 'all',
  })
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const onSubmit = async (data: InvoiceType) => {
    console.log('Invoice Data:', data)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    setOpenSnackbar(true)
  }

  const onSnackbarClose = () => {
    setOpenSnackbar(false)
    router.push('/invoices/list')
  }

  return (
    <>
      <Typography variant='h1' sx={{ mb: 4 }}>
        Add Invoice
      </Typography>

      <FormProvider {...methods}>
        <Card component='form' onSubmit={methods.handleSubmit(onSubmit)}>
          {methods.formState.isSubmitting && <LinearProgress />}
          <CardHeader title='Invoice Form' />
          <CardContent component={Grid2} container spacing={2} rowSpacing={4}>
            <FieldInvoiceName />
            <FieldInvoiceNumber />
            <FieldDueDate />
            <FieldAmount />
            <FieldStatus />
          </CardContent>
          <CardActions>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              sx={{ minWidth: 250 }}
            >
              + Add Invoice
            </Button>
          </CardActions>
        </Card>
      </FormProvider>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={onSnackbarClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert severity='success'>Invoice added successfully</Alert>
      </Snackbar>
    </>
  )
}
