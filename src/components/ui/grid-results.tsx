import { cn } from '@/lib/utils'
import React from 'react'

interface GridResultsProps {
    children: React.ReactNode
    className?: string
}

export default function GridResults({ children, className }: GridResultsProps) {
    return (
        <div
            className={cn([
                'grid cols-1 xl:cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5',
                className,
            ])}
        >
            {children}
        </div>
    )
}
