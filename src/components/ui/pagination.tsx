import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface PaginationProps {
    pages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({
    pages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const [visiblePages, setVisiblePages] = useState<number[]>([])

    useEffect(() => {
        // Define as páginas visíveis com base na página atual
        const startIndex = Math.max(1, currentPage - 2)
        const endIndex = Math.min(pages, currentPage + 2)
        setVisiblePages(
            Array.from(
                { length: endIndex - startIndex + 1 },
                (_, i) => startIndex + i
            )
        )
    }, [currentPage, pages])

    return (
        <div className="flex flex-col items-center space-y-4">
            <nav className="flex items-center space-x-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                {visiblePages.map((pageNum) => (
                    <Button
                        key={pageNum}
                        size="sm"
                        variant={
                            pageNum === currentPage ? undefined : 'outline'
                        }
                        onClick={() => onPageChange(pageNum)}
                    >
                        {pageNum}
                    </Button>
                ))}
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pages}
                >
                    Next
                </Button>
            </nav>
            <p className="text-sm font-medium gray-500">
                Page {currentPage} of {pages}
            </p>
        </div>
    )
}
