import { skills } from '@/data/skills'
import { experiences } from '@/data/experience'
import Badge from '@/components/ui/Badge'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Professional Summary */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Professional Summary</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                I'm a Technology Lead with over 9 years of experience in software development, 
                specializing in building scalable, maintainable solutions using modern web technologies.
              </p>
              <p>
                Currently leading frontend initiatives at Telenet, where I drive the adoption of 
                Micro-Frontend architecture using Module Federation, improving team autonomy and 
                deployment efficiency across multiple teams.
              </p>
              <p>
                My expertise spans from hands-on development with Angular, React, and AWS to 
                technical leadership, mentoring teams, and architecting enterprise-scale applications.
              </p>
            </div>
            
            {/* Current Role */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Current Focus</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Leading Micro-Frontend adoption at scale</li>
                <li>• Improving developer experience and productivity</li>
                <li>• Architecting scalable frontend solutions</li>
                <li>• Mentoring and growing engineering teams</li>
              </ul>
            </div>
          </div>
          
          {/* Skills & Technologies */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Skills & Technologies</h3>
            <div className="space-y-6">
              {skills.map((skillCategory) => (
                <div key={skillCategory.category}>
                  <h4 className="text-lg font-medium mb-3">{skillCategory.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Experience Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Experience Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 border-4 border-blue-600 rounded-full z-10">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Experience card */}
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-semibold">{exp.title}</h4>
                        <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {exp.description}
                    </p>
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {exp.current && (
                      <Badge className="mt-3" variant="default">
                        Current Position
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}