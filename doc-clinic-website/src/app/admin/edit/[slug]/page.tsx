import { auth } from "@/../auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { client } from "@/sanity/client"
import { type SanityDocument } from "next-sanity"
import { updatePost } from "../../actions"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export async function generateStaticParams() {
    const posts = await client.fetch<SanityDocument[]>(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    const { slug } = await params;

    const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }); // <-- Use the resolved slug


    if (!post) {
        return <div>Post not found.</div>
    }

    // Loop through all blocks in the body and join their text content
    type Block = {
        _type: 'block';
        children: { _type: 'span'; text: string }[];
    };

    const bodyText = post.body?.map((block: Block) =>
        block.children?.map((span) => span.text).join('')
    ).join('\n\n') || '';

    return (
        <main className="container mx-auto p-8">
            <div className="h-20" /> {/* Spacer */}
            <Link href="/admin">&larr; Back to Dashboard</Link>
            <h1 className="text-4xl font-bold my-8">Edit Post: {post.title}</h1>

            <form action={updatePost} className="max-w-4xl space-y-8">
                {/* We need to pass the document ID to the action */}
                <input type="hidden" name="postId" value={post._id} />

                {/* Title Field */}
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        defaultValue={post.title} // Pre-fill the title
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                </div>

                {/* Image Field */}
                <div>
                    <label htmlFor="image">Update Main Image (optional)</label>
                    <p className="text-sm text-slate-500 mb-2">If you upload a new image, it will replace the old one.</p>
                    <input type="file" name="image" id="image" accept="image/*" />
                </div>

                {/* Body Field */}
                <div>
                    <label htmlFor="body">Body</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={10}
                        required
                        defaultValue={bodyText} // Pre-fill the body
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                </div>

                <div className="flex justify-end gap-x-6">
                    <Link href="/admin">Cancel</Link>
                    <button type="submit">Update Post</button>
                </div>
            </form>
        </main>
    )
}