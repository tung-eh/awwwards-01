import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { twMerge } from 'tailwind-merge'

gsap.registerPlugin(ScrollTrigger)

const AnimatedTitle = ({
  title,
  className,
}: {
  title: string
  className?: string
}) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      })

      titleAnimation.to(
        '.animated-word',
        {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
          ease: 'power2.inOut',
          stagger: 0.02,
        },
        0
      )
    },
    {
      scope: containerRef,
      dependencies: [],
    }
  )

  return (
    <div
      ref={containerRef}
      className={twMerge(
        'animated-title text-white text-7xl leading-[.8] md:text-[6rem]',
        className
      )}
    >
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(' ').map((word, idx) => (
            <span
              key={idx}
              className="animated-word special-font"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTitle
