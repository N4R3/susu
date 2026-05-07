import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">404 - Oldal nem található</h1>
        <p className="text-slate-600 mb-6">A keresett oldal nem létezik vagy el lett mozgatva.</p>
        <Link
          href="/"
          className="inline-block bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
        >
          Vissza a kezdőlapra
        </Link>
      </div>
    </div>
  );
}
