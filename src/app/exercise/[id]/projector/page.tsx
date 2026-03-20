"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useParams } from "next/navigation"
import { mockScenarios } from "@/lib/data/scenarios"
import { Card, CardContent } from "@/components/ui/card"
import { History, Eye } from "lucide-react"

export default function ProjectorMode() {
  const params = useParams()
  const searchParams = useSearchParams()
  const scenarioId = params.id as string
  
  // State from Sync or URL
  const [injectIndex, setInjectIndex] = useState(parseInt(searchParams.get("index") || "0"))
  
  const scenario = mockScenarios.find(s => s.id === scenarioId)
  const inject = scenario?.injects[injectIndex]

  useEffect(() => {
    const syncChannel = new BroadcastChannel('exercise_sync')
    
    syncChannel.onmessage = (event) => {
      if (event.data.type === 'SYNC_INJECT') {
        setInjectIndex(event.data.index)
      }
    }

    return () => syncChannel.close()
  }, [])

  if (!inject) return <div className="p-8 text-brand-navy bg-white min-h-screen flex items-center justify-center font-bold">Inject not found</div>

  return (
    <div className="min-h-screen bg-white text-brand-navy p-12 flex flex-col items-center justify-center animate-in fade-in duration-700">
      
      {/* HEADER INDICATOR */}
      <div className="absolute top-8 left-12 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500 text-white rounded shadow-sm">
          <Eye className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Presentation</span>
        </div>
        <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
            {scenario?.title}
        </div>
      </div>

      <div className="max-w-6xl w-full flex flex-col gap-12">
        {/* MAIN INJECT CONTENT */}
        <div className="relative">
          <div className="bg-brand-orange text-white text-xs font-black inline-block px-3 py-1 rounded-sm uppercase tracking-widest mb-6">
            INJECT {injectIndex + 1}
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-10 tracking-tighter text-brand-navy">
            {inject.title}
          </h1>
          <p className="text-2xl md:text-3xl text-brand-text leading-relaxed font-medium">
            {inject.description}
          </p>
        </div>

        {/* DISCUSSION PROMPT (IF APPLICABLE) */}
        {inject.facilitator_prompt && (
          <Card className="bg-brand-navy border-none shadow-2xl relative overflow-hidden mt-8">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-orange" />
            <CardContent className="p-12">
              <h3 className="text-xs font-black tracking-[0.3em] text-white/50 uppercase mb-6 flex items-center gap-3">
                <History className="w-5 h-5 text-brand-orange" />
                DISCUSSION PROMPT
              </h3>
              <p className="text-3xl md:text-5xl font-black text-white italic leading-tight">
                &quot;{inject.facilitator_prompt}&quot;
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-8 right-12 text-[10px] font-medium text-brand-muted uppercase tracking-widest opacity-30">
        TabletopExercise.app • Emergency Simulation Mode • Sync Active
      </div>
    </div>
  )
}
