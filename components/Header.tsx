import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          BDCODE
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className="text-foreground hover:text-primary"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="text-foreground hover:text-primary"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="outline">Sign Up</Button>
      </div>
    </header>
  );
}
