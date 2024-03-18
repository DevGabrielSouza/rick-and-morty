import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '@/components/ui/pagination'

describe('Pagination', () => {
    it('renders the correct page buttons and calls onPageChange with the correct page number', () => {
        const onPageChange = jest.fn()
        const { getByText } = render(
            <Pagination pages={5} currentPage={3} onPageChange={onPageChange} />
        )

        expect(getByText('1')).toBeInTheDocument()
        expect(getByText('2')).toBeInTheDocument()
        expect(getByText('3')).toBeInTheDocument()

        fireEvent.click(getByText('1'))
        expect(onPageChange).toHaveBeenCalledWith(1)

        fireEvent.click(getByText('3'))
        expect(onPageChange).toHaveBeenCalledWith(3)
    })
})
