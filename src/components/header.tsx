import { Link } from "@/components/link";

export function Header() {
  return (
    <header className="container px-container py-5 flex items-center border-b">
      <Link className="font-bold text-xl leading-4" href="/">
        Sabigara.com
      </Link>
    </header>
  );
}
