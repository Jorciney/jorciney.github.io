'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { ExternalLink, Rocket, Palette, Megaphone, Code, Smartphone, LineChart } from 'lucide-react'

export default function CompanySection() {
  const services = [
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: 'Social Media Marketing',
      description: 'Strategic social media management with content creation, advertising, and community management'
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'Digital Marketing',
      description: 'Revenue-generating digital marketing solutions that drive leads and increase sales'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Graphic & UI/UX Design',
      description: 'Creative design solutions from branding to user interface and experience design'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technologies'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Business Growth',
      description: 'Comprehensive strategies to level up your online presence and drive revenue'
    }
  ]

  return (
    <section id="company" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">CleverUpps Marketing</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Affordable, Innovative, with Quality
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            As founder of CleverUpps Marketing, I lead a team of experts delivering revenue-generating 
            digital marketing solutions that help businesses level up their online presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} hover className="h-full">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Company Highlights */}
        <Card className="mb-12 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/50 dark:to-gray-950">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose CleverUpps?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Partnership Approach:</strong> We believe in transparent communication and true collaboration
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Revenue-Focused:</strong> Our strategies are designed to generate leads and increase sales
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Full-Service Solutions:</strong> From strategy to execution, we handle all aspects of digital marketing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Expert Team:</strong> Specialists in marketing strategy, content creation, design, and analysis
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold text-lg mb-2">Our Mission</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We deliver omzetgenererende digitale marketingoplossingen - revenue-generating 
                    digital marketing solutions that help businesses thrive in the digital landscape.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Strategic Planning</Badge>
                  <Badge variant="secondary">Content Creation</Badge>
                  <Badge variant="secondary">Lead Generation</Badge>
                  <Badge variant="secondary">Brand Development</Badge>
                  <Badge variant="secondary">Analytics & Insights</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={() => window.open('https://cleveruppsmarketing.be/', '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink size={20} className="mr-2" />
              Visit CleverUpps Marketing
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.open('https://cleveruppsmarketing.be/contact', '_blank', 'noopener,noreferrer')}
            >
              Get in Touch
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Let&apos;s level up your business together
          </p>
        </div>
      </div>
    </section>
  )
}