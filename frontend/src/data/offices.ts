export interface Office {
  flag: string
  city: string
  country: string
  email?: string
  phone?: string
  comingSoon?: boolean
}

export const OFFICES: Office[] = [
  { flag: '🇨🇦', city: 'Vancouver', country: 'Canada', email: 'info@elimunow.com', phone: '+1 780 512 7513' },
  { flag: '🇺🇸', city: 'Seattle', country: 'USA', email: 'usa@elimunow.com', phone: '+1 (253) 600-5998' },
  { flag: '🇰🇪', city: 'Nairobi', country: 'Kenya', email: 'administration@elimunow.com', phone: '+254 748 307 159' },
  { flag: '🇷🇼', city: 'Kigali', country: 'Rwanda', email: 'info@masomonow.com', phone: '+250 793 412 612' },
  { flag: '🇪🇹', city: 'Jijiga', country: 'Ethiopia', email: 'ethiopia@elimunow.com', phone: '+251 983 092 003' },
  { flag: '🇩🇪', city: 'Bonn', country: 'Germany', email: 'europe@elimunow.com', phone: '+49 172 621 7823' },
  { flag: '🇨🇳', city: 'Nanjing', country: 'China', email: 'asia@elimunow.com', phone: '+86 186 6271 9751' },
  { flag: '🇦🇪', city: 'Dubai', country: 'United Arab Emirates', comingSoon: true },
]
