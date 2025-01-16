import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <main className='min-h-screen bg-black flex justify-center items-center'>
            <SignUp />
        </main>
    )
}