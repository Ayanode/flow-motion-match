
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import TimelineSection from '../components/TimelineSection';
import ChapterCard from '../components/ChapterCard';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const chapters = [
    {
      id: 'ch1',
      title: '1700s-1900s',
      subtitle: 'CH.1',
      description: 'The early foundations of prison law and the emergence of self-representation in American jails.',
      period: '1700s-1900s',
      color: 'bg-red-500'
    },
    {
      id: 'ch2', 
      title: '1920s-1960s',
      subtitle: 'CH.2',
      description: 'Civil rights movements and the growing awareness of prisoners\' constitutional rights.',
      period: '1920s-1960s',
      color: 'bg-red-600'
    },
    {
      id: 'ch3',
      title: '1970s-1990s', 
      subtitle: 'CH.3',
      description: 'The golden age of jailhouse lawyers and landmark Supreme Court decisions.',
      period: '1970s-1990s',
      color: 'bg-red-700'
    },
    {
      id: 'ch4',
      title: '2000s-present',
      subtitle: 'CH.4', 
      description: 'Digital age challenges and the modern evolution of prison legal advocacy.',
      period: '2000s-present',
      color: 'bg-red-800'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero text on load
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.1 }
      );

      // Chapter cards scroll animation
      gsap.fromTo('.chapter-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <motion.div style={{ opacity }} className="relative">
        <Hero />
      </motion.div>

      <TimelineSection chapters={chapters} />

      <div className="timeline-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {chapters.map((chapter, index) => (
          <ChapterCard 
            key={chapter.id}
            chapter={chapter}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
