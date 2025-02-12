import { InvoiceType } from '@/lib/schemas/invoice'
import {
  Grid2,
  FormControl,
  TextField,
  InputLabel,
  InputAdornment,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export default function FieldAmount() {
  const {
    control,
    formState: { errors },
  } = useFormContext<InvoiceType>()

  return (
    <Grid2 component={FormControl} size={{ xs: 12, md: 6 }} required fullWidth>
      <InputLabel shrink htmlFor='amount'>
        Amount
      </InputLabel>
      <Controller
        name='amount'
        control={control}
        render={({ field: { onChange, value } }) => {
          const formattedValue = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          })
            .format(value)
            .replace('Rp', '')
            .trim()

          return (
            <TextField
              type='text'
              placeholder='Enter your invoice amount'
              value={value ? formattedValue : ''}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '')
                onChange(Number(rawValue))
              }}
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
          )
        }}
      />
    </Grid2>
  )
}
