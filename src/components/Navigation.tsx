
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">OUR ROOTS</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm font-medium">FLASHLIGHTS</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#timeline" className="text-sm font-medium hover:text-primary transition-colors">
              TIMELINE
            </a>
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              <Menu size={20} />
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <motion.div
          variants={menuVariants}
          animate={isOpen ? 'open' : 'closed'}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            <a href="#ch1" className="block py-2 text-sm font-medium">CH.1 - 1700s-1900s</a>
            <a href="#ch2" className="block py-2 text-sm font-medium">CH.2 - 1920s-1960s</a>
            <a href="#ch3" className="block py-2 text-sm font-medium">CH.3 - 1970s-1990s</a>
            <a href="#ch4" className="block py-2 text-sm font-medium">CH.4 - 2000s-present</a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
