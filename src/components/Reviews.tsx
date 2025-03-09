
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Engineering Student",
    content: "Finding accommodation near my college was a nightmare until I discovered this platform. I found a great PG within my budget and close to campus. The search and filter options made the process incredibly simple.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Medical Student",
    content: "As a medical student with crazy schedules, having a good mess facility nearby was essential. Thanks to this platform, I found a mess that serves healthy food at reasonable prices just a 5-minute walk from my hostel.",
    avatar: "/placeholder.svg",
    rating: 4
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "IT Professional",
    content: "I relocated to a new city for work and needed a PG near my office. This platform made it easy to find accommodations with all the amenities I needed. The laundry service recommendation was a lifesaver!",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Commerce Student",
    content: "The transportation options suggested by this platform have been incredibly helpful. I save so much time and money on my daily commute to college. The real-time updates about local transport are a bonus.",
    avatar: "/placeholder.svg",
    rating: 4
  },
  {
    id: 5,
    name: "Vivek Singh",
    role: "MBA Student",
    content: "What I appreciate most about this platform is the verified reviews. I was able to make an informed decision about my PG based on genuine feedback from other students. Five stars for the transparency!",
    avatar: "/placeholder.svg",
    rating: 5
  }
  
];

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.clientX;
    const diff = x - startX;
    setTranslateX(diff);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = x - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setTranslateX(0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "w-4 h-4", 
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  const getVisibleTestimonials = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#e0e7ff,_transparent)] opacity-70" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p 
            className="text-sm font-medium text-primary mb-3 uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What our users say
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Thousands of students and professionals have found their ideal accommodations and services through our platform.
          </motion.p>
        </div>
        
        <div className="relative px-4 md:px-10">
          <div 
            ref={containerRef}
            className="overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(calc(-${activeIndex * 100}% + ${translateX}px))`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 py-6"
                >
                  <div className="bg-white rounded-xl p-8 shadow-sm h-full border border-gray-100 flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none z-10 hidden md:flex"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none z-10 hidden md:flex"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
