'use client'

import { InvoiceProvider } from './_context/InvoiceContext'

export default function InvoiceListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <InvoiceProvider>{children}</InvoiceProvider>
}
