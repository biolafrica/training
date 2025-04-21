import { updateSession } from "./app/utils/supabase/middleware";

export async function middleware(request) {
  return await updateSession(request)  // Calling the function that updates session
}

// Specify which paths the middleware should run for
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // This means it will match all routes except static assets and images

  ],
}