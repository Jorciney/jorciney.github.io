import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
      'disabled:pointer-events-none disabled:opacity-60',
      'active:scale-[0.98] transform'
    ].join(' ')
    
    const variants = {
      default: [
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25',
        'hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-600/30',
        'dark:from-blue-500 dark:to-blue-600 dark:shadow-blue-500/25',
        'dark:hover:from-blue-600 dark:hover:to-blue-700'
      ].join(' '),
      secondary: [
        'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md',
        'hover:from-gray-200 hover:to-gray-300 hover:shadow-lg',
        'dark:from-gray-800 dark:to-gray-700 dark:text-white',
        'dark:hover:from-gray-700 dark:hover:to-gray-600'
      ].join(' '),
      outline: [
        'border-2 border-gray-300 bg-transparent text-gray-700 shadow-sm',
        'hover:bg-gray-50 hover:border-gray-400 hover:shadow-md',
        'dark:border-gray-600 dark:text-gray-300',
        'dark:hover:bg-gray-800 dark:hover:border-gray-500'
      ].join(' '),
      ghost: [
        'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        'dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
      ].join(' '),
      destructive: [
        'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25',
        'hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-600/30'
      ].join(' ')
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[32px]',
      md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
      lg: 'px-6 py-2.5 text-base gap-2.5 min-h-[44px]',
      xl: 'px-8 py-3 text-lg gap-3 min-h-[48px]'
    }
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button