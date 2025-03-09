
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, School, Building, Home, Utensils, ShowerHead, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import { colleges, companies, SearchResultType } from '@/utils/searchUtils';

type FacilityType = 'mess' | 'pg' | 'laundry' | 'transport';

type Facility = {
  id: number;
  name: string;
  type: FacilityType;
  distance: string;
  rating: number;
  address: string;
  price: string;
  description: string;
  image: string;
  
};

// Sample data for nearby facilities
const sampleFacilities: Record<number, Facility[]> = {

  // BVcoe

  
  1: [
    { id: 1, name: "Harvard Square Dining", type: "mess", distance: "0.3 km", rating: 4.5, address: "52 Dunster St, Cambridge, MA", price: "617-555-0156", description: "Affordable meal plans with vegetarian options", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 2, name: "Campus Cafe", type: "mess", distance: "0.5 km", rating: 4.3, address: "123 Harvard Ave, Cambridge, MA", price: "617-555-0166", description: "International cuisine with student discounts", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 3, name: "Raut Plaza", type: "pg", distance: "200M", rating: 4.5, address: "Infront of Bharati Vidyapeeth College of Engineering Lavale Pune", price: " ₹2000", description: "Semi-Furnished", image: "https://source.unsplash.com/400x300/?restaurant"},
    { id: 4, name: "Nutan Apartment", type: "pg", distance: "400M", rating: 4.7, address: "Behind Bank of India ATM lavale pune", price: " ₹2000", description: "Semi-Furnished", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 5, name: "Down South AJ", type: "pg", distance: "10Km", rating: 4.9, address: "Near Symbiosis, Lavale Pune", price: " ₹5000", description: "Fully-Furnished with WiFi", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 6, name: "QuickWash Laundry", type: "laundry", distance: "0.7 km", rating: 4.2, address: "65 JFK St, Cambridge, MA", price: "617-555-0158", description: "24/7 self-service and drop-off options available" , image: "https://source.unsplash.com/400x300/?restaurant"},
    { id: 7, name: "Cambridge Transit", type: "transport", distance: "0.2 km", rating: 4.4, address: "Harvard Square Station, Cambridge, MA", price: "617-555-0159", description: "Regular shuttle service to campus and city destinations" , image: "https://source.unsplash.com/400x300/?restaurant"},
  ],
  // VIT
  2: [
    { id: 8, name: "Stanford Dining Hall", type: "mess", distance: "0.2 km", rating: 4.6, address: "459 Lagunita Dr, Stanford, CA", price: "650-555-0160", description: "Diverse meal options with meal plans available", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 9, name: "Shree Sai Samruddhi Apartment 2BHK", type: "pg", distance: "0.4 km", rating: 4.8, address: "Shree Sant Eknath Nagar, near Babu Genu Primary School", price: " ₹2000", description: "Shared Room , Apartment , Unfurnished", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 10, name: "Campus Cleaners", type: "laundry", distance: "0.6 km", rating: 4.3, address: "123 El Camino Real, Palo Alto, CA", price: "650-555-0162", description: "Eco-friendly cleaning with student discounts", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 11, name: "Stanford Shuttle", type: "transport", distance: "0.3 km", rating: 4.5, address: "Tresidder Union, Stanford, CA", price: "650-555-0163", description: "Free campus shuttles with mobile tracking app", image: "https://source.unsplash.com/400x300/?restaurant" },
  ],
  // Default for other colleges/companies
  0: [
    { id: 12, name: "Local Dining", type: "mess", distance: "0.5 km", rating: 4.0, address: "123 Main St", price: "555-0164", description: "Budget-friendly meals with weekly subscriptions" , image: "https://source.unsplash.com/400x300/?restaurant"},
    { id: 13, name: "Student Housing", type: "pg", distance: "0.7 km", rating: 4.2, address: "456 College Ave", price: "555-0165", description: "Single and shared rooms with common study areas" , image: "https://source.unsplash.com/400x300/?restaurant"},
    { id: 14, name: "Quick Clean", type: "laundry", distance: "0.8 km", rating: 3.9, address: "789 University Blvd", price: "555-0166", description: "Wash and fold services with 24-hour turnaround", image: "https://source.unsplash.com/400x300/?restaurant" },
    { id: 15, name: "Campus Express", type: "transport", distance: "0.4 km", rating: 4.1, address: "101 Transit Center", price: "555-0167", description: "Reliable transport to major city locations", image: "https://source.unsplash.com/400x300/?restaurant" },
  ]
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [entity, setEntity] = useState<SearchResultType | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeTab, setActiveTab] = useState<FacilityType>('pg');
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const entityId = parseInt(searchParams.get('id') || '0');
    const entityType = searchParams.get('type') as 'college' | 'company' || 'college';
    
    // Find the entity from our data
    let foundEntity: SearchResultType | null = null;
    
    if (entityType === 'college') {
      foundEntity = colleges.find(c => c.id === entityId) as SearchResultType || null;
      if (foundEntity) foundEntity.type = 'college';
    } else if (entityType === 'company') {
      foundEntity = companies.find(c => c.id === entityId) as SearchResultType || null;
      if (foundEntity) foundEntity.type = 'company';
    }
    
    setEntity(foundEntity);
    
    // Load nearby facilities based on entity ID
    // In a real app, you would fetch this data from an API
    const nearbyFacilities = sampleFacilities[entityId] || sampleFacilities[0];
    setFacilities(nearbyFacilities);
    
  }, [location.search]);
  
  const filteredFacilities = facilities.filter(facility => facility.type === activeTab);
  
  const getIconForType = (type: FacilityType) => {
    switch (type) {
      case 'mess': return <Utensils className="w-5 h-5" />;
      case 'pg': return <Home className="w-5 h-5" />;
      case 'laundry': return <ShowerHead className="w-5 h-5" />;
      case 'transport': return <Truck className="w-5 h-5" />;
      default: return null;
    }
  };
  
  const getStarRating = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-4" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <SearchBar className="flex-grow" />
          </div>
          
          {entity && (
            <div className="mb-8">
              <div className="flex items-center mb-2">
                {entity.type === 'college' ? 
                  <School className="h-6 w-6 text-primary mr-2" /> : 
                  <Building className="h-6 w-6 text-primary mr-2" />
                }
                <h1 className="text-2xl font-bold text-gray-900">{entity.name}</h1>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <p>{entity.location}</p>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-6">
            {(['pg', 'mess', 'laundry', 'transport'] as FacilityType[]).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setActiveTab(tab)}
              >
                {getIconForType(tab)}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">Nearby {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map(facility => (
              <div key={facility.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {getIconForType(facility.type)}
                      <h3 className="font-semibold text-lg ml-2">{facility.name}</h3>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {facility.distance}
                    </span>
                  </div>
                  
                  <div className="text-amber-500 mb-2">
                    {getStarRating(facility.rating)}
                    <span className="text-gray-600 text-sm ml-1">({facility.rating})</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{facility.description}</p>
                  
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {facility.address}
                    </div>
                    <div className="text-sm text-primary font-medium">

                      Price: {facility.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No {activeTab} options found nearby.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
