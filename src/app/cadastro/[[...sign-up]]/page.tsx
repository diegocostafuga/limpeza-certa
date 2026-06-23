import { SignUp } from '@clerk/nextjs'

export default function CadastroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <SignUp />
    </div>
  )
}
