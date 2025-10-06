'use server'

import { client } from "@/sanity/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import slugify from "slugify"
import { type SanityDocument } from "next-sanity"
import { auth } from "@/../auth"

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string
    const body = formData.get('body') as string
    const imageFile = formData.get('image') as File

    // 1. Automatically generate the slug from the title
    const slug = slugify(title, { lower: true, strict: true })

    // 2. Handle the image upload
    let imageAsset: SanityDocument | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
        // The Sanity client can upload a file directly
        imageAsset = await client.assets.upload('image', imageFile);
    }

    // 3. Prepare the document to be created in Sanity
    const newPost = {
        _type: 'post',
        title,
        slug: {
            _type: 'slug',
            current: slug,
        },
        publishedAt: new Date().toISOString(),
        // Only include the image if it was uploaded
        ...(imageAsset && {
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset._id,
                },
            },
        }),
        // Sanity's rich text field (Portable Text) is an array of blocks
        body: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: body,
                    },
                ],
            },
        ],
    }

    // 4. Create the document in Sanity
    try {
        await client.create(newPost)
    } catch (error) {
        console.error('Failed to create post:', error)
        // Redirect back to the form with an error message
        redirect('/admin/create?error=CreationFailed');
    }

    // 5. Revalidate the blog page cache and redirect
    revalidatePath('/blog') // Tell Next.js to refresh the blog list
    redirect('/blog')
}

export async function deletePost(formData: FormData) {
    // Check for authentication
    const session = await auth()
    if (!session) {
        throw new Error('Unauthorized')
    }

    // Get the post ID from the form data
    const postId = formData.get('postId') as string
    if (!postId) {
        throw new Error('Post ID not found')
    }

    // Delete the document from Sanity
    try {
        await client.delete(postId)
    } catch (error) {
        console.error('Failed to delete post:', error)
    }

    // Revalidate the cache for the blog page
    revalidatePath('/blog')
}

export async function updatePost(formData: FormData) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')

    const postId = formData.get('postId') as string
    const title = formData.get('title') as string
    const body = formData.get('body') as string

    const slug = slugify(title, { lower: true, strict: true })

    // Prepare the update "patch"
    const patch = client.patch(postId)

    // Set the new values
    patch.set({
        title,
        'slug.current': slug,
        // Split the textarea content by line breaks and map to Sanity's block structure
        body: body.split('\n\n').map(paragraph => ({
            _type: 'block',
            children: [{
                _type: 'span',
                text: paragraph,
            }],
        })),
    })

    // Handle the image if a new one was uploaded
    const imageFile = formData.get('image') as File
    if (imageFile && imageFile.size > 0) {
        const imageAsset = await client.assets.upload('image', imageFile);
        patch.set({
            image: {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageAsset._id },
            },
        })
    }

    // Commit the patch to Sanity
    try {
        await patch.commit()
    } catch (error) {
        console.error('Failed to update post:', error)
        redirect(`/admin/edit/${slug}?error=UpdateFailed`);
    }

    // Revalidate caches and redirect
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`) // Also revalidate the specific post page
    redirect(`/blog/${slug}`)
}