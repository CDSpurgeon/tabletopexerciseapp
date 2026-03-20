import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, Plus } from "lucide-react"
import { RoleToggle } from "@/components/ui/RoleToggle"

export function AuthHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-brand-border sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="text-xl tracking-tight">
          <span className="font-bold text-brand-navy">TabletopExercise</span>
          <span className="font-bold text-brand-orange">.app</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Role toggle for dev/testing */}
        <RoleToggle />

        <Button variant="orange" className="gap-2">
          <Plus className="w-4 h-4" />
          New Exercise
        </Button>
        <button className="flex items-center justify-center text-brand-navy hover:text-brand-orange transition-colors focus:outline-none focus:ring-2 focus:ring-brand-navy rounded-full">
          <UserCircle className="w-8 h-8" />
        </button>
      </div>
    </header>
  )
}
