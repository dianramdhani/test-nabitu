import { invoiceModel } from '@/lib/models/invoice'
import { connectToDatabase } from '@/lib/mongodb'
import { zInvoice } from '@/lib/schemas/invoice'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase()
  const invoice = await invoiceModel.findById(params.id)
  return NextResponse.json(invoice)
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
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
  const updatedInvoice = await invoiceModel.findByIdAndUpdate(
    params.id,
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
  { params }: { params: { id: string } }
) {
  await connectToDatabase()
  await invoiceModel.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'Invoice deleted!' })
}
