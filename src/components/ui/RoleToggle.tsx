"use client"
import { useAuth, UserRole } from "@/lib/auth"
import { Beaker } from "lucide-react"

const roles: { label: string; value: UserRole }[] = [
  { label: "Facilitator", value: "facilitator" },
  { label: "Evaluator",   value: "evaluator"   },
]

export function RoleToggle() {
  const { user, switchRole } = useAuth()

  if (!user) return null

  return (
    <div className="flex items-center gap-2">
      {/* DEV badge */}
      <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full select-none">
        <Beaker className="w-3 h-3" />
        dev
      </span>

      {/* Toggle pill */}
      <div
        className="relative flex items-center rounded-full p-0.5 bg-slate-100 border border-slate-200 shadow-inner"
        style={{ minWidth: 210 }}
      >
        {/* Sliding active indicator */}
        <span
          className="absolute top-0.5 bottom-0.5 rounded-full bg-brand-navy shadow transition-all duration-200 ease-in-out"
          style={{
            width: "calc(50% - 2px)",
            left: user.role === "facilitator" ? "2px" : "calc(50%)",
          }}
        />

        {roles.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => switchRole(value)}
            className={`
              relative z-10 flex-1 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-150 focus:outline-none
              ${user.role === value
                ? "text-white"
                : "text-slate-500 hover:text-slate-700"}
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
