import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { TiLocationArrow } from 'react-icons/ti'

import { Button } from 'src/atoms'

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const toggleAudio = () => setIsAudioPlaying((p) => !p)

  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isAudioPlaying])

  return (
    <div className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              className="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={toggleAudio}
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
            >
              <audio
                ref={audioRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx('indicator-line', {
                    active: isAudioPlaying,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
