import { Character } from './Character'
import { Info } from './Info'

export type Action =
    | { type: 'setCharacters'; payload: Character[] }
    | { type: 'setInfo'; payload: Info }
