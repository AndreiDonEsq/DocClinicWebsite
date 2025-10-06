import { signIn } from "@/../auth"
import { redirect } from "next/navigation";
import { LoginErrorDisplay } from "./LoginErrorDisplay";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2-xl font-bold text-center">Admin Login</h1>

                <LoginErrorDisplay />

                <form
                    action={async (formData) => {
                        "use server"
                        try {
                            await signIn("credentials", formData)
                        } catch (error) {

                            // If the error is a NEXT_REDIRECT, it's a successful login redirect.
                            // We must re-throw it to allow Next.js to complete the redirect.
                            if (error.digest?.startsWith('NEXT_REDIRECT')) {
                                throw error;
                            }

                            // This is the Next.js way to handle errors in Server Actions.
                            // It will re-render the page with the error code in the URL.
                            const errorType = (error as Error & { type?: string }).type;
                            if (errorType === 'CredentialsSignin') {
                                redirect('/login?error=CredentialsSignin');
                            } else {
                                console.log(error);
                                // Handle other potential errors if needed
                                redirect('/login?error=Unknown');
                            }
                        }
                    }}
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-slate-800 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    )
}