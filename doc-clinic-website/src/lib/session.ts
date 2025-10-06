import type { SessionOptions } from 'iron-session';

// 1. Define the shape of our session data.
//    We'll start simple with just a login flag.
export interface SessionData {
  isLoggedIn: boolean;
}

// 2. Define the default state for a session.
export const defaultSession: SessionData = {
  isLoggedIn: false,
};

// 3. Define the session configuration options.
export const sessionOptions: SessionOptions = {
  cookieName: 'doc_clinic_session',
  password: process.env.SESSION_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};