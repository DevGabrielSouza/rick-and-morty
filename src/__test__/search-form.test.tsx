'use client'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
    SearchForm,
    SearchBar,
    SearchFormGroup,
    SearchFormButton,
    SearchFormFilter,
} from '@/components/ui/search-form'

describe('SearchForm', () => {
    it('renders correctly', () => {
        const handleSubmit = jest.fn()
        const { getByText } = render(
            <SearchForm handleSubmit={handleSubmit}>
                <div>Test</div>
            </SearchForm>
        )
        expect(getByText('Test')).toBeInTheDocument()
    })

    it('calls handleSubmit on submit', () => {
        const handleSubmit = jest.fn()
        const { getByRole } = render(
            <SearchForm handleSubmit={handleSubmit} data-testid="my-form">
                <button type="submit">Submit</button>
            </SearchForm>
        )

        fireEvent.submit(getByRole('button'))

        expect(handleSubmit).toHaveBeenCalled()
    })
})

describe('SearchBar', () => {
    it('renders correctly', () => {
        const form = { register: () => {} }
        const { getByPlaceholderText } = render(<SearchBar form={form} />)
        expect(
            getByPlaceholderText('Search for a character')
        ).toBeInTheDocument()
    })
})

describe('SearchFormGroup', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <SearchFormGroup>
                <div>Test</div>
            </SearchFormGroup>
        )
        expect(getByText('Test')).toBeInTheDocument()
    })
})

describe('SearchFormButton', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <SearchFormButton>
                <div>Test</div>
            </SearchFormButton>
        )
        expect(getByText('Test')).toBeInTheDocument()
    })
})

describe('SearchFormFilter', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <SearchFormFilter>
                <div>Test</div>
            </SearchFormFilter>
        )
        expect(getByText('Test')).toBeInTheDocument()
    })
})
