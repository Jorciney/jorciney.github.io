'use client'

import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/jorciney', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jorcineychaveiro', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/jorciney', label: 'Twitter' },
    { icon: Mail, href: 'mailto:jorciney.dev@gmail.com', label: 'Email' }
  ]
  
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Jorciney Dias Chaveiro</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Technology Lead & Full Stack Developer specializing in Angular, Micro-Frontends, and AWS.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Resume
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} Jorciney Dias Chaveiro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}