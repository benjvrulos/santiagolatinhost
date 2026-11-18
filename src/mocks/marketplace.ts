export type MarketCategoryId = 'culture' | 'food' | 'dance' | 'nature' | 'events' | 'stays';

export interface MarketCategory {
  id: MarketCategoryId;
  icon: string;
  labelKey: string;
}

export const marketCategories: MarketCategory[] = [
  { id: 'culture', icon: 'ri-building-4-line', labelKey: 'cat_culture' },
  { id: 'food', icon: 'ri-restaurant-2-line', labelKey: 'cat_food' },
  { id: 'dance', icon: 'ri-music-2-line', labelKey: 'cat_dance' },
  { id: 'nature', icon: 'ri-landscape-line', labelKey: 'cat_nature' },
  { id: 'events', icon: 'ri-calendar-event-line', labelKey: 'cat_events' },
  { id: 'stays', icon: 'ri-hotel-bed-line', labelKey: 'cat_stays' },
];

export interface MarketExperience {
  id: string;
  name: string;
  category: MarketCategoryId;
  img: string;
  location: string;
  durationHours?: number;
  nights?: number;
  price: number;
  languages: string;
  provider: string;
  experienceId?: string;
  prototype?: boolean;
  months: number[];
}

export const marketExperiences: MarketExperience[] = [
  {
    id: 'paseo',
    name: 'Santiago Historic Walk + Latin Dance Class',
    category: 'culture',
    img: 'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/d95d880e-731e-4ffc-8164-ebc7619a7f22_barrio-lastarria-hero.jpg?v=a306b20921552eeeb5f74fbac60cc56d',
    location: 'Santiago',
    durationHours: 4,
    price: 55,
    languages: 'EN · ES',
    provider: 'Barrio Lastarria Collective',
    experienceId: 'paseo',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'noche',
    name: 'Santiago Latin Night',
    category: 'dance',
    img: 'https://storage.readdy-site.link/project_files/eea0565c-b03f-417c-8598-97810ce4b085/f67d257d-40c2-4e72-bf67-593b269d4f0a_patio-bellavista.webp?v=16dc815b05371bbc734b392afb502d3f',
    location: 'Santiago',
    durationHours: 5,
    price: 65,
    languages: 'EN · ES · 中文',
    provider: 'Orixas Salsoteca',
    experienceId: 'noche',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'bachata',
    name: 'Bachata Social Night',
    category: 'dance',
    img: 'https://readdy.ai/api/search-image?query=Intimate%20bachata%20social%20dance%20night%20in%20Santiago%20Chile%20warm%20venue%20with%20string%20lights%20people%20dancing%20close%20elegant%20motion%20candid%20documentary%20photography%20amber%20and%20crimson%20tones&width=1600&height=1200&seq=slh-detail-bachata&orientation=landscape',
    location: 'Santiago',
    durationHours: 3.5,
    price: 35,
    languages: 'EN · ES',
    provider: 'Habana Salsa Club',
    experienceId: 'bachata',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'mercado-wine',
    name: 'Mercado Central & Chilean Wine Tasting',
    category: 'food',
    img: 'https://readdy.ai/api/search-image?query=Chilean%20wine%20tasting%20with%20cheese%20and%20grapes%20on%20a%20rustic%20wooden%20table%2C%20warm%20candlelight%2C%20cozy%20restaurant%20in%20Santiago%20Chile%2C%20editorial%20food%20photography%2C%20rich%20warm%20tones&width=800&height=600&seq=mkt-food-wine&orientation=landscape',
    location: 'Santiago',
    durationHours: 3,
    price: 48,
    languages: 'EN · ES',
    provider: 'Sabores de Chile',
    prototype: true,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'museo-patrimonio',
    name: 'Museum & Heritage Quarter Morning',
    category: 'culture',
    img: 'https://readdy.ai/api/search-image?query=Elegant%20museum%20hall%20in%20Santiago%20Chile%20with%20warm%20lighting%20and%20colonial%20architecture%20details%2C%20visitors%20admiring%20art%2C%20editorial%20travel%20photography%2C%20soft%20amber%20tones&width=800&height=600&seq=mkt-culture-museum&orientation=landscape',
    location: 'Santiago',
    durationHours: 2.5,
    price: 30,
    languages: 'EN · ES',
    provider: 'Ruta Patrimonial',
    prototype: true,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'cajon-maipo',
    name: 'Cajón del Maipo & Andean Hot Springs',
    category: 'nature',
    img: 'https://readdy.ai/api/search-image?query=Andean%20mountain%20landscape%20near%20Cajon%20del%20Maipo%20Chile%20with%20turquoise%20river%20and%20snow%20capped%20peaks%2C%20golden%20sunlight%2C%20breathtaking%20nature%20photography&width=800&height=600&seq=mkt-nature-cajon&orientation=landscape',
    location: 'Cajón del Maipo',
    durationHours: 9,
    price: 95,
    languages: 'EN · ES',
    provider: 'Andes Day Trips',
    prototype: true,
    months: [9, 10, 11, 12, 1, 2, 3],
  },
  {
    id: 'valle-casablanca',
    name: 'Casablanca Valley Wine Route',
    category: 'nature',
    img: 'https://readdy.ai/api/search-image?query=Rolling%20vineyards%20in%20Casablanca%20Valley%20Chile%20at%20golden%20hour%20with%20rows%20of%20vines%20and%20distant%20hills%2C%20warm%20editorial%20landscape%20photography&width=800&height=600&seq=mkt-nature-casablanca&orientation=landscape',
    location: 'Casablanca',
    durationHours: 8,
    price: 120,
    languages: 'EN · ES',
    provider: 'Vinos & Valle',
    prototype: true,
    months: [1, 2, 3, 4, 9, 10, 11, 12],
  },
  {
    id: 'salsa-social',
    name: 'Monday Salsa Social',
    category: 'dance',
    img: 'https://readdy.ai/api/search-image?query=Warm%20salsa%20social%20night%20in%20Santiago%20Chile%20with%20couples%20dancing%20under%20amber%20lights%2C%20joyful%20energy%2C%20cinematic%20documentary%20photography&width=800&height=600&seq=mkt-dance-social&orientation=landscape',
    location: 'Santiago',
    durationHours: 3,
    price: 25,
    languages: 'EN · ES',
    provider: 'Casa de la Salsa',
    prototype: true,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'fiestas-patrias',
    name: 'Fiestas Patrias Experience',
    category: 'events',
    img: 'https://readdy.ai/api/search-image?query=Chilean%20Fiestas%20Patrias%20celebration%20with%20colorful%20flags%2C%20traditional%20dancers%20and%20festive%20lights%2C%20joyful%20crowd%2C%20warm%20documentary%20photography&width=800&height=600&seq=mkt-event-fiestas&orientation=landscape',
    location: 'Santiago',
    durationHours: 6,
    price: 45,
    languages: 'EN · ES',
    provider: 'Fondas Culturales',
    prototype: true,
    months: [9],
  },
  {
    id: 'la-tirana',
    name: 'Fiesta de La Tirana Journey',
    category: 'events',
    img: 'https://readdy.ai/api/search-image?query=Fiesta%20de%20La%20Tirana%20religious%20festival%20in%20northern%20Chile%20with%20colorful%20costumes%20and%20dancers%2C%20vibrant%20cultural%20celebration%2C%20documentary%20photography&width=800&height=600&seq=mkt-event-tirana&orientation=landscape',
    location: 'Tarapacá',
    durationHours: 10,
    price: 130,
    languages: 'EN · ES',
    provider: 'Norte Andino Tours',
    prototype: true,
    months: [7],
  },
  {
    id: 'bellavista-boutique',
    name: 'Boutique Stay in Bellavista',
    category: 'stays',
    img: 'https://readdy.ai/api/search-image?query=Boutique%20hotel%20terrace%20in%20Bellavista%20Santiago%20Chile%20with%20colorful%20walls%2C%20plants%20and%20city%20view%2C%20warm%20evening%20light%2C%20cozy%20editorial%20interior%20photography&width=800&height=600&seq=mkt-stay-bellavista&orientation=landscape',
    location: 'Santiago',
    nights: 2,
    price: 140,
    languages: 'EN · ES · 中文',
    provider: 'Casa Bellavista',
    prototype: true,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'lastarria-design',
    name: 'Design Hotel in Lastarria',
    category: 'stays',
    img: 'https://readdy.ai/api/search-image?query=Modern%20design%20hotel%20room%20in%20Santiago%20Chile%20with%20warm%20wood%20tones%2C%20large%20window%20and%20city%20lights%2C%20minimal%20elegant%20interior%20photography&width=800&height=600&seq=mkt-stay-lastarria&orientation=landscape',
    location: 'Santiago',
    nights: 3,
    price: 210,
    languages: 'EN · ES',
    provider: 'Hotel Lastarria',
    prototype: true,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

export interface MarketEvent {
  id: string;
  name: string;
  category: MarketCategoryId;
  month: number;
  location: string;
  note: string;
}

export const marketEvents: MarketEvent[] = [
  { id: 'ev-santiago-a-mil', name: 'Santiago a Mil', category: 'culture', month: 1, location: 'Santiago', note: 'International theater festival across the city.' },
  { id: 'ev-vendimia', name: 'Vendimia Wine Harvest', category: 'food', month: 3, location: 'Valle de Colchagua', note: 'Grape harvest celebrations and vineyard tastings.' },
  { id: 'ev-lollapalooza', name: 'Lollapalooza Chile', category: 'events', month: 3, location: 'Santiago', note: 'Major open-air music festival in Parque O\'Higgins.' },
  { id: 'ev-la-tirana', name: 'Fiesta de La Tirana', category: 'culture', month: 7, location: 'Tarapacá', note: 'Northern Chile\'s largest religious and dance festival.' },
  { id: 'ev-fiestas-patrias', name: 'Fiestas Patrias', category: 'events', month: 9, location: 'Santiago', note: 'National holidays with fondas, cueca and traditional food.' },
  { id: 'ev-halloween', name: 'Día de las Brujas', category: 'dance', month: 10, location: 'Santiago', note: 'Halloween nightlife specials across Bellavista and Brasil.' },
  { id: 'ev-dance-congress', name: 'Latin Dance Congress', category: 'dance', month: 11, location: 'Santiago', note: 'Workshops and socials with local and international dancers.' },
  { id: 'ev-new-year', name: 'New Year in Valparaíso', category: 'events', month: 12, location: 'Valparaíso', note: 'Coastal fireworks and street celebrations.' },
];