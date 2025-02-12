import { InvoiceType } from '@/lib/schemas/invoice'
import {
  Grid2,
  FormControl,
  TextField,
  InputLabel,
  InputAdornment,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function FieldAmount() {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceType>()

  return (
    <Grid2 component={FormControl} size={{ xs: 12, md: 6 }} required fullWidth>
      <InputLabel shrink htmlFor={'amount'}>
        Amount
      </InputLabel>
      <TextField
        {...register('amount', { valueAsNumber: true })}
        type='number'
        placeholder='Enter your invoice amount'
        error={!!errors.amount}
        helperText={errors.amount?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>Rp</InputAdornment>
            ),
          },
        }}
        sx={{
          '.MuiInputBase-root': { pl: 0 },
          '.MuiInputBase-input': { pl: 1 },
          '.MuiInputAdornment-root': {
            height: '100%',
            maxHeight: 'unset',
            width: 80,
            m: 0,
            bgcolor: 'background.default',
            justifyContent: 'center',
          },
        }}
      />
    </Grid2>
  )
}
