"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { mockScenarios } from "@/lib/data/scenarios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Plus, Trash2, Star } from "lucide-react"

export default function ReportPage() {
  const params = useParams()
  const scenarioId = params.id as string
  const scenario = mockScenarios.find(s => s.id === scenarioId)

  const [date] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
  const [duration, setDuration] = useState(0)
  const [notes, setNotes] = useState("")
  
  // Editable fields
  const [gaps, setGaps] = useState("")
  const [rating, setRating] = useState<number>(0)
  const [actions, setActions] = useState<{ id: string; task: string; owner: string; due: string }[]>([
    { id: "1", task: "Update Incident Response Plan contact list", owner: "", due: "" }
  ])

  useEffect(() => {
    // Load from local storage
    const savedNotes = localStorage.getItem(`notes_${scenarioId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (savedNotes) setNotes(savedNotes)
      
    const savedDuration = localStorage.getItem(`duration_${scenarioId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (savedDuration) setDuration(parseInt(savedDuration, 10))
  }, [scenarioId])

  if (!scenario) return <div className="p-8">Scenario not found</div>

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60)
    return `${mins} minutes`
  }

  const addAction = () => {
    setActions([...actions, { id: Math.random().toString(), task: "", owner: "", due: "" }])
  }

  const updateAction = (id: string, field: string, value: string) => {
    setActions(actions.map(a => a.id === id ? { ...a, [field]: value } : a))
  }

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-brand-muted hover:text-brand-navy transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Link>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={scenario.category}>{scenario.category.toUpperCase()}</Badge>
          <span className="text-sm font-medium text-brand-muted">After-Action Report</span>
        </div>
        <h1 className="text-4xl font-bold text-brand-navy mb-4">{scenario.title}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-brand-text">
          <div><strong className="text-brand-muted">Date:</strong> {date}</div>
          <div><strong className="text-brand-muted">Duration:</strong> {duration > 0 ? formatDuration(duration) : 'Not recorded'}</div>
          <div><strong className="text-brand-muted">Facilitator:</strong> Jane Facilitator</div>
        </div>
      </header>

      <div className="space-y-8">
        
        {/* SECTION 1 & 2 */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="flex flex-col">
            <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-brand-border pb-2">Exercise Summary</h2>
            <Card className="flex-1">
              <CardContent className="p-5">
                <p className="text-sm text-brand-muted mb-4">{scenario.situation_brief}</p>
                <div className="text-sm">
                  <strong className="block mb-2 text-brand-text">Participating Roles:</strong>
                  <ul className="list-disc pl-5 space-y-1 text-brand-muted">
                    {scenario.roles.map(r => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col">
            <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-brand-border pb-2">Key Decisions & Notes</h2>
            <Card className="flex-1 bg-slate-50">
              <CardContent className="p-5">
                {notes ? (
                  <p className="text-sm text-brand-text whitespace-pre-wrap font-medium">{notes}</p>
                ) : (
                  <p className="text-sm text-brand-muted italic">No facilitator notes were recorded during this exercise.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* SECTION 3: Identified Gaps */}
        <section>
          <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-brand-border pb-2">Identified Gaps</h2>
          <textarea 
            className="w-full bg-white border border-brand-border rounded-lg p-4 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-navy min-h-[120px] resize-y"
            placeholder="Document any process, communication, or resource gaps identified during the exercise..."
            value={gaps}
            onChange={(e) => setGaps(e.target.value)}
          />
        </section>

        {/* SECTION 4: Recommended Actions */}
        <section>
          <div className="flex items-center justify-between mb-4 border-b border-brand-border pb-2">
            <h2 className="text-lg font-bold text-brand-navy">Recommended Actions</h2>
            <Button variant="ghost" size="sm" onClick={addAction} className="h-8 gap-1 text-brand-orange hover:text-orange-700 hover:bg-orange-50">
              <Plus className="w-4 h-4" /> Add Task
            </Button>
          </div>
          
          <div className="space-y-3">
            {actions.map((act) => (
              <div key={act.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white border border-brand-border p-3 rounded-lg shadow-sm">
                <Input 
                  placeholder="Task description..." 
                  value={act.task} 
                  onChange={(e) => updateAction(act.id, 'task', e.target.value)} 
                  className="flex-1"
                />
                <div className="flex gap-3 w-full sm:w-auto">
                  <Input 
                    placeholder="Owner" 
                    value={act.owner} 
                    onChange={(e) => updateAction(act.id, 'owner', e.target.value)}
                    className="w-full sm:w-32" 
                  />
                  <Input 
                    type="date"
                    value={act.due} 
                    onChange={(e) => updateAction(act.id, 'due', e.target.value)}
                    className="w-full sm:w-40" 
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeAction(act.id)} className="text-slate-400 hover:text-red-500 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {actions.length === 0 && (
              <div className="text-center py-6 text-brand-muted text-sm border border-dashed border-brand-border rounded-lg">
                No follow-up actions added.
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: Readiness Rating */}
        <section>
          <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-brand-border pb-2">Overall Readiness Rating</h2>
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-sm text-brand-muted mb-6 text-center">Based on today&apos;s exercise, how prepared is the organization for this specific scenario?</p>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-2 rounded-full transition-transform hover:scale-110 focus:outline-none ${rating >= star ? 'text-brand-orange' : 'text-slate-200 hover:text-orange-200'}`}
                  >
                    <Star className="w-10 h-10 fill-current" />
                  </button>
                ))}
              </div>
              <div className="text-sm font-bold text-brand-navy uppercase tracking-widest min-h-[20px]">
                {rating === 0 && "Not Rated"}
                {rating === 1 && "1 - Unprepared"}
                {rating === 2 && "2 - Needs Significant Improvement"}
                {rating === 3 && "3 - Adequate"}
                {rating === 4 && "4 - Well Prepared"}
                {rating === 5 && "5 - Exceptionally Prepared"}
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  )
}
