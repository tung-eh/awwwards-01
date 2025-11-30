import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Features from './Features'

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default App
