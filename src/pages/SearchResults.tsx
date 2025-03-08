
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, School, Building, Home, Utensils, ShowerHead, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import { colleges, companies, SearchResultType } from '@/utils/searchUtils';

type Facility = {
  id: number;
  name: string;
  type: 'mess' | 'pg' | 'laundry' | 'transport';
  distance: string;
  rating: number;
  address: string;
  contact: string;
  description: string;
};

// Sample data for nearby facilities
const sampleFacilities: Record<number, Facility[]> = {
  // Harvard University
  1: [
    { id: 1, name: "Harvard Square Dining", type: "mess", distance: "0.3 km", rating: 4.5, address: "52 Dunster St, Cambridge, MA", contact: "617-555-0156", description: "Affordable meal plans with vegetarian options" },
    { id: 2, name: "University Housing", type: "pg", distance: "0.5 km", rating: 4.7, address: "120 Mount Auburn St, Cambridge, MA", contact: "617-555-0157", description: "Fully furnished rooms with WiFi and utilities included" },
    { id: 3, name: "QuickWash Laundry", type: "laundry", distance: "0.7 km", rating: 4.2, address: "65 JFK St, Cambridge, MA", contact: "617-555-0158", description: "24/7 self-service and drop-off options available" },
    { id: 4, name: "Cambridge Transit", type: "transport", distance: "0.2 km", rating: 4.4, address: "Harvard Square Station, Cambridge, MA", contact: "617-555-0159", description: "Regular shuttle service to campus and city destinations" },
  ],
  // Stanford University
  2: [
    { id: 5, name: "Stanford Dining Hall", type: "mess", distance: "0.2 km", rating: 4.6, address: "459 Lagunita Dr, Stanford, CA", contact: "650-555-0160", description: "Diverse meal options with meal plans available" },
    { id: 6, name: "Cardinal Residences", type: "pg", distance: "0.4 km", rating: 4.8, address: "550 Serra Mall, Stanford, CA", contact: "650-555-0161", description: "Modern accommodations with study spaces and gyms" },
    { id: 7, name: "Campus Cleaners", type: "laundry", distance: "0.6 km", rating: 4.3, address: "123 El Camino Real, Palo Alto, CA", contact: "650-555-0162", description: "Eco-friendly cleaning with student discounts" },
    { id: 8, name: "Stanford Shuttle", type: "transport", distance: "0.3 km", rating: 4.5, address: "Tresidder Union, Stanford, CA", contact: "650-555-0163", description: "Free campus shuttles with mobile tracking app" },
  ],
  // Default for other colleges/companies
  0: [
    { id: 9, name: "Local Dining", type: "mess", distance: "0.5 km", rating: 4.0, address: "123 Main St", contact: "555-0164", description: "Budget-friendly meals with weekly subscriptions" },
    { id: 10, name: "Student Housing", type: "pg", distance: "0.7 km", rating: 4.2, address: "456 College Ave", contact: "555-0165", description: "Single and shared rooms with common study areas" },
    { id: 11, name: "Quick Clean", type: "laundry", distance: "0.8 km", rating: 3.9, address: "789 University Blvd", contact: "555-0166", description: "Wash and fold services with 24-hour turnaround" },
    { id: 12, name: "Campus Express", type: "transport", distance: "0.4 km", rating: 4.1, address: "101 Transit Center", contact: "555-0167", description: "Reliable transport to major city locations" },
  ]
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [entity, setEntity] = useState<SearchResultType | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeTab, setActiveTab] = useState<'mess' | 'pg' | 'laundry' | 'transport'>('pg');
  
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
  
  const filteredFacilities = facilities.filter(facility => 
    activeTab === 'all' || facility.type === activeTab
  );
  
  const getIconForType = (type: 'mess' | 'pg' | 'laundry' | 'transport') => {
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
            {['pg', 'mess', 'laundry', 'transport'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setActiveTab(tab as any)}
              >
                {getIconForType(tab as any)}
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
                      Contact: {facility.contact}
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
