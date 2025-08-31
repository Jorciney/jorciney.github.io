import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ToolsSection from '@/components/sections/ToolsSection'
import BookmarksSection from '@/components/sections/BookmarksSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ToolsSection />
      <BookmarksSection />
      <ContactSection />
    </>
  )
}