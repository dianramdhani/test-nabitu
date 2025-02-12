import { Controller, useFormContext } from 'react-hook-form'
import { QueryType } from '../page'
import { InputAdornment, TextField } from '@mui/material'
import Search from '@/components/Icons/Search'

export default function FieldSearch() {
  const { control, setValue } = useFormContext<QueryType>()

  return (
    <Controller
      name='search'
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          placeholder='Search'
          size='small'
          onChange={(e) => setValue('search', e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  )
}
