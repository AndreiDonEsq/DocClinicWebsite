import { signIn } from "@/../auth"
import { redirect } from "next/navigation";
import { LoginErrorDisplay } from "./LoginErrorDisplay";
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>

                <Suspense fallback={<div></div>}>
                    <LoginErrorDisplay />
                </Suspense>

                <form
                    action={async (formData) => {
                        "use server"
                        try {
                            await signIn("credentials", formData)
                        } catch (error) {
                            interface AuthError extends Error {
                                digest?: string;
                                type?: string;
                            }

                            const authError = error as AuthError;

                            if (authError.digest?.startsWith('NEXT_REDIRECT')) {
                                throw authError;
                            }

                            if (authError.type === 'CredentialsSignin' || authError.digest?.includes('CredentialsSignin')) {
                                redirect('/login?error=CredentialsSignin');
                            }

                            redirect('/login?error=Unknown');
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