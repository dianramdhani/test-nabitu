import { InvoiceType } from '@/lib/schemas/invoice'
import { Grid2, FormControl, TextField, InputLabel } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function FieldInvoiceName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceType>()

  return (
    <Grid2 component={FormControl} size={{ xs: 12, md: 6 }} required fullWidth>
      <InputLabel shrink htmlFor={'name'}>
        Name
      </InputLabel>
      <TextField
        {...register('name')}
        placeholder='Enter your invoice name'
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Grid2>
  )
}
