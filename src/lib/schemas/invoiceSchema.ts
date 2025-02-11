import { z } from 'zod'

export const invoiceSchema = z.object({
  name: z.string().min(1, 'Invoice name is required'),
  invoiceNumber: z.string(),
  dueDate: z.string().min(1, 'Due date is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  status: z.enum(['Paid', 'Unpaid', 'Pending']),
})
