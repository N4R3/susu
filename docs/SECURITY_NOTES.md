# Security Notes

## Authentication Architecture

### Clerk Authentication
- **Provider**: Clerk handles all authentication
- **Implementation**: @clerk/nextjs@5
- **Protected Routes**: All main routes require authentication via middleware
- **Public Routes**: /sign-in, /sign-up, static assets, Next.js internals

### Supabase Database (Optional)
- **Purpose**: Progress persistence only (optional)
- **No Supabase Auth**: Supabase Auth magic link flow was removed/deprecated
- **User Identity**: Uses Clerk user ID (TEXT, e.g., user_xxx), not Supabase auth.users UUID
- **RLS Policies**: Uses requesting_user_id() helper function to extract Clerk user ID from JWT claims

## Environment Variables

### Required for Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Optional for Progress Persistence
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Security Rules
- **CLERK_SECRET_KEY**: Server-side only, never expose to client
- **SUPABASE_SERVICE_ROLE_KEY**: Server-side only, never expose to client (not used in current implementation)

## Database Schema

### User ID Storage
- **Type**: TEXT (not UUID)
- **Format**: Clerk user ID (e.g., user_xxx)
- **Migration**: 001_study_progress.sql updated to use TEXT user_id
- **No Foreign Keys**: Removed REFERENCES auth.users(id) since Supabase Auth is not used

### Row Level Security (RLS)
- **Helper Function**: requesting_user_id() extracts Clerk user ID from JWT claims
- **Policy Pattern**: All policies use `user_id = requesting_user_id()`
- **Note**: Requires Supabase Clerk third-party auth configuration to verify Clerk user ID claim path

## Progress Persistence

### localStorage Fallback
- **Always Available**: Works without Clerk or Supabase
- **Data Stored**: Only metadata and small state (completion flags, scores)
- **No Content**: File contents, notes, or large data not stored in localStorage

### Supabase Sync (Optional)
- **Requires**: Clerk user ID and Supabase configuration
- **Fallback**: If Clerk user ID unavailable or Supabase not configured, uses localStorage-only mode
- **Sync Status**: "Helyi mentés" / "Supabase sync nincs konfigurálva" shown in UI

## Python Code Execution

