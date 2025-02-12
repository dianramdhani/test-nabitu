import { invoiceModel } from '@/lib/models/invoice'
import { connectToDatabase } from '@/lib/mongodb'
import { zInvoice } from '@/lib/schemas/invoice'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const querySchema = z.object({
  status: z.enum(['Paid', 'Unpaid', 'Pending']).optional(),
  search: z.string().optional(),
})

export async function GET(req: Request) {
  await connectToDatabase()

  const url = new URL(req.url)
  const status = url.searchParams.get('status') || undefined
  const search = url.searchParams.get('search') || undefined
  const validationResult = querySchema.safeParse({ status, search })

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: 'Invalid query parameters',
        errors: validationResult.error.errors,
      },
      { status: 400 }
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {}

  if (status) filter.status = status
  if (search) {
    const regex = new RegExp(search, 'i')
    filter.$or = [
      { name: regex },
      { invoiceNumber: regex },
      { amount: !isNaN(Number(search)) ? Number(search) : undefined },
      { status: regex },
    ].filter(Boolean)
  }

  return NextResponse.json(await invoiceModel.find(filter).lean())
}

export async function POST(req: Request) {
  await connectToDatabase()

  const rawData = await req.json()

  if (rawData.dueDate) rawData.dueDate = new Date(rawData.dueDate)

  const validationResult = zInvoice.safeParse(rawData)

  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Validation failed', errors: validationResult.error.errors },
      { status: 400 }
    )
  }

  const newInvoice = new invoiceModel(validationResult.data)
  await newInvoice.save()

  return NextResponse.json({ message: 'Invoice created!', invoice: newInvoice })
}
