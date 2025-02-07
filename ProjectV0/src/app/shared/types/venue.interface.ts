export interface Venue {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  features: string[];
}

export interface City {
  id: string;
  name: string;
}

export interface Sport {
  id: string;
  name: string;
}

export interface SearchFilters {
  city: string;
  sport: string;
  date: Date;
}
