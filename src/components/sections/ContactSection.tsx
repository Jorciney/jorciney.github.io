'use client'

import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactSection() {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'jorciney.dev@gmail.com', href: 'mailto:jorciney.dev@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+32 XXX XXX XXX', href: 'tel:+32xxxxxxxxx' },
    { icon: MapPin, label: 'Location', value: 'Brussels, Belgium', href: null }
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/jorciney' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorcineychaveiro' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/jorciney' }
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            I&apos;m always interested in new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                      {href ? (
                        <a 
                          href={href}
                          className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-blue-400 hover:shadow-lg transition-all group"
                    aria-label={label}
                  >
                    <Icon size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <Mail size={48} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold mb-2">Ready to Connect?</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  I&apos;d love to hear about your project or opportunity. Let&apos;s start a conversation!
                </p>
                <Button
                  onClick={() => window.open('mailto:jorciney.dev@gmail.com?subject=Hello from your portfolio', '_blank')}
                  className="w-full"
                >
                  <Mail size={16} className="mr-2" />
                  Send Email
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Or connect with me on social media for quick updates and tech discussions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}