import { client } from "@/sanity/client";
import Link from 'next/link';
import { type SanityDocument } from "next-sanity";
import { auth } from "@/../auth";
import { deletePost } from "../admin/actions";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){_id, title, slug, publishedAt}`;

export default async function BlogPage() {
  const posts: SanityDocument[] = await client.fetch(POSTS_QUERY);
  const session = await auth();

  return (
    <main>
      <div className="h-20" /> {/* Spacer */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Articole și Resurse</h1>

        {/* Admin Control: Create New Post Button */}
        {session && (
          <div className="text-center mb-12">
            <Link
              href="/admin/create"
              className="inline-block px-6 py-3 text-sm font-semibold text-white bg-sky-600 rounded-lg shadow-md hover:bg-sky-500 transition-colors"
            >
              + Create New Post
            </Link>
          </div>
        )}

        <ul className="space-y-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <li key={post._id} className="p-6 border rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-start">
                {/* Post Title and Date */}
                <div>
                  <Link href={`/blog/${post.slug.current}`} className="group">
                    <h2 className="text-2xl font-bold group-hover:text-sky-600 transition-colors">{post.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Published on {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </Link>
                </div>

                {/* ADMIN CONTROLS - Only render if logged in */}
                {session && (
                  <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                    <Link
                      href={`/admin/edit/${post.slug.current}`}
                      className="text-sm font-semibold text-sky-600 hover:text-sky-800"
                    >
                      Edit
                    </Link>
                    {/* The Delete button is a form that calls our server action */}
                    <form action={deletePost}>
                      <input type="hidden" name="postId" value={post._id} />
                      <button
                        type="submit"
                        className="text-sm font-semibold text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}