
import { Home, Utensils, ShoppingBag, Bus, ShowerHead } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "PG Accommodations",
    description: "Find comfortable and affordable paying guest accommodations near your college or workplace.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Mess Facilities",
    description: "Discover the best mess facilities offering nutritious and delicious meals at reasonable prices.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <ShowerHead className="w-6 h-6" />,
    title: "Laundry Services",
    description: "Connect with reliable laundry services that ensure your clothes are clean and well-maintained.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Bus className="w-6 h-6" />,
    title: "Transportation",
    description: "Access information about the best transportation options available near your location.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Essential Services",
    description: "Find nearby essential services such as grocery stores, pharmacies, and stationery shops.",
    color: "bg-rose-100 text-rose-600"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full opacity-70 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full opacity-70 translate-y-1/2 -translate-x-1/4" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p 
            className="text-sm font-medium text-primary mb-3 uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need in one place
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We provide a comprehensive platform to help students and professionals find all essential services near their colleges and workplaces.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className={cn("p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
