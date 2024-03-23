import { cn } from '@/lib/utils'
import React from 'react'

interface MainTitleProps {
    children: React.ReactNode
    className?: string
}

export default function MainTitle({ children, className }: MainTitleProps) {
    return (
        <div>
            <h1
                className={cn([
                    'text-3xl font-bold tracking-tighter sm:text-5xl',
                    className,
                ])}
            >
                {children}
            </h1>
        </div>
    )
}
