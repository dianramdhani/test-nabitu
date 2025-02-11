'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { invoiceSchema } from '@/lib/schemas/invoiceSchema'
import { z } from 'zod'
import { useState } from 'react'
import { TextField, Button, MenuItem, Snackbar } from '@mui/material'

type InvoiceFormData = z.infer<typeof invoiceSchema>

export default function AddInvoicePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const onSubmit = (data: InvoiceFormData) => {
    console.log('Invoice Data:', data)
    setOpenSnackbar(true)
  }

  return (
    <div>
      <h1>Add Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Invoice Name'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          label='Invoice Number'
          {...register('invoiceNumber')}
          defaultValue={`INV-${Math.floor(Math.random() * 10000)}`}
          disabled
          fullWidth
        />
        <TextField
          label='Due Date'
          type='date'
          {...register('dueDate')}
          error={!!errors.dueDate}
          helperText={errors.dueDate?.message}
          fullWidth
        />
        <TextField
          label='Amount'
          type='number'
          {...register('amount', { valueAsNumber: true })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          fullWidth
        />
        <TextField select label='Status' {...register('status')} fullWidth>
          <MenuItem value='Paid'>Paid</MenuItem>
          <MenuItem value='Unpaid'>Unpaid</MenuItem>
          <MenuItem value='Pending'>Pending</MenuItem>
        </TextField>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message='Invoice added successfully'
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  )
}
