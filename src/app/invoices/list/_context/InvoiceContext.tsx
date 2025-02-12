import { createContext, useCallback, useContext, useState } from 'react'
import { InvoiceType } from '@/lib/schemas/invoice'
import { QueryType } from '../page'

type InvoiceContextType = {
  invoices: InvoiceType[]
  isLoading: boolean
  fetchInvoices: (query: QueryType) => void
  deleteInvoice: (invoiceNumber: string) => void
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export function useInvoices() {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider')
  }
  return context
}

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchInvoices = useCallback(async (query: QueryType) => {
    setIsLoading(true)
    const { search, status } = query
    const params = new URLSearchParams()

    if (search) params.append('search', search)
    if (status) params.append('status', status)

    const url = `/api/invoices${
      params.toString() ? `?${params.toString()}` : ''
    }`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch')
      setInvoices(await res.json())
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteInvoice = useCallback(async (invoiceNumber: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceNumber}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')

      setInvoices((prev) =>
        prev.filter((inv) => inv.invoiceNumber !== invoiceNumber)
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <InvoiceContext.Provider
      value={{ invoices, isLoading, fetchInvoices, deleteInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}
