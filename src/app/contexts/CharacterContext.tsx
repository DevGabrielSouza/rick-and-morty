'use client'
import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from 'react'

import { Character } from '@/types/Character'

import { makeRemoteGetCharacters } from '@/lib/characters'
import { Action } from '@/types/Action'
import { Info } from '@/types/Info'
import { useRouter, useSearchParams } from 'next/navigation'

interface CharacterContextProps {
    children: ReactNode
}

const initialState = {
    info: {} as Info,
    characters: [],
}

function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case 'setCharacters':
            return { ...state, characters: action.payload }
        case 'setInfo':
            return { ...state, info: action.payload }
        default:
            throw new Error()
    }
}

interface CharacterContextValue {
    state: typeof initialState
    dispatch: (action: { type: string; payload: Character[] | Info }) => void
}

export const CharacterContext = createContext<
    CharacterContextValue | undefined
>(undefined)

export function useCharacterContext() {
    const context = useContext(CharacterContext)
    if (!context) {
        throw new Error(
            'useCharacterContext must be used within a CharacterProvider'
        )
    }
    return context
}

export function CharacterProvider({ children }: CharacterContextProps) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const router = useRouter()

    const searchParams = useSearchParams()
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const page = Number(searchParams.get('page')) || 1

    useEffect(() => {
        makeRemoteGetCharacters(page, search, status)
            .get()
            .then((response) => {
                dispatch({ type: 'setCharacters', payload: response.results })
                dispatch({ type: 'setInfo', payload: response.info })
            })
    }, [page, search, status, dispatch, router])
    return (
        <CharacterContext.Provider value={{ state, dispatch }}>
            {children}
        </CharacterContext.Provider>
    )
}
