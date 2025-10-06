import { auth } from "@/../auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import CreateForm from "./CreateForm"

export default async function CreatePostPage() {
  const session = await auth()

  // Protect the page
  if (!session) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto p-8">
      <div className="h-20" /> {/* Spacer for header */}

      <div className="mb-8">
        <Link href="/admin" className="text-slate-600 hover:text-slate-900">
          &larr; Back to Dashboard
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
      
      <CreateForm />
    </main>
  )
}