import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="text-xl tracking-tight">
            <span className="font-bold text-white">TabletopExercise</span>
            <span className="font-bold text-brand-orange">.app</span>
          </div>
          <p className="text-sm text-slate-300">You don&apos;t know if your plan works until you test it.</p>
        </div>
        
        <div className="flex gap-6 text-sm">
          <Link href="#about" className="hover:text-brand-orange transition-colors">About</Link>
          <Link href="#scenarios" className="hover:text-brand-orange transition-colors">Scenarios</Link>
          <Link href="#pricing" className="hover:text-brand-orange transition-colors">Pricing</Link>
          <Link href="#contact" className="hover:text-brand-orange transition-colors">Contact</Link>
        </div>

        <div className="text-sm flex flex-col items-center md:items-end gap-1 text-slate-400">
          <Link href="https://tabletopexerciseguy.com" target="_blank" className="hover:text-white transition-colors">
            TabletopExerciseGuy.com
          </Link>
          <span>&copy; {new Date().getFullYear()} TabletopExercise.app</span>
        </div>
      </div>
    </footer>
  )
}
