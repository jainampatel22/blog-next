import Hero from '@/app/component/Hero'
import Features from '@/app/component/Features'
import Testimonials from '@/app/component/Testimonial'
import Footer from '@/app/component/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}