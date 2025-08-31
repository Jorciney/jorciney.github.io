'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center px-4 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 pt-16">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="animate-float absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
        <div className="animate-float absolute top-32 right-20 w-6 h-6 bg-white rounded-full" style={{ animationDelay: '1s' }}></div>
        <div className="animate-float absolute bottom-20 left-32 w-3 h-3 bg-white rounded-full" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Content */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Technology Lead & Full Stack Developer
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Specializing in Angular, Micro-Frontends, and AWS. Leading teams to build scalable, 
            maintainable solutions with 9+ years of experience.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold">9+</div>
              <div className="text-sm text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm text-blue-200">Years Leadership</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-blue-200">Projects</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-white/20"
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg shadow-white/10"
            >
              View My Work
            </Button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="flex justify-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 font-mono text-white border border-white/20 max-w-md">
            {/* Terminal header */}
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Code content */}
            <div className="text-sm">
              <div className={`mb-1 ${animationStarted ? 'animate-typewriter' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                const developer = {'{'}
              </div>
              <div className={`mb-1 ml-4 ${animationStarted ? 'animate-typewriter' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
                name: &quot;Jorciney Dias Chaveiro&quot;,
              </div>
              <div className={`mb-1 ml-4 ${animationStarted ? 'animate-typewriter' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
                role: &quot;Technology Lead&quot;,
              </div>
              <div className={`mb-1 ml-4 ${animationStarted ? 'animate-typewriter' : 'opacity-0'}`} style={{ animationDelay: '2s' }}>
                expertise: [&quot;Angular&quot;, &quot;AWS&quot;, &quot;Leadership&quot;],
              </div>
              <div className={`mb-1 ml-4 ${animationStarted ? 'animate-typewriter' : 'opacity-0'}`} style={{ animationDelay: '2.5s' }}>
                passion: &quot;Building scalable solutions&quot;
              </div>
              <div className={`${animationStarted ? 'animate-typewriter' : 'opacity-0'}`} style={{ animationDelay: '3s' }}>
                {'};'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}