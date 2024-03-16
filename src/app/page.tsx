"use client";
import { Button } from "@/components/ui/button";
import CharacterCard, {
  CharacterImage,
  CharacterInfo,
} from "@/components/ui/character-card";
import { RadioFilter } from "@/components/ui/radio-filter";
import Logo from "@/components/ui/logo";
import {
  SearchForm,
  SearchBar,
  SearchFormButton,
  SearchFormGroup,
  SearchFormFilter,
} from "@/components/ui/search-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { Character } from "@/types/Character";
import { makeRemoteGetCharacters } from "@/lib/characters";
import { debounce } from "lodash";

interface CharacterData {
  search: string;
  status?: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [page, setPage] = useState<number>(1);

  const form = useForm<CharacterData>();

  const handleSubmit = form.handleSubmit(
    debounce(async (data: CharacterData) => {
      try {
        const response = await makeRemoteGetCharacters(
          page,
          data.search,
          data.status
        ).get();
        response.results && setCharacters(response.results);
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching the characters",
          className: "bg-red-700 text-white",
        });
      }
    }, 500)
  );

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
              <RadioFilter name="status" id="" label="All" form={form} />
              <RadioFilter name="status" id="alive" label="Alive" form={form} />
              <RadioFilter name="status" id="dead" label="Dead" form={form} />
              <RadioFilter
                name="status"
                id="unknown"
                label="Unknown"
                form={form}
              />
            </SearchFormFilter>
          </SearchFormGroup>
        </SearchForm>
      </div>

      <div className="grid cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 ">
        {characters &&
          characters.map((character: Character) => (
            <Link href={`/character/${character.id}`} key={character.id}>
              <CharacterCard
                key={character.id}
                className="border border-gray-200 rounded-xl shadow-sm"
              >
                <CharacterImage src={character.image} alt={character.name} />
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
    </main>
  );
}
