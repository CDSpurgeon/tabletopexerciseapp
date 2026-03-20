import { AuthHeader } from "@/components/layout/AuthHeader"

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AuthHeader />
      <main className="flex-1 bg-slate-50/50">
        {children}
      </main>
    </div>
  )
}
