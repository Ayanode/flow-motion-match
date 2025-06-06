
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  color: string;
}

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

const ChapterCard = ({ chapter, index }: ChapterCardProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className={`chapter-card ${chapter.color} min-h-[600px] p-8 flex flex-col justify-between text-white cursor-pointer group relative overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.div 
          className="text-sm font-medium mb-4 opacity-80"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.8, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: (index * 0.2) + 0.3 }}
        >
          {chapter.subtitle}
        </motion.div>
        
        <motion.h3 
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: (index * 0.2) + 0.4 }}
        >
          {chapter.title}
        </motion.h3>
      </div>

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: (index * 0.2) + 0.6 }}
      >
        <p className="text-lg mb-6 opacity-90 leading-relaxed">
          {chapter.description}
        </p>
        
        <motion.div 
          className="flex items-center space-x-2 text-sm font-medium"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.2 }}
        >
          <span>EXPLORE CHAPTER</span>
          <ArrowRight size={16} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: (index * 0.2) + 0.8, duration: 0.6 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

export default ChapterCard;
