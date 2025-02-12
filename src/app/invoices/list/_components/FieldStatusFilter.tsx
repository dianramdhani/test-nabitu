import { Controller, useFormContext } from 'react-hook-form'
import { QueryType } from '../page'
import { MenuItem, Select } from '@mui/material'

export default function FieldStatusFilter() {
  const { control, setValue } = useFormContext<QueryType>()

  return (
    <Controller
      name='status'
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          onChange={(e) => setValue('status', e.target.value)}
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
