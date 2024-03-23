import React from 'react'
import BadgeContainer from './badger-container'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
    children: React.ReactNode
    className?: string
}

export default function ErrorMessage({
    children,
    className,
}: ErrorMessageProps) {
    return (
        <BadgeContainer className={cn(['flex justify-center my-4', className])}>
            <Badge variant="outline" className="bg-red-200 text-red-800">
                {children}
            </Badge>
        </BadgeContainer>
    )
}
