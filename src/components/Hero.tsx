
import { useState } from 'react';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Truck, ShowerHead } from 'lucide-react';

const Hero = () => {
  const [activeTab, setActiveTab] = useState<'mess' | 'pg' | 'laundry' | 'transport'>('mess');

  const tabs = [
    { id: 'mess', label: 'Mess', icon: <Home className="w-4 h-4 mr-2" /> },
    { id: 'pg', label: 'PG/Hostels', icon: <Home className="w-4 h-4 mr-2" /> },
    { id: 'laundry', label: 'Laundry', icon: <ShowerHead className="w-4 h-4 mr-2" /> },
    { id: 'transport', label: 'Transport', icon: <Truck className="w-4 h-4 mr-2" /> },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find the Perfect <span className="text-primary highlight-glow">Accommodation</span> Near Your College
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover affordable PGs, mess facilities, laundry services, and transportation options tailored for students and professionals.
          </motion.p>
        </div>
        
        <div className="relative z-10 mb-12">
          <motion.div 
            className="flex flex-wrap justify-center mb-8 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center px-5 py-2.5 rounded-full font-medium text-sm transition-all",
                  "border border-gray-200 focus:outline-none",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-50"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar 
              className="max-w-4xl"
              onSearch={(query) => console.log('Searching for:', query, 'Type:', activeTab)}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-center items-center space-x-8 text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            100+ Colleges
          </p>
          <p className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            500+ PGs
          </p>
          <p className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
            50+ Cities
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
