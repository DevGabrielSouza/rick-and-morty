'use client'
import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
    useRef,
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
    characters: [] as Character[],
    info: {} as Info,
}

export function extractSearchParams(searchParams: URLSearchParams) {
    const searchParam = searchParams.get('search') || ''
    const statusParam = searchParams.get('status') || ''
    const pageParam = Number(searchParams.get('page')) || 1
    return { searchParam, statusParam, pageParam }
}

async function fetchCharacters(
    page: number,
    search: string,
    status: string,
    dispatch: ({}: Action) => void
) {
    try {
        const response = await makeRemoteGetCharacters(
            page,
            search,
            status
        ).get()
        dispatch({ type: 'setCharacters', payload: response.results })
        dispatch({ type: 'setInfo', payload: response.info })
    } catch (error) {
        console.error('Error fetching characters:', error)
    }
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
    dispatch: ({}: Action) => void
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
    const initialRender = useRef(true)

    const { searchParam, statusParam, pageParam } = extractSearchParams(
        useSearchParams()
    )

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        fetchCharacters(pageParam, searchParam, statusParam, dispatch)
    }, [pageParam, searchParam, statusParam, dispatch])

    return (
        <CharacterContext.Provider value={{ state, dispatch }}>
            {children}
        </CharacterContext.Provider>
    )
}
