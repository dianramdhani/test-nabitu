import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import ChevronDown from '@/components/Icons/ChevronDown'

export default function User() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        pl: 1,
        gap: 1,
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
          John Doe
        </Typography>
        <Typography
          sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'grey.500' }}
        >
          Verified Member
        </Typography>
      </Box>
      <Image
        src='/images/user-icon.png'
        width={46}
        height={46}
        priority
        alt='user icon'
      />
      <ChevronDown />
    </Box>
  )
}
