import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
    CharacterInfo,
    CharacterImage,
    getStatusColor,
} from '@/components/ui/character-card'

describe('CharacterInfo', () => {
    it('renders the character information correctly', () => {
        const { getByText } = render(
            <CharacterInfo
                name="Test Name"
                status="Alive"
                dimension="Test Dimension"
                episodes={5}
            />
        )

        expect(getByText('Test Name')).toBeInTheDocument()
        expect(getByText('Alive')).toBeInTheDocument()
        expect(getByText('Test Dimension')).toBeInTheDocument()
        expect(getByText('5 episodes')).toBeInTheDocument()
    })

    it('returns the correct status color', () => {
        expect(getStatusColor('Alive')).toBe('bg-green-500')
        expect(getStatusColor('Dead')).toBe('bg-red-500')
        expect(getStatusColor('Unknown')).toBe('bg-gray-500')
    })
})

describe('CharacterImage', () => {
    it('renders the character image correctly', () => {
        const { getByAltText } = render(
            <CharacterImage src="/public/app_screenshot.jpg" alt="test-alt" />
        )

        const image = getByAltText('test-alt') as HTMLImageElement
        expect(image.src).toContain('%2Fpublic%2Fapp_screenshot.jpg')
        expect(image.alt).toBe('test-alt')
    })
})
