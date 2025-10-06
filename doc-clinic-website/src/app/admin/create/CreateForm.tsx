'use client'

import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { createPost } from "../actions"

export default function CreateForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <form
      action={createPost}
      className="max-w-4xl space-y-8"
    >
      {error === 'CreationFailed' && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          There was an error creating the post. Please try again.
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600"
          />
        </div>
      </div>

      {/* Image Field */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
          Main Image
        </label>
        <div className="mt-2">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
          />
        </div>
      </div>
      
      {/* Body Field */}
      <div>
        <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">
          Body
        </label>
        <div className="mt-2">
          <textarea
            id="body"
            name="body"
            rows={10}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-x-6">
        <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Publish Post
        </button>
      </div>
    </form>
  )
}