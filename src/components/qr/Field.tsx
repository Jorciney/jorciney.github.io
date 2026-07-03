// src/components/qr/Field.tsx
'use client'

import { cn } from '@/lib/utils'

export type FieldStatus = 'idle' | 'error' | 'success'

interface FieldProps {
  label: string
  hint?: string
  message?: string
  status?: FieldStatus
  htmlFor?: string
  children: React.ReactNode
}

export default function Field({ label, hint, message, status = 'idle', htmlFor, children }: FieldProps) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
          {label}
        </label>
        {hint && <span className="text-xs italic text-gray-400">{hint}</span>}
      </div>
      {children}
      {message && (
        <p
          className={cn(
            'mt-1.5 text-xs min-h-[16px]',
            status === 'error' && 'text-red-600 dark:text-red-400',
            status === 'success' && 'text-green-600 dark:text-green-400'
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
