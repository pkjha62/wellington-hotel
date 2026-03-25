import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-beige px-4 text-center">
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Page Not Found</p>
      <h1 className="mt-6 font-serif text-6xl uppercase tracking-[0.12em] text-charcoal sm:text-8xl">
        404
      </h1>
      <p className="mt-6 max-w-md mx-auto font-sans text-sm leading-7 text-text-secondary">
        The page you are looking for may have been moved or no longer exists. Please return to the homepage to continue exploring The Deoghar Grand.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-gold px-8 py-4 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
      >
        Return Home
      </Link>
    </main>
  );
}
