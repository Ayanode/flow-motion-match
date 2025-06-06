
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <motion.h1 
              className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
              variants={titleVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
            >
              THE HISTORY OF
            </motion.h1>
            <motion.h1 
              className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
              variants={titleVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
            >
              JAILHOUSE LAWYERS
            </motion.h1>
          </div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-md">
              A brief historical overview of the emergence and impact of jailhouse lawyers in the legal system
            </p>
            
            <motion.button
              className="bg-primary text-primary-foreground px-8 py-3 rounded-none text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE TIMELINE
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
