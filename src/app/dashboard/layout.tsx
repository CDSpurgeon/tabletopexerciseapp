import { AuthHeader } from "@/components/layout/AuthHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <AuthHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
