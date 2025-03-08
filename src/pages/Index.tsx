
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import { motion, useScroll, useAnimation } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });

    const handleScroll = () => {
      // Add any scroll-based animations or effects here
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  // Add framer-motion to the exports
  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.6 }}
    >
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <Reviews />
      </main>
      
      <Footer />
      
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.div>
  );
};

export default Index;
