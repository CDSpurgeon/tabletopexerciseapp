"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { mockScenarios } from "@/lib/data/scenarios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Play, 
  Pause, 
  Square, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare,
  Lock,
  Send,
  History,
  Layout,
  Eye,
  EyeOff,
  User,
  Clock
} from "lucide-react"
import { RoleToggle } from "@/components/ui/RoleToggle"
import { useAuth } from "@/lib/auth"

interface LogEntry {
  id: string;
  timestamp: string;
  role: string;
  text: string;
  injectId: string;
}

export default function ExerciseRunner() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const scenarioId = params.id as string
  const scenario = mockScenarios.find(s => s.id === scenarioId)

  // Core State
  const [currentInjectIndex, setCurrentInjectIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  
  // Sync Channel
  const syncChannel = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    syncChannel.current = new BroadcastChannel('exercise_sync')
    return () => syncChannel.current?.close()
  }, [])

  useEffect(() => {
    if (syncChannel.current) {
      syncChannel.current.postMessage({ type: 'SYNC_INJECT', index: currentInjectIndex })
    }
  }, [currentInjectIndex])
  
  // Logging State
  const [currentNote, setCurrentNote] = useState("")
  const [sessionLogs, setSessionLogs] = useState<LogEntry[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Scroll to bottom when logs change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sessionLogs])

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleNext = useCallback(() => {
    if (scenario && currentInjectIndex < scenario.injects.length - 1) {
      setCurrentInjectIndex(prev => prev + 1)
    }
  }, [scenario, currentInjectIndex])

  const handlePrev = useCallback(() => {
    if (currentInjectIndex > 0) {
      setCurrentInjectIndex(prev => prev - 1)
    }
  }, [currentInjectIndex])

  const handleLogNote = () => {
    if (!currentNote.trim() || !scenario) return
    
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: formatTime(elapsedSeconds),
      role: user?.role || "facilitator",
      text: currentNote,
      injectId: scenario.injects[currentInjectIndex].id
    }

    setSessionLogs(prev => [...prev, newLog])
    setCurrentNote("")
  }

  const endExercise = () => {
    if (confirm("End this exercise? Your session logs will be used to generate the After-Action Report.")) {
      localStorage.setItem(`logs_${scenarioId}`, JSON.stringify(sessionLogs))
      localStorage.setItem(`duration_${scenarioId}`, elapsedSeconds.toString())
      router.push(`/reports/${scenarioId}`)
    }
  }

  if (!scenario) return <div className="p-8 text-brand-navy bg-white min-h-screen font-sans">Scenario not found</div>

  const injects = scenario.injects
  const currentInject = injects[currentInjectIndex]

  // Permissions Logic:
  // Facilitator only sees facilitator logs.
  // Evaluator sees everyone's logs.
  const filteredLogs = sessionLogs.filter(log => {
      if (user?.role === 'evaluator') return true;
      return log.role === 'facilitator';
  });

  return (
    <div className="h-screen bg-[#F8F9FB] text-brand-text flex flex-col overflow-hidden font-sans antialiased">
      
      {/* 1. TOP BREADCRUMB BAR (LIGHT THEME) */}
      <div className="bg-white h-7 flex items-center px-4 justify-between border-b border-brand-border text-[9px] font-bold tracking-widest text-brand-muted uppercase shrink-0">
        <div className="flex items-center gap-2">
          <span className="opacity-60">TabletopExercise.app</span>
          <span className="opacity-40">/</span>
          <span className="text-brand-navy">{scenario.title}</span>
        </div>
        <Link href="/dashboard" className="hover:text-brand-orange transition-colors px-2">
          Dashboard
        </Link>
      </div>

      {/* 2. MAIN HEADER (LIGHT BRAND ALIGNED) */}
      <header className="h-14 flex items-center justify-between px-6 shrink-0 bg-white border-b border-brand-border relative z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-base tracking-tight font-black mr-2">
            <span className="text-brand-navy">TABLETOP</span>
            <span className="text-brand-orange">.APP</span>
          </Link>
          <div className="h-4 w-px bg-brand-border mx-2 hidden md:block" />
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-brand-orange/10 rounded border border-brand-orange/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[9px] font-black text-brand-orange uppercase tracking-[0.15em]">Live</span>
          </div>
          <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">
            Inject {currentInjectIndex + 1} of {injects.length}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* TIMER SECTION (LIGHT) */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-0.5 px-3 border border-brand-border shadow-sm">
            <button 
              onClick={() => setIsRunning(!isRunning)} 
              className={`p-1.5 rounded-full transition-all ${isRunning ? 'text-brand-muted hover:text-brand-navy' : 'text-brand-orange animate-pulse'}`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="text-2xl font-mono font-bold tracking-tighter w-20 text-center tabular-nums text-brand-navy">
              {formatTime(elapsedSeconds)}
            </div>
          </div>

          <div className="hidden lg:block">
            <RoleToggle />
          </div>

          <Button 
            variant="outline" 
            className="border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-black text-[10px] uppercase h-8 px-3 tracking-widest"
            onClick={endExercise}
          >
            <Square className="w-3 h-3 mr-2 fill-current" />
            End
          </Button>
        </div>
      </header>
      
      {/* 4. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: ACTIVE INJECT CONTENT */}
        <main className="flex-1 flex flex-col min-w-0">
          
          {/* SCROLLABLE CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar bg-white">
            
            {/* ACTIVE INJECT CARD (LIGHT THEME) */}
            <Card className="bg-slate-50 border-brand-border shadow-sm relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                      INJECT {currentInjectIndex + 1}
                    </div>
                    <div className="text-[10px] font-bold text-brand-muted tracking-[0.1em]">
                      T + {currentInject.time_offset_minutes} MIN
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(`/exercise/${scenarioId}/projector?index=${currentInjectIndex}`, 'projector', 'width=1000,height=700')}
                      className="h-7 px-2 text-[9px] font-black uppercase tracking-widest border-brand-navy/20 hover:bg-brand-navy hover:text-white transition-all shadow-sm"
                    >
                      <Layout className="w-3 h-3 mr-1.5" />
                      Project
                    </Button>
                    <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-2 py-1 rounded shadow-sm text-[9px] font-black uppercase tracking-widest">
                      <Eye className="w-3 h-3" />
                      Projected
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-brand-navy leading-tight mb-4 tracking-tight">
                  {currentInject.title}
                </h2>
                <p className="text-base text-brand-text leading-relaxed max-w-4xl">
                  {currentInject.description}
                </p>
              </CardContent>
            </Card>

            {/* DISCUSSION PROMPT (LIGHT THEME) */}
            <Card className="bg-brand-navy border-none shadow-lg relative shrink-0">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange" />
              <CardContent className="p-6 text-center md:text-left">
                <h3 className="text-[9px] font-black tracking-[0.25em] text-white/40 uppercase mb-3 flex items-center justify-center md:justify-start gap-2">
                  <History className="w-3 h-3 opacity-50" />
                  DISCUSSION PROMPT
                </h3>
                <p className="text-xl md:text-2xl font-bold text-white italic leading-snug">
                  &quot;{currentInject.facilitator_prompt}&quot;
                </p>
              </CardContent>
            </Card>

            <div className="flex-1" />
          </div>

          {/* CHATROOM SECTION (BOTTOM DOCKED) */}
          <div className="shrink-0 h-[240px] flex flex-col bg-slate-50 border-t border-brand-border shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10">
            
            {/* CHAT HEADER */}
            <div className="px-6 py-3 border-b border-brand-border bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-navy text-white p-1.5 rounded">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-brand-navy uppercase tracking-widest leading-none mb-1">
                    {user?.role === 'evaluator' ? 'Session Audit Log' : 'Facilitator Notes'}
                  </h3>
                  <div className="flex items-center gap-1 text-[9px] text-brand-muted font-bold uppercase tracking-tighter italic">
                    {user?.role === 'evaluator' ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                    {user?.role === 'evaluator' ? 'Viewing all role activity' : 'Private to facilitator role'}
                  </div>
                </div>
              </div>
              {filteredLogs.length > 0 && (
                <div className="text-[9px] font-black text-brand-navy bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-tighter">
                  {filteredLogs.length} entries
                </div>
              )}
            </div>

            {/* CHAT FEED (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {filteredLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-muted opacity-40 gap-2">
                  <Clock className="w-8 h-8" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Awaiting log entries...</p>
                </div>
              ) : (
                filteredLogs.map((log) => {
                  const isOwn = log.role === user?.role;
                  return (
                    <div key={log.id} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                      {!isOwn && (
                        <span className="text-[8px] font-black text-brand-orange uppercase tracking-widest mb-1 ml-1 flex items-center gap-1">
                          <User className="w-2 h-2" />
                          Facilitator
                        </span>
                      )}
                      <div className={`
                        max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm relative group
                        ${isOwn ? 'bg-brand-navy text-white rounded-tr-none' : 'bg-white border border-brand-border text-brand-text rounded-tl-none'}
                      `}>
                        <div className="flex flex-col gap-1">
                          <p className="leading-relaxed">{log.text}</p>
                          <div className={`text-[8px] font-bold font-mono opacity-50 mt-1 flex items-center gap-1.5 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span>{log.timestamp}</span>
                            <span className="opacity-30">•</span>
                            <span className="uppercase tracking-tighter">{log.injectId.split('-').slice(-1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* CHAT INPUT */}
            <div className="px-6 pb-6 pt-2 bg-slate-50">
              <div className="relative group">
                <textarea 
                  className="w-full bg-white border border-brand-border rounded-xl p-3 pr-12 text-brand-text text-sm focus:outline-none focus:ring-1 focus:ring-brand-navy/10 transition-all min-h-[60px] shadow-sm placeholder:text-brand-muted/40"
                  placeholder={`Log ${user?.role || 'facilitator'} observation... (Ctrl+Enter to send)`}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      handleLogNote()
                    }
                  }}
                />
                <button 
                  onClick={handleLogNote}
                  disabled={!currentNote.trim()}
                  className="absolute bottom-3 right-3 bg-brand-navy hover:bg-brand-navy/90 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2 rounded-lg transition-all active:scale-95 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: SIDEBAR (LIGHT) */}
        <aside className="w-[300px] border-l border-brand-border bg-white flex flex-col shrink-0">
          
          {/* INJECT QUEUE */}
          <div className="p-5 border-b border-brand-border flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-[9px] font-black tracking-[0.25em] text-brand-muted uppercase mb-6">
              INJECT QUEUE
            </h3>
            
            <div className="relative pl-5 space-y-5 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-brand-border">
              {injects.map((inj, idx) => {
                const isPast = idx < currentInjectIndex;
                const isCurrent = idx === currentInjectIndex;
                
                return (
                  <div 
                    key={inj.id} 
                    className={`relative group cursor-pointer transition-all ${isCurrent ? 'scale-105 origin-left' : 'opacity-50 hover:opacity-100'}`}
                    onClick={() => setCurrentInjectIndex(idx)}
                  >
                    <div className={`
                      absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border z-10 transition-all
                      ${isCurrent ? 'bg-brand-orange border-brand-orange shadow-md' : 
                        isPast ? 'bg-slate-400 border-slate-400' : 'bg-white border-brand-border'}
                    `} />
                    
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[8px] font-black tracking-widest ${isCurrent ? 'text-brand-orange' : 'text-brand-muted'}`}>
                        INJECT {idx + 1} {isCurrent && '— ACTIVE'}
                      </span>
                      <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-brand-navy' : 'text-brand-text'}`}>
                        {inj.title}
                      </h4>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* FACILITATOR TIPS (LIGHT) */}
          <div className="p-5 bg-slate-50 h-[200px] shrink-0 border-t border-brand-border">
            <h3 className="text-[9px] font-black tracking-[0.25em] text-brand-muted uppercase mb-4">
              FACILITATOR TIPS
            </h3>
            
            <ul className="space-y-2.5">
              {(currentInject.facilitator_tips || [
                "Ensure all participants have had a chance to speak.",
                "Probe for specific decision points rather than general consensus."
              ]).map((tip, i) => (
                <li key={i} className="flex gap-2.5 text-[10px] text-brand-text leading-normal font-medium bg-white p-2.5 rounded border border-brand-border shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SIDEBAR FOOTER (NAVIGATION) */}
          <div className="h-14 border-t border-brand-border bg-white flex items-center justify-between px-4 shrink-0">
            <Button 
              variant="ghost" 
              onClick={handlePrev} 
              disabled={currentInjectIndex === 0}
              className="text-brand-muted hover:text-brand-navy hover:bg-slate-50 h-8 w-8 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-1">
              {injects.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-0.5 rounded-full transition-all duration-300 ${i === currentInjectIndex ? 'w-4 bg-brand-orange' : 'w-1 bg-brand-border'}`} 
                />
              ))}
            </div>

            <Button 
              variant="ghost" 
              onClick={handleNext}
              disabled={currentInjectIndex === injects.length - 1}
              className="text-brand-orange hover:bg-brand-orange/5 h-8 w-8 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.1);
        }
      `}</style>

    </div>
  )
}
