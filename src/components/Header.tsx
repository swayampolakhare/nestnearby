
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 glass shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a 
          href="/" 
          className="text-2xl font-bold text-primary transition-all hover:opacity-80"
        >
          Nest Nearby
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {['Services', 'About Us', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-medium text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <Button 
            variant="default" 
            size="sm" 
            className="animate-fade-in-up transition-all hover:shadow-md"
          >
            Get Started
          </Button>
        </nav>

        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 glass-dark transition-all duration-300 pt-20",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center space-y-8 h-full">
          {['Services', 'About Us', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-medium text-foreground/80 hover:text-primary transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button 
            variant="default" 
            size="lg" 
            className="mt-4 transition-all hover:shadow-md w-48"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
