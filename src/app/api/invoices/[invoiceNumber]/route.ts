import { invoiceModel } from '@/lib/models/invoice'
import { connectToDatabase } from '@/lib/mongodb'
import { zInvoice } from '@/lib/schemas/invoice'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { invoiceNumber: string } }
) {
  await connectToDatabase()
  const invoice = await invoiceModel.findOne(params)
  return NextResponse.json(invoice)
}

export async function PATCH(
  req: Request,
  { params }: { params: { invoiceNumber: string } }
) {
  await connectToDatabase()
  const rawData = await req.json()

  if (rawData.dueDate) {
    rawData.dueDate = new Date(rawData.dueDate)
  }

  const validationResult = zInvoice.partial().safeParse(rawData)

  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Validation failed', errors: validationResult.error.errors },
      { status: 400 }
    )
  }

  const validatedData = validationResult.data
  const updatedInvoice = await invoiceModel.findOneAndUpdate(
    params,
    validatedData,
    { new: true }
  )

  if (!updatedInvoice) {
    return NextResponse.json({ message: 'Invoice not found' }, { status: 404 })
  }

  return NextResponse.json({
    message: 'Invoice updated!',
    invoice: updatedInvoice,
  })
}

export async function DELETE(
  req: Request,
  { params }: { params: { invoiceNumber: string } }
) {
  await connectToDatabase()
  await invoiceModel.findOneAndDelete(params)
  return NextResponse.json({ message: 'Invoice deleted!' })
}
