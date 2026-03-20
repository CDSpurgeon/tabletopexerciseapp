import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-brand-border">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl tracking-tight">
          <span className="font-bold text-brand-navy">TabletopExercise</span>
          <span className="font-bold text-brand-orange">.app</span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <Link href="#features" className="text-sm font-medium text-brand-text hover:text-brand-orange transition-colors">Features</Link>
        <Link href="#scenarios" className="text-sm font-medium text-brand-text hover:text-brand-orange transition-colors">Scenarios</Link>
        <Link href="#pricing" className="text-sm font-medium text-brand-text hover:text-brand-orange transition-colors">Pricing</Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">Log In</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="orange">Start Free</Button>
        </Link>
      </div>
    </header>
  )
}
