import { useState, useRef } from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { Button } from 'src/atoms'

const Hero = () => {
  const transformVideoRef = useRef<HTMLVideoElement>(null)
  const isFirstRender = useRef(true)

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const nextVideoIndex = (currentVideoIndex + 1) % 4

  const onClickNextVideo = () =>
    setCurrentVideoIndex((index) => (index + 1) % 4)

  const getVideoSrc = (index: number) => `/videos/hero-${index + 1}.mp4`

  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }

      gsap.set('#transform-video', { visibility: 'visible' })
      gsap.to('#transform-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => {
          transformVideoRef.current?.play()
        },
      })
      gsap.from('#next-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      })
    },
    {
      dependencies: [currentVideoIndex],
      revertOnUpdate: true,
    }
  )

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <div className="relative z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={onClickNextVideo}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                id="next-video"
                src={getVideoSrc(nextVideoIndex)}
                loop
                muted
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>
          <video
            id="transform-video"
            ref={transformVideoRef}
            src={getVideoSrc(currentVideoIndex)}
            loop
            muted
            className="absolute-center invisible z-20 size-64 object-cover object-center"
          />
          <video
            src={getVideoSrc(currentVideoIndex)}
            loop
            muted
            autoPlay
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              className="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  )
}

export default Hero
