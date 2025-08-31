import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'border border-transparent'
    ].join(' ')
    
    const variants = {
      default: [
        'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200',
        'dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 dark:border-blue-700/50'
      ].join(' '),
      secondary: [
        'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200',
        'dark:from-gray-800/50 dark:to-gray-700/50 dark:text-gray-300 dark:border-gray-600/50'
      ].join(' '),
      outline: [
        'bg-transparent border-2 border-gray-300 text-gray-700',
        'hover:bg-gray-50 hover:border-gray-400',
        'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-500'
      ].join(' '),
      success: [
        'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
        'dark:from-green-900/30 dark:to-green-800/30 dark:text-green-300 dark:border-green-700/50'
      ].join(' '),
      warning: [
        'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200',
        'dark:from-yellow-900/30 dark:to-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700/50'
      ].join(' '),
      danger: [
        'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200',
        'dark:from-red-900/30 dark:to-red-800/30 dark:text-red-300 dark:border-red-700/50'
      ].join(' ')
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs rounded-md',
      md: 'px-2.5 py-0.5 text-xs rounded-md',
      lg: 'px-3 py-1 text-sm rounded-lg'
    }
    
    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export default Badge