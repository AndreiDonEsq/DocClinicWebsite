'use client';

import { useFormState } from 'react-dom';
import { login } from '@/lib/actions';

export default function LoginForm() {
  // This hook connects our form to the 'login' server action.
  // 'state' will hold any return value, like an error message.
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-600 mb-1"
        >
          Parolă
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* If the server action returns an error, we display it here */}
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
      >
        Intră în cont
      </button>
    </form>
  );
}