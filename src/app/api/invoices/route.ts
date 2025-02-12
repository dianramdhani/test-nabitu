import { invoiceModel } from '@/lib/models/invoice'
import { connectToDatabase } from '@/lib/mongodb'
import { zInvoice } from '@/lib/schemas/invoice'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectToDatabase()
  const invoices = await invoiceModel.find()
  return NextResponse.json(invoices)
}

export async function POST(req: Request) {
  await connectToDatabase()
  const rawData = await req.json()

  if (rawData.dueDate) {
    rawData.dueDate = new Date(rawData.dueDate)
  }

  const validationResult = zInvoice.safeParse(rawData)

  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Validation failed', errors: validationResult.error.errors },
      { status: 400 }
    )
  }

  const validatedData = validationResult.data
  const latestInvoice = await invoiceModel.findOne().sort({ invoiceNumber: -1 })
  const nextNumber = latestInvoice
    ? `INV${parseInt(latestInvoice.invoiceNumber.replace('INV', '')) + 1}`
    : 'INV1001'
  const newInvoice = new invoiceModel({
    ...validatedData,
    invoiceNumber: nextNumber,
  })
  await newInvoice.save()

  return NextResponse.json({ message: 'Invoice created!', invoice: newInvoice })
}
