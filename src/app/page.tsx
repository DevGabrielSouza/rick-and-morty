'use client'
import { Button } from '@/components/ui/button'
import CharacterCard, {
    CharacterImage,
    CharacterInfo,
} from '@/components/ui/character-card'
import { RadioFilter } from '@/components/ui/radio-filter'
import Logo from '@/components/ui/logo'
import {
    SearchForm,
    SearchBar,
    SearchFormButton,
    SearchFormGroup,
    SearchFormFilter,
} from '@/components/ui/search-form'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Character } from '@/types/Character'
import { makeRemoteGetCharacters } from '@/lib/characters'
import { debounce } from 'lodash'
import {
    extractSearchParams,
    useCharacterContext,
} from './contexts/CharacterContext'
import Pagination from '@/components/ui/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import GridResults from '@/components/ui/grid-results'
import { Badge } from '@/components/ui/badge'
import BadgeContainer from '@/components/ui/badger-container'
interface CharacterData {
    search: string
    status?: string
}

export default function Home() {
    const router = useRouter()
    const { state, dispatch } = useCharacterContext()
    const [error, setError] = useState<string | null>(null)

    const { searchParam, statusParam, pageParam } = extractSearchParams(
        useSearchParams()
    )

    const [page, setPage] = useState<number>(pageParam || 1)

    const availableStatusFilters = [
        { id: 'all', name: 'All', value: '' },
        { id: 'alive', name: 'Alive', value: 'alive' },
        { id: 'dead', name: 'Dead', value: 'dead' },
        { id: 'unknown', name: 'Unknown', value: 'unknown' },
    ]

    useEffect(() => {
        if (page === 0) return
        const fetchCharacters = async () => {
            try {
                const response = await makeRemoteGetCharacters(
                    page,
                    searchParam,
                    statusParam
                ).get()
                dispatch({ type: 'setCharacters', payload: response.results })
                dispatch({ type: 'setInfo', payload: response.info })
                router.push(
                    `?search=${searchParam}&status=${statusParam}&page=${page}`,
                    {
                        scroll: false,
                    }
                )
                setError(null)
            } catch (error: any) {
                setError(error.message)
            }
        }
        fetchCharacters()
    }, [page, searchParam, statusParam, dispatch, router])

    const form = useForm<CharacterData>()
    form.setValue('search', searchParam)
    form.setValue('status', statusParam)

    const handleSubmit = form.handleSubmit(
        debounce(async (data: CharacterData) => {
            try {
                const response = await makeRemoteGetCharacters(
                    0,
                    data.search,
                    data.status
                ).get()
                dispatch({ type: 'setCharacters', payload: response.results })
                dispatch({ type: 'setInfo', payload: response.info })
                setPage(0)
                router.push(
                    `?search=${data.search}&status=${
                        data.status || ''
                    }&page=${0}`,
                    {
                        scroll: false,
                    }
                )
                setError(null)
            } catch (error: any) {
                setError(error.message)
                router.push(
                    `?search=${data.search}&status=${
                        data.status || ''
                    }&page=${0}`,
                    {
                        scroll: false,
                    }
                )
            }
        }, 500)
    )

    const characters = state.characters
    const info = state.info

    return (
        <main className="min-h-screen p-12">
            <div className="text-center flex flex-col items-center justify-center">
                <Logo
                    width={80}
                    height={80}
                    alt="Search for Rick and Morty characters"
                />
                <h1 className="text-center font-semibold">
                    Search for your favorite Rick and Morty characters
                </h1>
            </div>

            <div className="flex flex-col my-4 items-center">
                <SearchForm handleSubmit={handleSubmit}>
                    <SearchFormGroup>
                        <SearchBar form={form} className="border-r-0" />
                        <SearchFormButton>
                            <Button
                                variant="default"
                                type="submit"
                                className="bg-sky-500 hover:bg-sky-600 rounded-none rounded-r h-full"
                            >
                                Search
                            </Button>
                        </SearchFormButton>
                    </SearchFormGroup>
                    <SearchFormGroup>
                        <SearchFormFilter className="items-center gap-2 mx-auto my-2">
                            {availableStatusFilters.map((statusFilterItem) => (
                                <RadioFilter
                                    key={statusFilterItem.id}
                                    name="status"
                                    id={statusFilterItem.id}
                                    value={statusFilterItem.value}
                                    label={statusFilterItem.name}
                                    checked={
                                        statusFilterItem.id === statusParam
                                    }
                                    form={form}
                                />
                            ))}
                        </SearchFormFilter>
                    </SearchFormGroup>
                </SearchForm>
            </div>

            {error && (
                <BadgeContainer className="flex justify-center my-4">
                    <Badge
                        variant="outline"
                        className="bg-red-200 text-red-800"
                    >
                        {error}
                    </Badge>
                </BadgeContainer>
            )}

            {!error && (
                <div>
                    {info && info.count && (
                        <BadgeContainer>
                            <Badge
                                variant="outline"
                                className="bg-sky-200 text-sky-800"
                            >
                                {info.count}{' '}
                                {info.count === 1 ? 'character' : 'characters'}{' '}
                                found
                            </Badge>
                        </BadgeContainer>
                    )}{' '}
                    <GridResults>
                        {characters &&
                            characters.map((character: Character) => (
                                <Link
                                    href={`/character/${character.id}`}
                                    key={character.id}
                                >
                                    <CharacterCard
                                        key={character.id}
                                        className="border border-gray-200 rounded-xl shadow-sm"
                                    >
                                        <CharacterImage
                                            src={character.image}
                                            alt={character.name}
                                        />
                                        <CharacterInfo
                                            name={character.name}
                                            status={character.status}
                                            dimension={character.location.name}
                                            episodes={character.episode.length}
                                            className="p-2"
                                        />
                                    </CharacterCard>
                                </Link>
                            ))}
                    </GridResults>
                    <div className="flex flex-col items-center justify-center mt-4">
                        {info && info.pages > 1 && (
                            <Pagination
                                pages={info.pages}
                                currentPage={pageParam}
                                onPageChange={setPage}
                            />
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}
