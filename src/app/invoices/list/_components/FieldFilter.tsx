import { Controller, useFormContext } from 'react-hook-form'
import { QueryType } from '../page'
import { MenuItem, Select } from '@mui/material'

export default function FieldFilter() {
  const { control, setValue } = useFormContext<QueryType>()

  return (
    <Controller
      name='filter'
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          onChange={(e) => setValue('filter', e.target.value)}
          displayEmpty
          size='small'
        >
          <MenuItem value=''>All Status</MenuItem>
          <MenuItem value='Paid'>Paid</MenuItem>
          <MenuItem value='Unpaid'>Unpaid</MenuItem>
          <MenuItem value='Pending'>Pending</MenuItem>
        </Select>
      )}
    />
  )
}
