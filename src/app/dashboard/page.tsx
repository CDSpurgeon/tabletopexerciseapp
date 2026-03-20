"use client"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { mockScenarios } from "@/lib/data/scenarios"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Clock, Users, Target } from "lucide-react"

export default function DashboardPage() {
  const { user, upgradeToPro } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeDifficulty, setActiveDifficulty] = useState<string>("all")

  const filteredScenarios = mockScenarios.filter(scenario => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scenario.situation_brief.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || scenario.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "all" || scenario.difficulty === activeDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy mb-2">Scenario Library</h1>
        <p className="text-brand-muted">Choose a scenario to preview or launch a live exercise.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted w-4 h-4" />
          <Input 
            placeholder="Search scenarios..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'cyber', 'operations', 'physical', 'leadership'].map(cat => (
             <Button 
               key={cat} 
               variant={activeCategory === cat ? "navy" : "outline"}
               size="sm"
               onClick={() => setActiveCategory(cat)}
               className="capitalize"
             >
               {cat}
             </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 md:border-l md:border-brand-border md:pl-4">
          {['all', 'foundation', 'intermediate', 'advanced'].map(diff => (
             <Button 
               key={diff} 
               variant={activeDifficulty === diff ? "navy" : "ghost"}
               size="sm"
               onClick={() => setActiveDifficulty(diff)}
               className="capitalize"
             >
               {diff}
             </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map(scenario => {
          const isLocked = !scenario.is_free && user?.tier === 'free';
          
          return (
            <Card key={scenario.id} className={`flex flex-col relative ${isLocked ? 'overflow-hidden' : ''}`}>
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant={scenario.category}>{scenario.category.toUpperCase()}</Badge>
                </div>
                
                <h3 className="font-bold text-lg text-brand-navy mb-2">{scenario.title}</h3>
                <p className="text-sm text-brand-muted line-clamp-2 mb-6 flex-1">
                  {scenario.situation_brief}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-brand-muted font-medium mb-6">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    {scenario.duration_min}–{scenario.duration_max} min
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Users className="w-3.5 h-3.5" />
                    {scenario.participants_min}–{scenario.participants_max} pax
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap capitalize">
                    <Target className="w-3.5 h-3.5" />
                    {scenario.difficulty}
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href={`/scenarios/${scenario.id}`} className={isLocked ? "pointer-events-none" : ""}>
                    <Button variant="outline" className="w-full" disabled={isLocked}>Preview Scenario</Button>
                  </Link>
                </div>
              </CardContent>

              {isLocked && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-brand-navy text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    Pro Scenario
                  </div>
                  <h4 className="font-bold text-brand-navy mb-2">Upgrade to Unlock</h4>
                  <p className="text-xs text-brand-text mb-4">This scenario is available on the Pro plan.</p>
                  <Button variant="orange" size="sm" className="w-full shadow-lg" onClick={upgradeToPro}>Upgrade to Pro</Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
