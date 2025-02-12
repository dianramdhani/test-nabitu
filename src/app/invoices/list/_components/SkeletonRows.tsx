import { TableRow, TableCell, Skeleton } from '@mui/material'

export default function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant='text' />
            <Skeleton variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton variant='circular' width={24} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
