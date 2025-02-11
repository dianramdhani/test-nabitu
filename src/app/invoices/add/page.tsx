'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { invoiceSchema } from '@/lib/schemas/invoiceSchema'
import { z } from 'zod'
import { ReactNode, useState } from 'react'
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid2,
  InputLabel,
  FormControl,
  styled,
  InputAdornment,
  Select,
} from '@mui/material'

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  '.MuiFormLabel-asterisk': { color: theme.palette.error.main },
}))

type InvoiceFormData = z.infer<typeof invoiceSchema>

export default function AddInvoicePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const onSubmit = (data: InvoiceFormData) => {
    console.log('Invoice Data:', data)
    setOpenSnackbar(true)
  }

  return (
    <>
      <Typography variant='h1' sx={{ mb: 4 }}>
        Add Invoice
      </Typography>

      <Card component='form' onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title='Invoice Form' />
        <CardContent component={Grid2} container spacing={2} rowSpacing={4}>
          <Grid2
            component={FormControl}
            size={{ xs: 12, md: 6 }}
            required
            fullWidth
          >
            <StyledInputLabel shrink htmlFor={'name'}>
              Name
            </StyledInputLabel>
            <TextField
              {...register('name')}
              placeholder='Enter your invoice name'
              error={!!errors.name}
              helperText={errors.name?.message}
              size='small'
            />
          </Grid2>
          <Grid2
            component={FormControl}
            size={{ xs: 12, md: 6 }}
            required
            fullWidth
          >
            <StyledInputLabel shrink htmlFor={'invoiceNumber'}>
              Number
            </StyledInputLabel>
            <TextField
              {...register('invoiceNumber')}
              placeholder='Enter your invoice number'
              size='small'
            />
          </Grid2>
          <Grid2
            component={FormControl}
            size={{ xs: 12, md: 6 }}
            required
            fullWidth
          >
            <StyledInputLabel shrink htmlFor={'dueDate'}>
              Due Date
            </StyledInputLabel>
            <TextField
              type='date'
              {...register('dueDate')}
              placeholder='DD/MM/YYYY'
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              size='small'
            />
          </Grid2>
          <Grid2
            component={FormControl}
            size={{ xs: 12, md: 6 }}
            required
            fullWidth
          >
            <StyledInputLabel shrink htmlFor={'amount'}>
              Amount
            </StyledInputLabel>
            <TextField
              {...register('amount', { valueAsNumber: true })}
              placeholder='Enter your invoice amount'
              error={!!errors.amount}
              helperText={errors.amount?.message}
              size='small'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>Rp</InputAdornment>
                  ),
                },
              }}
              sx={{
                '.MuiInputBase-root': {
                  pl: 0,
                },

                '.MuiInputAdornment-root': {
                  height: '100%',
                  maxHeight: 'unset',
                  width: 80,
                  bgcolor: 'background.default',
                  justifyContent: 'center',
                },
              }}
            />
          </Grid2>
          <Grid2
            component={FormControl}
            size={{ xs: 12, md: 6 }}
            required
            fullWidth
          >
            <StyledInputLabel shrink htmlFor={'status'}>
              Status
            </StyledInputLabel>
            <Select
              displayEmpty
              renderValue={(value) =>
                (value ?? (
                  <Typography color='textDisabled'>
                    Choose the status
                  </Typography>
                )) as ReactNode
              }
              {...register('status')}
              size='small'
            >
              <MenuItem value='Paid'>Paid</MenuItem>
              <MenuItem value='Unpaid'>Unpaid</MenuItem>
              <MenuItem value='Pending'>Pending</MenuItem>
            </Select>
          </Grid2>
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

      <Snackbar
        open={true}
        autoHideDuration={3000}
        message='Invoice added successfully'
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  )
}
