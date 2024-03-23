import { Button } from '@/components/ui/button'
import MainTitle from '@/components/ui/main-title'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-[100vh] items-center justify-center space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <MainTitle>Page not found</MainTitle>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Oops! The page you are looking for could not be found.
                </p>
                <Link href="/">
                    <Button variant="outline">Go back home</Button>
                </Link>
            </div>
        </div>
    )
}
