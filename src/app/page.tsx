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
import { toast } from '@/components/ui/use-toast'
import { Character } from '@/types/Character'
import { makeRemoteGetCharacters } from '@/lib/characters'
import { debounce } from 'lodash'
import { useCharacterContext } from './contexts/CharacterContext'
import Pagination from '@/components/ui/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
interface CharacterData {
    search: string
    status?: string
}

export default function Home() {
    const router = useRouter()
    const { state, dispatch } = useCharacterContext()
    const [page, setPage] = useState<number>(1)

    const searchParams = useSearchParams()
    const searchParam = searchParams.get('search') || ''
    const statusParam = searchParams.get('status') || ''
    const pageParam = Number(searchParams.get('page')) || 1

    const availableStatusFilters = [
        { id: 'all', name: 'All', value: '' },
        { id: 'alive', name: 'Alive', value: 'alive' },
        { id: 'dead', name: 'Dead', value: 'dead' },
        { id: 'unknown', name: 'Unknown', value: 'unknown' },
    ]

    useEffect(() => {
        if (page === 1) return

        makeRemoteGetCharacters(page, searchParam, statusParam)
            .get()
            .then((response) => {
                dispatch({ type: 'setCharacters', payload: response.results })
                dispatch({ type: 'setInfo', payload: response.info })
                router.push(
                    `?search=${searchParam}&status=${statusParam}&page=${page}`,
                    {
                        scroll: false,
                    }
                )
            })
    }, [page, searchParam, statusParam, dispatch, router])

    const form = useForm<CharacterData>()
    form.setValue('search', searchParam)
    form.setValue('status', statusParam)

    const handleSubmit = form.handleSubmit(
        debounce(async (data: CharacterData) => {
            try {
                const response = await makeRemoteGetCharacters(
                    page,
                    data.search,
                    data.status
                ).get()
                dispatch({ type: 'setCharacters', payload: response.results })
                dispatch({ type: 'setInfo', payload: response.info })
                router.push(
                    `?search=${data.search}&status=${
                        data.status || ''
                    }&page=${page}`,
                    {
                        scroll: false,
                    }
                )
            } catch (error) {
                toast({
                    title: 'Error',
                    description:
                        'An error occurred while fetching the characters',
                    className: 'bg-red-700 text-white border-none',
                })
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

            <div className="grid cols-1 xl:cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
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
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
                {info && info.pages > 1 && (
                    <Pagination
                        pages={info.pages}
                        currentPage={pageParam}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </main>
    )
}
