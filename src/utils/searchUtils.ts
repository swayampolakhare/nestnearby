
// Database of colleges and companies for search functionality
export const colleges = [
  { id: 1, name: "Bharati Vidyapeeth College of Engineering Lavale Pune", location: "Lavale Pune" },
  { id: 2, name: "Vishwakarma Institute of Technology (VIT)", location: "Upper Indira Nagar, Bibwewadi, Pune, Maharashtra 411037" },
  { id: 3, name: "Sinhgad College of Engineering Pune", location: "No. 44/1, Off. Sinhgad Road Pune,Maharashtra" },
  { id: 4, name: "Cummins College of Engineering for Women Pune", location: "Karve Nagar, Pune" },
  { id: 5, name: "COEP College of Engineering Pune", location: "Shivaji Nagar, Pune" },
  { id: 6, name: "Fergusson College Pune", location: "Fergusson College Road, Pune" },
  { id: 7, name: "DY Patil Institute of Technology Pune", location: "Pimpri-Chinchwad,Pune,Maharashtra." },
  { id: 8, name: "Rajarshi Shahu College of Engineering, Pune", location: "Service Rd, Ashok Nagar, Tathawade, Maharashtra" },
  { id: 9, name: "AISSMS College of Engineering Pune", location: "Near RTO Office Sangamvadi, Shivajinagar, Pune, Maharashtra 411001" },
  { id: 10, name: "MIT World Peace University, Pune", location: "Kothrud Pune, Maharashtra" },
  { id: 11, name: "Pune Institute of Computer Technology, Pune", location: "Chandrabhaga Nagar Rd, Dhankawadi, Pune, Maharashtra 411043" },
  { id: 12, name: "Johns Hopkins University", location: "Baltimore, MD" },
  { id: 13, name: "Dartmouth College", location: "Hanover, NH" },
  { id: 14, name: "Brown University", location: "Providence, RI" },
  { id: 15, name: "Vanderbilt University", location: "Nashville, TN" }
];

export const companies = [
  { id: 1, name: "Google", location: "Mountain View, CA" },
  { id: 2, name: "Apple", location: "Cupertino, CA" },
  { id: 3, name: "Microsoft", location: "Redmond, WA" },
  { id: 4, name: "Amazon", location: "Seattle, WA" },
  { id: 5, name: "Facebook", location: "Menlo Park, CA" },
  { id: 6, name: "Tesla", location: "Palo Alto, CA" },
  { id: 7, name: "Netflix", location: "Los Gatos, CA" },
  { id: 8, name: "Adobe", location: "San Jose, CA" },
  { id: 9, name: "Intel", location: "Santa Clara, CA" },
  { id: 10, name: "IBM", location: "Armonk, NY" },
  { id: 11, name: "Cisco", location: "San Jose, CA" },
  { id: 12, name: "Oracle", location: "Redwood City, CA" },
  { id: 13, name: "Salesforce", location: "San Francisco, CA" },
  { id: 14, name: "Twitter", location: "San Francisco, CA" },
  { id: 15, name: "LinkedIn", location: "Sunnyvale, CA" }
];

export type SearchResultType = {
  id: number;
  name: string;
  location: string;
  type: 'college' | 'company';
};

export const searchEntities = (query: string): SearchResultType[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  const matchedColleges = colleges
    .filter(college => 
      college.name.toLowerCase().includes(normalizedQuery) || 
      college.location.toLowerCase().includes(normalizedQuery)
    )
    .map(college => ({ ...college, type: 'college' as const }));
  
  const matchedCompanies = companies
    .filter(company => 
      company.name.toLowerCase().includes(normalizedQuery) || 
      company.location.toLowerCase().includes(normalizedQuery)
    )
    .map(company => ({ ...company, type: 'company' as const }));
  
  return [...matchedColleges, ...matchedCompanies].slice(0, 8);
};
