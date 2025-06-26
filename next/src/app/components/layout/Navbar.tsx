import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              TeamBuilder
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/team" className="text-gray-700 hover:text-primary transition-colors">
              Équipes
            </Link>
            <Link href="/profiles" className="text-gray-700 hover:text-primary transition-colors">
              Profils
            </Link>
            <Button variant="outline">Se connecter</Button>
            <Button>Commencer</Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}