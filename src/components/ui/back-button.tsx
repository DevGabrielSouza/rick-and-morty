'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './button'

export default function BackButton() {
    const router = useRouter()
    return (
        <Button variant="secondary" onClick={() => router.back()}>
            Back
        </Button>
    )
}
