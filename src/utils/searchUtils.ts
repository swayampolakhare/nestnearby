
// Database of colleges and companies for search functionality
export const colleges = [
  { id: 1, name: "Harvard University", location: "Cambridge, MA" },
  { id: 2, name: "Stanford University", location: "Stanford, CA" },
  { id: 3, name: "Massachusetts Institute of Technology", location: "Cambridge, MA" },
  { id: 4, name: "California Institute of Technology", location: "Pasadena, CA" },
  { id: 5, name: "University of Chicago", location: "Chicago, IL" },
  { id: 6, name: "Princeton University", location: "Princeton, NJ" },
  { id: 7, name: "Columbia University", location: "New York, NY" },
  { id: 8, name: "Yale University", location: "New Haven, CT" },
  { id: 9, name: "University of Pennsylvania", location: "Philadelphia, PA" },
  { id: 10, name: "Northwestern University", location: "Evanston, IL" },
  { id: 11, name: "Duke University", location: "Durham, NC" },
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
