import { InvoiceType } from '@/lib/schemas/invoice'
import {
  Grid2,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export default function FieldStatus() {
  const { control } = useFormContext<InvoiceType>()

  return (
    <Grid2 component={FormControl} size={{ xs: 12, md: 6 }} required fullWidth>
      <InputLabel shrink htmlFor={'status'}>
        Status
      </InputLabel>
      <Controller
        name='status'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            displayEmpty
            value={field.value || ''}
            renderValue={(value) =>
              value || (
                <Typography color='textDisabled'>Choose the status</Typography>
              )
            }
          >
            <MenuItem value='Paid'>Paid</MenuItem>
            <MenuItem value='Unpaid'>Unpaid</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
          </Select>
        )}
      />
    </Grid2>
  )
}
