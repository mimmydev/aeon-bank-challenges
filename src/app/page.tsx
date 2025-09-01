import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
          Welcome to
          <br />
          AEON Demo Challenges
        </h1>
        <p className="text-lg leading-8 text-muted-foreground mb-8">
          This is <mark>Challenge 1</mark>: A responsive navbar implementation
          using Next.js 15.5, React 19.1.1, and shadcn.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try Login Flow
          </Link>
        </div>
      </div>
    </div>
  );
}
