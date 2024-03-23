import React from 'react'
import BadgeContainer from './badger-container'
import { Badge } from './badge'

export default function Loading() {
    return (
        <BadgeContainer>
            <Badge variant="outline" className="bg-sky-200 text-sky-800">
                Loading...
            </Badge>
        </BadgeContainer>
    )
}
