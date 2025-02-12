import { InvoiceType } from '@/lib/schemas/invoice'
import { Grid2, FormControl, TextField, InputLabel } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function FieldInvoiceNumber() {
  const { register } = useFormContext<InvoiceType>()

  return (
    <Grid2 component={FormControl} size={{ xs: 12, md: 6 }} required fullWidth>
      <InputLabel shrink htmlFor={'invoiceNumber'}>
        Number
      </InputLabel>
      <TextField {...register('invoiceNumber')} disabled />
    </Grid2>
  )
}
