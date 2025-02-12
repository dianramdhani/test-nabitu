import { InvoiceType } from '@/lib/schemas/invoice'
import { Grid2, FormControl, TextField, InputLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export default function FieldDueDate() {
  const {
    control,
    formState: { errors },
  } = useFormContext<InvoiceType>()

  return (
    <Grid2 component={FormControl} size={{ xs: 12, md: 6 }} required fullWidth>
      <InputLabel shrink htmlFor='dueDate'>
        Due Date
      </InputLabel>

      <Controller
        name='dueDate'
        control={control}
        render={({ field }) => (
          <TextField
            type='date'
            value={field.value ? field.value.toISOString().split('T')[0] : ''}
            onChange={(event) => field.onChange(new Date(event.target.value))}
            placeholder='DD/MM/YYYY'
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
          />
        )}
      />
    </Grid2>
  )
}
