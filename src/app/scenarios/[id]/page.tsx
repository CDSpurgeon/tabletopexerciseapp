"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { mockScenarios } from "@/lib/data/scenarios"
import { ArrowLeft, CheckCircle2, Circle, Pencil, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ScenarioDetail() {
  const params = useParams()
  const scenarioId = params.id as string
  const scenario = mockScenarios.find(s => s.id === scenarioId)
  
  const { user, upgradeToPro } = useAuth()
  const isPro = user?.tier === 'pro' || user?.tier === 'enterprise'

  // Interactive checklist state
  const [checklist, setChecklist] = useState<boolean[]>(
    new Array(scenario?.preflight_checklist.length || 0).fill(false)
  )

  const toggleChecklist = (index: number) => {
    const newChecklist = [...checklist]
    newChecklist[index] = !newChecklist[index]
    setChecklist(newChecklist)
  }

  if (!scenario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Scenario Not Found</h1>
        <Link href="/dashboard"><Button>Return to Dashboard</Button></Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-brand-muted hover:text-brand-navy mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Link>

      <div className="mb-8">
        <Badge variant={scenario.category} className="mb-3">{scenario.category.toUpperCase()}</Badge>
        <h1 className="text-3xl font-bold text-brand-navy mb-2">{scenario.title}</h1>
        <div className="text-sm text-brand-muted flex gap-4 font-medium">
          <span>{scenario.duration_min}-{scenario.duration_max} MIN</span>
          <span>{scenario.participants_min}-{scenario.participants_max} PARTICIPANTS</span>
          <span className="capitalize">{scenario.difficulty} DIFFICULTY</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          <section>
            <h2 className="text-sm font-bold tracking-widest text-brand-muted uppercase mb-4">Situation Brief — Read Aloud to Begin</h2>
            <Card className="border-l-4 border-l-brand-orange">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-brand-text whitespace-pre-line">
                  {scenario.situation_brief}
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-widest text-brand-muted uppercase mb-4">Exercise Injects</h2>
            <div className="space-y-4">
              {scenario.injects.length > 0 ? scenario.injects.map((inject) => (
                <Card key={inject.id} className="relative overflow-hidden pl-4">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-brand-border" />
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange font-bold">
                          T+{inject.time_offset_minutes} MIN
                        </Badge>
                        <h3 className="font-bold text-lg">{inject.title}</h3>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-brand-muted hover:text-brand-navy h-8 px-2 relative group"
                        onClick={isPro ? () => alert("Edit modal would open here.") : upgradeToPro}
                      >
                        {isPro ? (
                          <>
                            <Pencil className="w-3.5 h-3.5 mr-1.5" />
                            Edit
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 mr-1.5" />
                            Edit
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-10 shadow-sm">
                              Pro Feature
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-brand-text mb-4 whitespace-pre-line">{inject.description}</p>
                    <div className="bg-slate-50 p-4 rounded-md border border-brand-border">
                      <p className="text-sm italic text-brand-muted mb-3">
                        <span className="font-semibold text-brand-navy mr-2 not-italic">💬 Facilitator Prompt:</span>
                        {inject.facilitator_prompt}
                      </p>
                      {inject.discussion_questions.length > 0 && (
                        <div className="text-sm text-brand-text">
                          <strong className="block mb-1">Discussion Questions:</strong>
                          <ul className="list-disc pl-5 space-y-1">
                            {inject.discussion_questions.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <Card><CardContent className="p-6 text-center text-brand-muted">Injects will be available for this scenario soon.</CardContent></Card>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-widest text-brand-muted uppercase mb-4">Debrief Discussion</h2>
            <Card>
              <CardContent className="p-6">
                <ol className="list-decimal pl-5 space-y-3 text-brand-text">
                  {scenario.debrief_questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <Card className="border-brand-navy">
            <CardContent className="p-5">
              <h2 className="text-xs font-bold tracking-widest text-brand-navy uppercase mb-3">Before You Begin</h2>
              <div className="space-y-3 mb-6">
                {scenario.preflight_checklist.map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => toggleChecklist(i)}
                    className="flex items-start gap-3 w-full text-left group"
                  >
                    {checklist[i] ? (
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 group-hover:text-brand-navy shrink-0 mt-0.5 transition-colors" />
                    )}
                    <span className={`text-sm ${checklist[i] ? 'text-brand-muted line-through' : 'text-brand-text font-medium'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-brand-border flex flex-col items-center text-center">
                <Link href={`/exercise/${scenario.id}`} className="w-full">
                  <Button variant="orange" size="lg" className="w-full text-base py-6 shadow-md">
                    Launch Live Exercise
                  </Button>
                </Link>
                <p className="text-xs text-brand-muted mt-3">Switches to full-screen facilitator mode</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-xs font-bold tracking-widest text-brand-muted uppercase mb-3">Recommended Roles</h2>
              <ul className="space-y-2">
                {scenario.roles.map((role, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-brand-text font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-navy" />
                    {role}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-xs font-bold tracking-widest text-brand-muted uppercase mb-3">Learning Objectives</h2>
              <ul className="space-y-2">
                {scenario.learning_objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-text">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
