import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2, ShieldAlert, MonitorPlay, FileText } from "lucide-react";
import { mockScenarios } from "@/lib/data/scenarios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const previewScenarios = mockScenarios.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <PublicHeader />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="px-6 py-20 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-navy mb-6">
            Run Your First Crisis Simulation Today
          </h1>
          <p className="text-xl text-brand-muted mb-10 max-w-2xl mx-auto">
            A ready-to-run scenario library and facilitator dashboard for in-person tabletop exercises. No consultants required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" variant="orange" className="text-lg px-8">
                Start Free — No Credit Card Required
              </Button>
            </Link>
            <Link href="#how-it-works" className="inline-flex items-center text-brand-navy font-medium hover:text-brand-orange transition-colors">
              See How It Works <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="mt-16 bg-white border border-brand-border rounded-xl shadow-2xl p-2 md:p-4 aspect-video flex items-center justify-center text-brand-muted relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
              [ Dashboard Mockup Visual Placeholder ] 
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="bg-white py-24 px-6 border-y border-brand-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-brand-navy">How It Works</h2>
              <p className="text-brand-muted mt-4">Professional exercises ready in minutes, not months.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: "1", title: "Choose a Scenario", desc: "Select from our library of pre-built crisis events, from cyberattacks to physical security threats." },
                { step: "2", title: "Review the Brief", desc: "Familiarize yourself with the situation brief and interactive inject timeline before your team arrives." },
                { step: "3", title: "Facilitate with Ease", desc: "Launch the full-screen runner mode. The app guides you through every twist, inject, and discussion question." }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-brand-navy font-bold text-2xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-brand-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCENARIO PREVIEW STRIP */}
        <section id="scenarios" className="py-24 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-brand-navy">Ready-to-Run Scenarios</h2>
                <p className="text-brand-muted mt-2">Tested in the boardroom. Ready for yours.</p>
              </div>
              <Link href="/dashboard" className="hidden sm:inline-flex items-center text-brand-navy hover:text-brand-orange font-medium">
                View All 10 Scenarios <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 snap-x">
              {previewScenarios.map((scenario) => (
                <Card key={scenario.id} className="min-w-[300px] snap-center shrink-0">
                  <CardContent className="p-6">
                    <Badge variant={scenario.category} className="mb-4">
                      {scenario.category.toUpperCase()}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{scenario.title}</h3>
                    <p className="text-sm text-brand-muted line-clamp-3 mb-4">{scenario.situation_brief}</p>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {scenario.duration_min}-{scenario.duration_max} MIN
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="bg-brand-navy text-white py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <ShieldAlert className="w-12 h-12 text-brand-orange" />
                <h3 className="text-xl font-bold">Ready-to-Run Scenarios</h3>
                <p className="text-slate-300">Don&apos;t waste weeks writing scenarios. Use pre-built situation briefs, inject timelines, and discussion questions designed by industry experts.</p>
              </div>
              <div className="flex flex-col gap-4">
                <MonitorPlay className="w-12 h-12 text-brand-orange" />
                <h3 className="text-xl font-bold">Facilitator Dashboard</h3>
                <p className="text-slate-300">Step-by-step guidance so anyone can run a professional exercise. A clean, distraction-free projector view keeps the team focused.</p>
              </div>
              <div className="flex flex-col gap-4">
                <FileText className="w-12 h-12 text-brand-orange" />
                <h3 className="text-xl font-bold">After-Action Reports</h3>
                <p className="text-slate-300">Automatically capture decisions, discussions, and identified gaps for follow-up. Generate your AAR with one click.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy">Simple, Transparent Pricing</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <Card className="flex flex-col p-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-brand-muted mb-6">Perfect for trying out the platform.</p>
              <div className="text-4xl font-bold mb-8">$0<span className="text-lg text-brand-muted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> 2 core scenarios</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Basic facilitator view</li>
                <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-5 h-5 opacity-30 shrink-0" /> No report export</li>
              </ul>
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </Card>

            {/* Pro */}
            <Card className="flex flex-col p-8 border-brand-orange relative shadow-lg scale-100 md:scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-brand-muted mb-6">For teams serious about readiness.</p>
              <div className="text-4xl font-bold mb-8">$99<span className="text-lg text-brand-muted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> All 10+ scenarios</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Full inject timeline</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> After-action report export</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Priority support</li>
              </ul>
              <Link href="/dashboard" className="w-full">
                <Button variant="orange" className="w-full">Start Pro Trial</Button>
              </Link>
            </Card>

            {/* Enterprise */}
            <Card className="flex flex-col p-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-brand-muted mb-6">Customized for your organization.</p>
              <div className="text-4xl font-bold mb-8">Custom</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Custom scenario library</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Dedicated support</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Custom branding</li>
                <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Consulting add-ons</li>
              </ul>
              <Link href="/contact" className="w-full">
                <Button variant="outline" className="w-full">Contact Us</Button>
              </Link>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
