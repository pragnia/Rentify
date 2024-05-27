import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/properties">Properties</Link>
        <Link href="/seller/post-property">Post Property</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
