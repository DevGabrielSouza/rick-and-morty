import { cn } from '@/lib/utils'
import React from 'react'

interface BadgeContainerProps {
    children: React.ReactNode
    className?: string
}

export default function BadgeContainer({
    children,
    className,
}: BadgeContainerProps) {
    return (
        <div className={cn(['flex justify-center my-4', className])}>
            {children}
        </div>
    )
}
