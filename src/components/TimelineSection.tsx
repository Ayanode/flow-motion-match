
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  color: string;
}

interface TimelineSectionProps {
  chapters: Chapter[];
}

const TimelineSection = ({ chapters }: TimelineSectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="timeline" ref={ref} className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Timeline Overview</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the evolution of jailhouse lawyers across four distinct periods in American legal history
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center p-4"
            >
              <div className="text-sm text-muted-foreground mb-2">{chapter.subtitle}</div>
              <div className="text-lg font-semibold">{chapter.period}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