### Pyodide Runner
- **Browser-Only**: Loaded dynamically from CDN (https://cdn.jsdelivr.net/pyodide/v0.23.4/full/)
- **Sandbox Policy**: Disallows dangerous modules (os, sys, subprocess, etc.)
- **Execution Limits**: 5 second timeout, 10,000 character output limit
- **No Server Execution**: All Python code runs in browser WebAssembly environment

### Sandbox Policy
- **File**: lib/utils/python-sandbox-policy.ts
- **Allowed Modules**: math, random, datetime, json, re, string
- **Disallowed Modules**: os, sys, subprocess, socket, http, urllib, etc.
- **Output Sanitization**: Removes potentially sensitive information from output

### Automatic Test-Based Self-Checking
- **Purpose**: Educational practice self-checking, not official assessment
- **Execution**: User code runs in-browser via Pyodide for controlled practice tasks
- **Test Cases**: Deterministic and simple (function return, stdout comparison)
- **Privacy**: Only test results (passed/total, percentage) stored, not full user code
- **Storage**: Full code content is not stored in Supabase by default
- **Disclaimer**: "Az automatikus ellenőrzés csak gyakorlási segítség, nem hivatalos értékelés."
- **UI Note**: "Ez böngészőben futó gyakorló Python. Nem teljes biztonsági sandbox."
- **Sandbox Policy**: Allows re, unicodedata, collections, json, hashlib, datetime, typing, math, sys (for stdout/stderr)
- **Blocked Modules**: os, subprocess, socket, requests, pathlib for security
- **Hungarian Wording**: "Automatikus önellenőrzés", "Nem hivatalos pontszám"

## File Upload and Preview

### Client-Side Only
- **No Server Upload**: File preview is client-side only (mammoth.js for DOCX)
- **No Storage**: Files are not stored in Supabase Storage or any backend
- **Temporary**: Preview is generated from uploaded file in browser memory

### Supported File Types
- **PDF**: Native browser preview
- **TXT/MD**: Direct text display
- **DOCX**: mammoth.js conversion to HTML (simplified rendering)
- **PPTX**: Fallback UI with download option (no preview)

## Academic Integrity

### Practice Exam Layer
- **Purpose**: Private study support, not cheating tool
- **Terminology**: Uses "Gyorsismétlő", "Vizsga előtti összefoglaló", "Önellenőrző", "Próbavizsga", "Minimum útvonal"
- **No Cheating Wording**: Avoids terms like "puska" or exam cheating references
- **Self-Check**: Solutions hidden behind toggle to encourage self-check before revealing answers

### Private Use Status
- **Personal Study Tool**: System is designed for personal study support
- **No Backend**: No backend/database/Pyodide added for exam-day use
- **No Cheating Features**: No interactive code execution or persistent progress saving for exam-day

## Security Best Practices

### Environment Variables
- Never commit .env.local to version control
- Use .env.example as template for required variables
- CLERK_SECRET_KEY must be server-side only
- SUPABASE_SERVICE_ROLE_KEY (if used) must be server-side only

### Clerk Configuration
- Configure allowed domains in Clerk dashboard
- Enable appropriate authentication methods (email/password, OAuth, etc.)
- Set up proper redirect URLs for sign-in/sign-up flows
- Enable session management settings as needed

### Supabase Configuration (Optional)
- Configure Supabase Clerk third-party auth if using JWT-based RLS
- Verify Clerk user ID claim path in JWT (typically "sub")
- Enable RLS on all tables
- Test RLS policies with different user sessions

### Client-Side Security
- No secrets in client-side code
- No API keys exposed to browser
- localStorage contains only metadata, not sensitive content
- File preview is client-side only, no server upload

## Migration Notes

### Supabase Auth Removal
- Supabase Auth magic link flow was removed/deprecated
- /login page (Supabase magic link) was removed
- Redirects to /sign-in (Clerk)
- PrivateAppGate fallback component removed (Clerk handles auth)

### Database Schema Changes
- user_id changed from UUID to TEXT
- Removed REFERENCES auth.users(id) constraints
- Added requesting_user_id() helper function for RLS
- Updated all RLS policies to use requesting_user_id()

### Progress Sync Changes
- progress-sync.ts updated to use Clerk user ID
- Added getClerkUserId() helper function
- All sync functions accept optional clerkUserId parameter
- Fallback to localStorage if Clerk user ID unavailable

## Future Considerations

### Clerk + Supabase JWT Integration
- Configure Supabase Clerk third-party auth for JWT-based RLS
- Verify Clerk user ID claim path (typically "sub" in JWT)
- Test requesting_user_id() function with actual Clerk JWT
- Update migration comments with verified claim path

### Additional Security Measures
- Consider rate limiting on API endpoints
- Add CSRF protection if needed
- Implement content security policy (CSP) headers
- Add logging for authentication events
- Implement audit logging for progress changes

## Final Release QA (2026-05-07)

### QA Checklist Completed
- [x] Typo check: "cliensoldalon" → "kliensoldalon" (already correct in codebase)
- [x] Auth: logged out user redirected from protected routes to Clerk sign-in
- [x] Auth: /sign-in works
- [x] Auth: signed-in user can access app
- [x] Auth: Clerk UserButton appears in navbar
- [x] Core routes: all 18 static pages generated successfully
- [x] Python runner: loads only on practice/coding pages
- [x] Automatic self-check: uses Hungarian wording "Nem hivatalos pontszám"
- [x] Manual self-scoring: Nem tudom / Részben / Tudom works
- [x] File preview: privacy notes say "kliensoldalon"
- [x] Supabase fallback: localStorage fallback works without Supabase env vars
- [x] Security wording: no "official grading" claim, no cheating-oriented wording
- [x] Lint: passed with pre-existing warnings
- [x] Build: passed successfully with 18 static pages

### Build Status
- 18 static pages generated
- Pre-existing warnings: React Hook dependencies in curriculum-map, Image alt prop in notes page
- Font override warnings for Geist and Geist Mono (non-blocking)

### Release Status
Private authenticated study app ready for personal May 9 exam preparation. All core features verified: Clerk authentication, Python runner, automatic self-check, manual self-scoring, file preview with privacy notes, Supabase fallback. No new features added, no redesign, no architecture changes.

## Study Materials Security (2026-05-07)

### File Storage
- **Location**: Files served from `public/materials/` directory
- **No Backend**: No file upload to Supabase Storage or any backend
- **Static Files**: Files are static assets served by Next.js
- **Access Control**: Access controlled by Clerk authentication via middleware

### File Preview
- **Client-Side Only**: All file preview happens in browser
- **No localStorage Storage**: File contents are not stored in localStorage
- **Privacy Note**: "A fájlok előnézete kliensoldalon történik. A fájltartalom nem kerül localStorage-ba."
- **Preview Modes**:
  - PDF: Inline iframe/object
  - TXT/MD: Client-side fetch and render
  - DOCX: mammoth.js conversion to HTML (simplified)
  - PPTX: Fallback with download/open buttons
  - ZIP: Download-only
  - repo/link: External link handling

### Material Data Model
- **Global Shared Records**: Materials are subject-agnostic in data model
- **Subject-Specific Filtering**: Filtering happens in UI components, not in data layer
- **No Duplication**: Single source of truth for all materials
- **8 Materials**: Informatika II (4), Programozás (2), Vezetékes hálózatok (2)
- **Missing Files**: Marked with status "missing" and previewMode "none" with red badge

### Central Material Registry
- **Location**: `/lib/mock-data/study-materials.ts`
- **Subject Filtering**: `getMaterialsBySubjectId(subjectId)` filters by subjectIds array
- **Helper Functions**: `/lib/utils/study-materials.ts` provides getAllStudyMaterials, getMaterialsBySubjectId, getMaterialById, getPreviewUrl, isPreviewable, getMaterialOpenAction, groupMaterialsBySubject
- **Preview Component**: `/components/materials/material-preview.tsx` handles different file types

### Subject Notes Pages
- **No Generic Demo Files**: Each subject shows only its own materials
- **Empty State**: When no materials exist for subject, shows empty state message
- **Privacy**: Same client-side preview model with privacy note

## Pyodide Runner Security (2026-05-07)

### Robust Singleton Loader
- **Race Condition Prevention**: Uses `pyodideLoadingPromise` to prevent multiple concurrent loads
- **Cached Instance**: Returns cached `pyodideInstance` if already loaded
- **Safe Loading**: `getPyodideInstance()` function handles loading state and errors
- **Browser Check**: Throws error if not in browser environment

### Safe Stdout/Stderr Capture
- **Fallback Strategy**: Tries `setStdout/setStderr` first, falls back to Python-side StringIO if unavailable
- **No Assumptions**: Does not assume setStdout/setStderr exist in Pyodide API
- **Error Handling**: Catches and logs errors when stdout/stderr setup fails
- **Output Retrieval**: `getCapturedOutput()` retrieves output from both JS-side and Python-side capture

### User-Friendly Error Messages
- **Hungarian Messages**: All error messages are in Hungarian for user clarity
- **Specific Errors**:
  - "A Python futtató még nem töltött be." (Pyodide not loaded)
  - "Szintaktikai hiba a kódban." (Syntax error)
  - "Hiányzó változó vagy függvény." (NameError)
  - "A kód futtatása túl sokáig tartott." (Timeout)
  - "Egy vagy több teszt nem sikerült." (AssertionError in tests)
- **No Raw JS Errors**: Users never see raw JavaScript errors like "Cannot read properties of undefined"

### Execution Safety
- **Code Validation**: Code validated before execution using python-sandbox-policy
- **Timeout Protection**: 5 second timeout prevents infinite loops
- **Output Sanitization**: Output sanitized to remove sensitive information
- **Sandbox Policy**: Disallows dangerous modules (os, sys, subprocess, socket, etc.)

