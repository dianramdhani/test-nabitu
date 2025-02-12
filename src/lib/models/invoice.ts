import mongoose, { model } from 'mongoose'
import zodSchema, { extendZod } from '@zodyac/zod-mongoose'
import { zInvoice } from '../schemas/invoice'
import { z } from 'zod'

extendZod(z)
const invoiceSchema = zodSchema(zInvoice)
export const invoiceModel =
  mongoose.models.Invoice || model('Invoice', invoiceSchema)
