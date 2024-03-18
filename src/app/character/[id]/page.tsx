import {
    CharacterBadges,
    CharacterHeader,
    CharacterInfoSection,
    CharacterNotFound,
    CharacterProfileImage,
    getRemoteCharacter,
} from '@/components/ui/character'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import BackButton from '@/components/ui/back-button'
import { getStatusColor } from '@/components/ui/character-card'

interface CharacterPageProps {
    params: {
        id: string
    }
}

export default async function CharacterPage({
    params: { id: characterId },
}: CharacterPageProps) {
    const character = await getRemoteCharacter(characterId)

    if (!character.name) {
        return (
            <CharacterNotFound className="text-center text-2xl font-semibold h-screen flex-col gap-2 items-center justify-center">
                Character not found
                <BackButton />
            </CharacterNotFound>
        )
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <CharacterHeader>
                <CharacterProfileImage>
                    <Image
                        src={character.image}
                        className="rounded-full"
                        width={200}
                        height={200}
                        alt={character.name}
                    />
                </CharacterProfileImage>

                <h1 className="mt-4 text-3xl font-bold">{character.name}</h1>
                <CharacterBadges>
                    <Badge
                        variant="outline"
                        className={`text-white ${getStatusColor(
                            character.status
                        )}`}
                    >
                        {character.status}
                    </Badge>
                    <Badge className="ml-2" variant="outline">
                        {character.species}
                    </Badge>
                    <Badge className="ml-2" variant="outline">
                        {character.gender}
                    </Badge>
                </CharacterBadges>
            </CharacterHeader>

            <CharacterInfoSection>
                <h2 className="text-xl font-semibold">Origin</h2>
                <p>{character.origin.name}</p>
            </CharacterInfoSection>
            <CharacterInfoSection>
                <h2 className="text-xl font-semibold">Last Known Location</h2>
                <p>{character.location.name}</p>
            </CharacterInfoSection>
            <CharacterInfoSection>
                <h2 className="text-xl font-semibold">Episodes</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {character.episode.map((episode: string) => {
                        const match = episode.match(/\d+$/)
                        if (match) {
                            const episodeNumber = match[0]
                            return (
                                <Badge
                                    className="w-20 bg-zinc-800 text-white text-center flex justify-center"
                                    variant="outline"
                                    key={episode}
                                >
                                    {episodeNumber}
                                </Badge>
                            )
                        }
                    })}
                </div>
            </CharacterInfoSection>

            <CharacterInfoSection>
                <h2 className="text-xl font-semibold">Created on</h2>
                <p>{new Date(character.created).toLocaleDateString('en-US')}</p>
            </CharacterInfoSection>

            <CharacterInfoSection>
                <BackButton />
            </CharacterInfoSection>
        </div>
    )
}
