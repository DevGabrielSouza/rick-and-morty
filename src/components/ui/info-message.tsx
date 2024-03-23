import React from 'react'
import BadgeContainer from './badger-container'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface InfoMessageProps {
    children: React.ReactNode
    className?: string
}

export default function InfoMessage({ children, className }: InfoMessageProps) {
    return (
        <BadgeContainer className={cn(['flex justify-center my-4', className])}>
            <Badge variant="outline" className="bg-sky-200 text-sky-800">
                {children}
            </Badge>
        </BadgeContainer>
    )
}
