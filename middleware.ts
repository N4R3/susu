import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected and public routes
const isProtectedRoute = createRouteMatcher([
  '/',
  '/exam-sprint(.*)',
  '/programozas(.*)',
  '/subjects(.*)',
  '/materials',
  '/results',
])

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
