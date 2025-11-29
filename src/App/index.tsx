import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  )
}

export default App
