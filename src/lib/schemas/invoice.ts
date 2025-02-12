import { z } from 'zod'

export const zInvoice = z.object({
  name: z.string().min(1, 'Invoice name is required'),
  invoiceNumber: z.string(),
  dueDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Due date must be a valid date',
  }),
  amount: z.number().positive('Amount must be greater than 0'),
  status: z.enum(['Paid', 'Unpaid', 'Pending']),
})

export type InvoiceType = z.infer<typeof zInvoice>
