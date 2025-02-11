'use client'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from '@mui/material'

const invoices = [
  {
    name: 'Invoice 1',
    invoiceNumber: 'INV-1001',
    dueDate: '2025-02-15',
    amount: 50000,
    status: 'Paid',
  },
  {
    name: 'Invoice 2',
    invoiceNumber: 'INV-1002',
    dueDate: '2025-03-01',
    amount: 75000,
    status: 'Pending',
  },
]

export default function InvoiceListPage() {
  const [filter, setFilter] = useState('')

  const filteredInvoices = filter
    ? invoices.filter((inv) => inv.status === filter)
    : invoices

  return (
    <div>
      <h1>My Invoices</h1>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        displayEmpty
      >
        <MenuItem value=''>All</MenuItem>
        <MenuItem value='Paid'>Paid</MenuItem>
        <MenuItem value='Unpaid'>Unpaid</MenuItem>
        <MenuItem value='Pending'>Pending</MenuItem>
      </Select>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Name</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount (IDR)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.invoiceNumber}>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        invoice.status === 'Paid'
                          ? 'green'
                          : invoice.status === 'Unpaid'
                          ? 'red'
                          : 'yellow',
                    }}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  {invoice.amount.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </TableCell>
                <TableCell>
                  <Button color='error'>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
