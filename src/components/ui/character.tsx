import { makeRemoteGetCharacter } from '@/lib/characters'
import { cn } from '@/lib/utils'
import React from 'react'

export async function getRemoteCharacter(characterId: string) {
    const character = await makeRemoteGetCharacter(characterId).get()
    return character
}

export type CharacterGenericProps<T = unknown> = {
    children: React.ReactNode
    className?: string
} & T

export default function Character({
    children,
    className,
}: CharacterGenericProps) {
    return (
        <div
            className={cn([
                'max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md',
                className,
            ])}
        >
            {children}
        </div>
    )
}

export type CharacterHeaderGenericProps<T = unknown> = {
    children: React.ReactNode
    className?: string
} & T

export function CharacterHeader({
    children,
    className,
}: CharacterHeaderGenericProps) {
    return (
        <div className={cn(['flex flex-col items-center', className])}>
            {children}
        </div>
    )
}

export type CharacterProfileImageGenericProps<T = unknown> = {
    children: React.ReactNode
    className?: string
} & T

export function CharacterProfileImage({
    children,
    className,
}: CharacterProfileImageGenericProps) {
    return (
        <div className={cn(['overflow-hidden rounded-t-xl', className])}>
            {children}
        </div>
    )
}

export type CharacterBadgesGenericProps<T = unknown> = {
    children: React.ReactNode
    className?: string
} & T

export function CharacterBadges({
    children,
    className,
}: CharacterBadgesGenericProps) {
    return <div className={cn(['my-2', className])}>{children}</div>
}

export type CharacterInfoSectionGenericProps<T = unknown> = {
    children: React.ReactNode
    className?: string
} & T

export function CharacterInfoSection({
    children,
    className,
}: CharacterInfoSectionGenericProps) {
    return <div className={cn(['my-4', className])}>{children}</div>
}

export type CharacterNotFoundGenericProps<T = unknown> = {
    children: React.ReactNode
    className?: string
} & T

export function CharacterNotFound({
    children,
    className,
}: CharacterNotFoundGenericProps) {
    return <div className={cn(['flex', className])}>{children}</div>
}
