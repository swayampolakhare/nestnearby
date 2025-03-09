
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Home,
  Utensils,
  ShowerHead,
  Bus,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#f0f4ff,_#ffffff,_#f0f4ff)] opacity-50 -z-10" />
      
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
          <a href="#home" className="flex items-center">
        <img
        src="/logo1.png"
        alt="Nest Nearby"
        className="h-12 w-auto object-contain"
        />
      </a>
            <p className="text-gray-600 mb-6">
              Your one-stop solution for finding mess facilities, PG accommodations, laundry services, and transportation options near colleges and companies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors" 
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors" 
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors" 
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary flex items-center transition-colors">
                  <Home className="w-4 h-4 mr-2" />
                  <span>PG Accommodations</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary flex items-center transition-colors">
                  <Utensils className="w-4 h-4 mr-2" />
                  <span>Mess Facilities</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary flex items-center transition-colors">
                  <ShowerHead className="w-4 h-4 mr-2" />
                  <span>Laundry Services</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary flex items-center transition-colors">
                  <Bus className="w-4 h-4 mr-2" />
                  <span>Transportation</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary flex items-center transition-colors">
                  <Search className="w-4 h-4 mr-2" />
                  <span>Find Colleges & Companies</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-600">BVCOEL Pune</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <a href="mailto:info@NestNearby.in" className="text-gray-600 hover:text-primary transition-colors">info@nestnearby.in</a>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <a href="tel:+918625055880" className="text-gray-600 hover:text-primary transition-colors">+91 8625055880</a>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-medium text-gray-900 mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button 
                  type="submit" 
                  className={cn(
                    "bg-primary text-white rounded-r-md px-4",
                    "hover:bg-primary/90 focus:outline-none"
                  )}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Nest Nearby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
