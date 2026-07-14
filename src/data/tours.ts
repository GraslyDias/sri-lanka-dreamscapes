import heroHighlands from "@/assets/hero-highlands.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import pkgCoast from "@/assets/pkg-coast.jpg";
import tourHero from "@/assets/tour-hero.jpg";
import hotelBungalow from "@/assets/hotel-bungalow.jpg";
import actSafari from "@/assets/act-safari.jpg";
import actAyurveda from "@/assets/act-ayurveda.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galBreakfast from "@/assets/gal-breakfast.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galYacht from "@/assets/gal-yacht.jpg";

export type TourCategory =
  | "Luxury"
  | "Wellness"
  | "Wildlife"
  | "Honeymoon"
  | "Family"
  | "Adventure"
  | "Cultural";

export type ItineraryDay = {
  day: number;
  title: string;
  body: string;
  activities: string[];
  meals: string;
  accommodation: string;
  image?: string;
  notes?: string;
};

export type Hotel = {
  name: string;
  stars: number;
  location: string;
  amenities: string[];
  image: string;
};

export type ActivityItem = {
  title: string;
  category: string;
  meta: string;
  image: string;
};

export type Tour = {
  slug: string;
  title: string;
  tagline: string;
  category: TourCategory;
  categories: TourCategory[]; // secondary tags for filter overlap
  heroImage: string;
  coverImage: string;
  duration: string;
  days: number;
  destinations: string[];
  routeSummary: string;
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  longDescription: string;
  googleMapsEmbedUrl: string;
  googleMapsLink?: string;
  routeDistanceKm: number;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  hotels: Hotel[];
  activities: ActivityItem[];
  gallery: string[];
  seo: { title: string; description: string };
};

const commonExclusions = [
  "International flights",
  "Personal travel insurance",
  "Visa fees",
  "Personal expenses",
];

const slEmbed =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013419.0!2d80.7!3d7.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe1edcfbc82f13a35!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000";

function buildDays(entries: Array<Omit<ItineraryDay, "day">>): ItineraryDay[] {
  return entries.map((e, i) => ({ day: i + 1, ...e }));
}

export const tours: Tour[] = [
  {
    slug: "beyond-the-ordinary-sri-lanka",
    title: "Beyond the Ordinary Sri Lanka",
    tagline: "The definitive 12-day private expedition",
    category: "Luxury",
    categories: ["Luxury", "Cultural", "Wildlife"],
    heroImage: tourHero,
    coverImage: pkgYala,
    duration: "12 Days · 11 Nights",
    days: 12,
    destinations: ["Colombo", "Sigiriya", "Kandy", "Nuwara Eliya", "Yala", "Galle"],
    routeSummary: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Yala → Galle",
    startingPrice: 8400,
    rating: 4.9,
    reviewsCount: 128,
    shortDescription:
      "A masterfully paced study of the island's four essential moods — heritage, highlands, wilderness and southern shore.",
    longDescription:
      "Our most requested journey unfolds across ancient ruins, misted tea country, private safari and the salt-washed south. Every night is chosen; every transition is choreographed.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 842,
    inclusions: [
      "Private airport transfers",
      "5-star heritage accommodation",
      "All breakfasts & 6 signature dinners",
      "Chauffeur-guide throughout",
      "Private safari with specialist naturalist",
      "Ayurvedic wellness ritual",
      "24/7 in-country concierge",
      "All service taxes & tips",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      {
        title: "Arrival · Colombo Heritage",
        body: "Private airport transfer, evening walking tour of 19th-century mansions, dinner at a private colonial residence.",
        activities: ["Heritage walk", "Private dinner"],
        meals: "Dinner",
        accommodation: "Galle Face Hotel · Heritage Wing",
      },
      {
        title: "Sacred Heights · Sigiriya",
        body: "Ascend the Lion Rock at dawn before crowds arrive. Sunset picnic overlooking the plains.",
        activities: ["Lion Rock climb", "Sunset picnic"],
        meals: "Breakfast, Dinner",
        accommodation: "Water Garden Sigiriya",
      },
      {
        title: "Dambulla Caves & Villages",
        body: "Private access to the Dambulla cave temples followed by a village cycle to a lakeside lunch.",
        activities: ["Cave temples", "Village cycle"],
        meals: "Breakfast, Lunch",
        accommodation: "Water Garden Sigiriya",
      },
      {
        title: "Kandy · The Sacred Tooth",
        body: "Private evening puja at the Temple of the Tooth Relic with a resident monk.",
        activities: ["Temple ceremony", "Kandyan dance"],
        meals: "Breakfast, Dinner",
        accommodation: "Kings Pavilion",
      },
      {
        title: "Mist & Tea · Nuwara Eliya",
        body: "A private tea-plucking morning with the estate manager, afternoon vintage first-class rail carriage.",
        activities: ["Tea estate walk", "Scenic rail"],
        meals: "Breakfast, Lunch",
        accommodation: "Ceylon Tea Trails · Norwood Bungalow",
      },
      {
        title: "Highland Slow Days",
        body: "Highland picnics, waterfall walks, a curated tea tasting flight at sunset.",
        activities: ["Waterfall walk", "Tea tasting"],
        meals: "Full board",
        accommodation: "Ceylon Tea Trails · Norwood Bungalow",
      },
      {
        title: "Transfer to Yala",
        body: "Scenic descent to the southern plains via Ella and hidden waterfalls.",
        activities: ["Nine Arch Bridge", "Ravana Falls"],
        meals: "Breakfast, Dinner",
        accommodation: "Wild Coast Tented Lodge",
      },
      {
        title: "Wild Interior · Yala",
        body: "Full-day private jeep safari with a specialist naturalist, tracking leopard and sloth bear.",
        activities: ["Private safari"],
        meals: "Full board",
        accommodation: "Wild Coast Tented Lodge",
      },
      {
        title: "Coastal Transfer · Galle",
        body: "Slow drive along the south coast with a stilt-fisher stop and beachfront lunch.",
        activities: ["Coastal drive"],
        meals: "Breakfast, Lunch",
        accommodation: "Amangalla · Galle",
      },
      {
        title: "Galle Fort at Golden Hour",
        body: "Colonial rampart walks, a private lunch with a local artist, sundown gin at the ramparts.",
        activities: ["Fort walk", "Artist lunch"],
        meals: "Breakfast, Lunch",
        accommodation: "Amangalla · Galle",
      },
      {
        title: "Ocean Days",
        body: "Time to slow at the water's edge — private catamaran, in-villa Ayurveda.",
        activities: ["Catamaran sail", "Spa ritual"],
        meals: "Full board",
        accommodation: "Amangalla · Galle",
      },
      {
        title: "Departure",
        body: "Private transfer to Colombo airport with day-use suite.",
        activities: ["Airport transfer"],
        meals: "Breakfast",
        accommodation: "—",
      },
    ]),
    hotels: [
      { name: "Ceylon Tea Trails", stars: 5, location: "Norwood · Highlands", amenities: ["Butler", "Full board", "Pool"], image: hotelBungalow },
      { name: "Amangalla", stars: 5, location: "Galle Fort", amenities: ["Heritage", "Spa", "Pool"], image: destGalle },
      { name: "Water Garden Sigiriya", stars: 5, location: "Cultural Triangle", amenities: ["Private pool villas", "Spa"], image: destSigiriya },
      { name: "Wild Coast Tented Lodge", stars: 5, location: "Yala", amenities: ["Tented cocoons", "Pool"], image: heroHighlands },
    ],
    activities: [
      { title: "Leopard Tracking at First Light", category: "Wildlife · Private", meta: "Half day · Yala", image: actSafari },
      { title: "Ayurvedic Awakening Ritual", category: "Wellness · Private", meta: "90 minutes · In-villa", image: actAyurveda },
      { title: "Private Temple Ceremony", category: "Cultural · Private", meta: "Evening · Kandy", image: galTemple },
      { title: "Estate Tea Plucking", category: "Heritage · Private", meta: "Morning · Norwood", image: galTea },
    ],
    gallery: [galTea, galBreakfast, galTemple, galYacht, destSigiriya, destGalle],
    seo: {
      title: "Beyond the Ordinary — 12 Day Luxury Sri Lanka Journey · Vaya Ceylon",
      description: "A private 12-day expedition through Sri Lanka's heritage sites, tea country, wilderness and southern coast.",
    },
  },
  {
    slug: "sri-lanka-wellness-escape",
    title: "Sri Lanka Wellness Escape",
    tagline: "Ayurveda, yoga and slow highland days",
    category: "Wellness",
    categories: ["Wellness", "Luxury"],
    heroImage: heroHighlands,
    coverImage: actAyurveda,
    duration: "9 Days · 8 Nights",
    days: 9,
    destinations: ["Negombo", "Sigiriya", "Kandy", "Ella", "Galle"],
    routeSummary: "Negombo → Sigiriya → Kandy → Ella → Galle",
    startingPrice: 5900,
    rating: 4.8,
    reviewsCount: 74,
    shortDescription:
      "A restorative journey through Ayurvedic retreats and highland stillness, paced for genuine rest.",
    longDescription:
      "Daily rituals of oil, breath and slow movement in some of the island's most storied wellness sanctuaries. Between them, quiet highlands and coastal sanctuaries.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 610,
    inclusions: [
      "Private transfers throughout",
      "Boutique wellness accommodation",
      "Daily Ayurveda consultations",
      "Yoga & meditation sessions",
      "All meals (Ayurvedic menu)",
      "Herbal steam & shirodhara",
      "24/7 concierge",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival & Coastal Grounding", body: "Warm welcome, foot ritual, ocean-facing dinner.", activities: ["Foot ritual"], meals: "Dinner", accommodation: "Jetwing Lagoon" },
      { title: "Cultural Triangle Transfer", body: "Slow drive with a lakeside lunch.", activities: ["Scenic drive"], meals: "Full board", accommodation: "Ulagalla Resort" },
      { title: "Forest Meditation", body: "Dawn meditation, gentle yoga, herbal spa ritual.", activities: ["Yoga", "Shirodhara"], meals: "Full board", accommodation: "Ulagalla Resort" },
      { title: "Kandy Sacred Days", body: "Ayurvedic consultation, tea garden walk, temple visit.", activities: ["Consultation", "Temple visit"], meals: "Full board", accommodation: "Santani Wellness" },
      { title: "Deep Retreat", body: "Personalised treatments, silent lunch, breathwork.", activities: ["Treatments", "Breathwork"], meals: "Full board", accommodation: "Santani Wellness" },
      { title: "Highland Descent · Ella", body: "Scenic rail, gentle hike to a hidden waterfall.", activities: ["Rail journey", "Waterfall hike"], meals: "Full board", accommodation: "98 Acres" },
      { title: "Southern Transfer", body: "Coastal transfer, sunset yoga on the sand.", activities: ["Yoga"], meals: "Full board", accommodation: "Cape Weligama" },
      { title: "Ocean Rituals", body: "Reef snorkel, cliff-side treatments.", activities: ["Snorkel", "Massage"], meals: "Full board", accommodation: "Cape Weligama" },
      { title: "Departure", body: "Closing ritual, airport transfer.", activities: ["Airport transfer"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Santani Wellness", stars: 5, location: "Kandy Hills", amenities: ["Ayurveda", "Yoga", "Silent zones"], image: actAyurveda },
      { name: "Ulagalla Resort", stars: 5, location: "Anuradhapura", amenities: ["Private pool villas", "Spa"], image: hotelBungalow },
      { name: "Cape Weligama", stars: 5, location: "Southern Coast", amenities: ["Cliff pool", "Spa"], image: destGalle },
    ],
    activities: [
      { title: "Personalised Ayurveda Programme", category: "Wellness", meta: "Daily", image: actAyurveda },
      { title: "Sunrise Yoga on the Cliffs", category: "Movement", meta: "60 min", image: galYacht },
    ],
    gallery: [actAyurveda, galTea, galBreakfast, heroHighlands],
    seo: {
      title: "Sri Lanka Wellness Escape — 9 Day Ayurveda Journey · Vaya Ceylon",
      description: "A restorative 9-day Ayurveda and yoga journey across Sri Lanka's most respected wellness sanctuaries.",
    },
  },
  {
    slug: "ultimate-wildlife-adventure",
    title: "Ultimate Wildlife Adventure",
    tagline: "Leopards, elephants, whales — three ecosystems, one week",
    category: "Wildlife",
    categories: ["Wildlife", "Adventure"],
    heroImage: pkgYala,
    coverImage: actSafari,
    duration: "8 Days · 7 Nights",
    days: 8,
    destinations: ["Wilpattu", "Minneriya", "Udawalawe", "Yala", "Mirissa"],
    routeSummary: "Wilpattu → Minneriya → Udawalawe → Yala → Mirissa",
    startingPrice: 6800,
    rating: 4.9,
    reviewsCount: 92,
    shortDescription:
      "Track leopard, witness The Gathering of elephants and set out for blue whales — with the island's finest naturalists.",
    longDescription:
      "A specialist journey engineered for wildlife enthusiasts. Private jeeps, small-group camps, and mornings that begin before the light.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 780,
    inclusions: [
      "Private safari jeeps",
      "Specialist naturalist guide",
      "Luxury tented camps",
      "All park permits",
      "Whale watching charter",
      "All meals",
      "Airport transfers",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival · Wilpattu", body: "Transfer to Wilpattu, evening game drive.", activities: ["Game drive"], meals: "Dinner", accommodation: "Leopard Trails Wilpattu" },
      { title: "Wilpattu Full Day", body: "Dawn and dusk safaris in Sri Lanka's largest park.", activities: ["Safari"], meals: "Full board", accommodation: "Leopard Trails Wilpattu" },
      { title: "Minneriya · The Gathering", body: "Elephant gathering at the tank basin.", activities: ["Elephant safari"], meals: "Full board", accommodation: "Water Garden Sigiriya" },
      { title: "Transfer · Udawalawe", body: "Scenic drive to the elephant transit home.", activities: ["Elephant transit"], meals: "Full board", accommodation: "Kalu's Hideaway" },
      { title: "Yala Private Bloc", body: "Restricted-access bloc safari.", activities: ["Private safari"], meals: "Full board", accommodation: "Wild Coast Tented Lodge" },
      { title: "Yala Second Day", body: "Dawn tracking with the reserve's senior naturalist.", activities: ["Safari"], meals: "Full board", accommodation: "Wild Coast Tented Lodge" },
      { title: "Mirissa · Blue Whales", body: "Private charter into the Indian Ocean at dawn.", activities: ["Whale watching"], meals: "Full board", accommodation: "Cape Weligama" },
      { title: "Departure", body: "Coastal transfer to airport.", activities: ["Airport transfer"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Leopard Trails Wilpattu", stars: 5, location: "Wilpattu", amenities: ["Tented", "Private guide"], image: actSafari },
      { name: "Wild Coast Tented Lodge", stars: 5, location: "Yala", amenities: ["Cocoons", "Pool"], image: heroHighlands },
    ],
    activities: [
      { title: "Private Leopard Tracking", category: "Wildlife", meta: "Half day · Yala", image: actSafari },
      { title: "Blue Whale Charter", category: "Marine", meta: "Dawn · Mirissa", image: galYacht },
    ],
    gallery: [actSafari, pkgYala, galYacht, heroHighlands],
    seo: {
      title: "Ultimate Wildlife Adventure — Sri Lanka Safari Journey · Vaya Ceylon",
      description: "An 8-day private safari across Wilpattu, Minneriya, Udawalawe, Yala and Mirissa.",
    },
  },
  {
    slug: "southern-coast-discovery",
    title: "Southern Coast Discovery",
    tagline: "Fort walls, surf breaks and turtle bays",
    category: "Adventure",
    categories: ["Adventure", "Family"],
    heroImage: pkgCoast,
    coverImage: pkgCoast,
    duration: "7 Days · 6 Nights",
    days: 7,
    destinations: ["Bentota", "Galle", "Weligama", "Tangalle"],
    routeSummary: "Bentota → Galle → Weligama → Tangalle",
    startingPrice: 3900,
    rating: 4.7,
    reviewsCount: 58,
    shortDescription:
      "Colonial forts, sleepy surf towns and mangrove estuaries — the softer side of the island.",
    longDescription:
      "A relaxed coastal ramble spanning heritage towns, warm surf breaks and hidden bays. Perfect as a standalone escape or a coastal add-on.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 320,
    inclusions: [
      "Private transfers",
      "Boutique beachfront hotels",
      "Daily breakfast & 4 dinners",
      "Surf lesson & mangrove safari",
      "Fort walking tour",
      "Airport transfers",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival · Bentota", body: "Airport pickup and mangrove estuary sunset.", activities: ["Mangrove cruise"], meals: "Dinner", accommodation: "Villa Bentota" },
      { title: "River & Reef", body: "Snorkel Hikkaduwa reef; afternoon river safari.", activities: ["Snorkel", "River safari"], meals: "Breakfast, Dinner", accommodation: "Villa Bentota" },
      { title: "Transfer · Galle Fort", body: "Colonial walking tour with a historian.", activities: ["Fort walk"], meals: "Breakfast", accommodation: "Fort Bazaar" },
      { title: "Galle at Leisure", body: "Independent exploration of the ramparts and boutiques.", activities: ["Leisure"], meals: "Breakfast", accommodation: "Fort Bazaar" },
      { title: "Weligama Surf", body: "Private surf lesson at Weligama Bay.", activities: ["Surf lesson"], meals: "Breakfast, Dinner", accommodation: "Cape Weligama" },
      { title: "Tangalle Turtle Bay", body: "Turtle hatchery visit and beach picnic.", activities: ["Turtles", "Beach"], meals: "Breakfast, Dinner", accommodation: "Amanwella" },
      { title: "Departure", body: "Coastal transfer to Colombo airport.", activities: ["Transfer"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Amanwella", stars: 5, location: "Tangalle", amenities: ["Beach club", "Suites"], image: pkgCoast },
      { name: "Fort Bazaar", stars: 4, location: "Galle Fort", amenities: ["Heritage", "Rooftop"], image: destGalle },
    ],
    activities: [
      { title: "Private Surf Lesson", category: "Adventure", meta: "2 hrs · Weligama", image: pkgCoast },
      { title: "Galle Fort Historian Tour", category: "Cultural", meta: "Morning · Galle", image: destGalle },
    ],
    gallery: [pkgCoast, destGalle, galYacht, galBreakfast],
    seo: {
      title: "Southern Coast Discovery — 7 Day Sri Lanka Beach Journey · Vaya Ceylon",
      description: "A 7-day coastal journey through Bentota, Galle, Weligama and Tangalle.",
    },
  },
  {
    slug: "cultural-triangle-experience",
    title: "Cultural Triangle Experience",
    tagline: "Ancient capitals, cave temples and sacred rock",
    category: "Cultural",
    categories: ["Cultural", "Luxury"],
    heroImage: destSigiriya,
    coverImage: destSigiriya,
    duration: "6 Days · 5 Nights",
    days: 6,
    destinations: ["Anuradhapura", "Polonnaruwa", "Sigiriya", "Dambulla", "Kandy"],
    routeSummary: "Anuradhapura → Polonnaruwa → Sigiriya → Dambulla → Kandy",
    startingPrice: 3200,
    rating: 4.8,
    reviewsCount: 66,
    shortDescription:
      "A focused immersion in the island's UNESCO heritage — 2,500 years of civilisation in six days.",
    longDescription:
      "The Cultural Triangle draws a line between three ancient capitals and the sacred city of Kandy. Curated with private access and specialist guides.",
    googleMapsEmbedUrl: "https://maps.google.com/maps?saddr=Polonnaruwa&daddr=Anuradhapura+to:Sigiriya+to:Dambulla+to:Kandy&output=embed",
    googleMapsLink: "https://www.google.com/maps/dir/Polonnaruwa/Anuradhapura/Sigiriya/Dambulla/Kandy/@7.8031468,80.3732275,10z/data=!3m1!4b1!4m37!4m36!1m10!1m1!1s0x3afb44ba3b16ce27:0xc34997a2b3032b7c!2m2!1d81.0001183!2d7.914703!3m4!1m2!1d80.8316737!2d7.80421!3s0x3afb56362408d1ab:0xc1dcf447d29c3c46!1m5!1m1!1s0x3afcf4f99360e159:0xc111fe9ebc6dcf0e!2m2!1d80.4036508!2d8.3113518!1m5!1m1!1s0x3afca15b724c9ab3:0xab1771275b370d52!2m2!1d80.760257!2d7.9570327!1m5!1m1!1s0x3afcaff4c8adcc4f:0x67ae3cc5b1536914!2m2!1d80.6510856!2d7.8741017!1m5!1m1!1s0x3ae366266498acd3:0x411a3818a1e03c35!2m2!1d80.6337262!2d7.2905715!3e9!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
    routeDistanceKm: 420,
    inclusions: [
      "Private historian-guide",
      "All heritage entrance fees",
      "5-star heritage stays",
      "All breakfasts & 3 dinners",
      "Private temple ceremony",
      "Airport transfers",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival · Anuradhapura", body: "Transfer north to the first ancient capital.", activities: ["Sri Maha Bodhi"], meals: "Dinner", accommodation: "Ulagalla Resort" },
      { title: "Ancient City", body: "Dawn cycle through the ruins with a historian.", activities: ["Ruins tour"], meals: "Breakfast", accommodation: "Ulagalla Resort" },
      { title: "Polonnaruwa · Second Capital", body: "Private tour of the Gal Vihara rock sculptures.", activities: ["Rock temple"], meals: "Breakfast, Dinner", accommodation: "Water Garden Sigiriya" },
      { title: "Sigiriya · Lion Rock", body: "Dawn ascent, afternoon Dambulla caves.", activities: ["Climb", "Cave temples"], meals: "Breakfast", accommodation: "Water Garden Sigiriya" },
      { title: "Kandy · Sacred City", body: "Evening puja with a resident monk.", activities: ["Temple ceremony"], meals: "Breakfast, Dinner", accommodation: "Kings Pavilion" },
      { title: "Departure", body: "Scenic transfer via Peradeniya Gardens to airport.", activities: ["Gardens"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Water Garden Sigiriya", stars: 5, location: "Sigiriya", amenities: ["Villas", "Spa"], image: destSigiriya },
      { name: "Ulagalla Resort", stars: 5, location: "Anuradhapura", amenities: ["Villas", "Cycling"], image: hotelBungalow },
    ],
    activities: [
      { title: "Lion Rock Dawn Ascent", category: "Heritage", meta: "Half day · Sigiriya", image: destSigiriya },
      { title: "Private Temple Puja", category: "Cultural", meta: "Evening · Kandy", image: galTemple },
    ],
    gallery: [destSigiriya, galTemple, galBreakfast, heroHighlands],
    seo: {
      title: "Cultural Triangle Experience — 6 Day Heritage Journey · Vaya Ceylon",
      description: "Six days across Sri Lanka's UNESCO heritage sites with private historian guides.",
    },
  },
  {
    slug: "luxury-honeymoon-journey",
    title: "Luxury Honeymoon Journey",
    tagline: "Private villas, candlelit rituals and ocean sunsets",
    category: "Honeymoon",
    categories: ["Honeymoon", "Luxury", "Wellness"],
    heroImage: pkgCoast,
    coverImage: hotelBungalow,
    duration: "10 Days · 9 Nights",
    days: 10,
    destinations: ["Kandy", "Nuwara Eliya", "Galle", "Tangalle"],
    routeSummary: "Kandy → Nuwara Eliya → Galle → Tangalle",
    startingPrice: 9800,
    rating: 5.0,
    reviewsCount: 41,
    shortDescription:
      "An intimate 10-day arc from misted highlands to private beach villas — for slow, romantic days.",
    longDescription:
      "Designed exclusively for couples: candlelit dinners in tea fields, in-villa rituals, and long, unhurried mornings by the ocean.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 540,
    inclusions: [
      "Private chauffeur-guide",
      "Suite upgrades where available",
      "Honeymoon amenities daily",
      "Private candlelit dinner",
      "Couples spa ritual",
      "All breakfasts & 5 dinners",
      "Airport transfers",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival · Kandy Hills", body: "Welcome flowers, in-suite honeymoon set-up.", activities: ["Welcome ritual"], meals: "Dinner", accommodation: "Santani Wellness" },
      { title: "Kandy Sacred", body: "Private temple visit and lakeside stroll.", activities: ["Temple"], meals: "Breakfast, Dinner", accommodation: "Santani Wellness" },
      { title: "Highland Transfer", body: "First-class scenic rail into the tea country.", activities: ["Rail journey"], meals: "Full board", accommodation: "Ceylon Tea Trails" },
      { title: "Tea Fields Dinner", body: "Candlelit dinner in a tea field under the stars.", activities: ["Private dinner"], meals: "Full board", accommodation: "Ceylon Tea Trails" },
      { title: "Descent to Galle", body: "Scenic transfer south with a Galle fort sunset.", activities: ["Fort walk"], meals: "Breakfast, Dinner", accommodation: "Amangalla" },
      { title: "Galle Slow Day", body: "Boutiques and rampart cocktails.", activities: ["Leisure"], meals: "Breakfast", accommodation: "Amangalla" },
      { title: "Private Villa · Tangalle", body: "Transfer to a private beachfront villa.", activities: ["Villa arrival"], meals: "Full board", accommodation: "Private Villa Tangalle" },
      { title: "Ocean Rituals", body: "Couples Ayurvedic ritual, private beach picnic.", activities: ["Spa", "Beach picnic"], meals: "Full board", accommodation: "Private Villa Tangalle" },
      { title: "Catamaran Sunset", body: "Private catamaran with champagne at sunset.", activities: ["Sail"], meals: "Full board", accommodation: "Private Villa Tangalle" },
      { title: "Departure", body: "Private transfer to Colombo airport.", activities: ["Transfer"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Ceylon Tea Trails", stars: 5, location: "Highlands", amenities: ["Bungalows", "Full board"], image: hotelBungalow },
      { name: "Amangalla", stars: 5, location: "Galle Fort", amenities: ["Heritage", "Spa"], image: destGalle },
      { name: "Private Villa Tangalle", stars: 5, location: "Tangalle", amenities: ["Butler", "Chef"], image: pkgCoast },
    ],
    activities: [
      { title: "Candlelit Tea Field Dinner", category: "Romance", meta: "Evening · Norwood", image: galBreakfast },
      { title: "Couples Ayurvedic Ritual", category: "Wellness", meta: "90 min · Villa", image: actAyurveda },
    ],
    gallery: [hotelBungalow, pkgCoast, galBreakfast, galYacht],
    seo: {
      title: "Luxury Honeymoon Journey — 10 Day Sri Lanka Romance · Vaya Ceylon",
      description: "An intimate 10-day honeymoon through Sri Lanka's most romantic highland and coastal sanctuaries.",
    },
  },
  {
    slug: "tea-country-retreat",
    title: "Tea Country Retreat",
    tagline: "Mist, planters' bungalows and slow highland days",
    category: "Luxury",
    categories: ["Luxury", "Wellness", "Cultural"],
    heroImage: heroHighlands,
    coverImage: galTea,
    duration: "5 Days · 4 Nights",
    days: 5,
    destinations: ["Hatton", "Norwood", "Nuwara Eliya", "Ella"],
    routeSummary: "Hatton → Norwood → Nuwara Eliya → Ella",
    startingPrice: 2800,
    rating: 4.8,
    reviewsCount: 39,
    shortDescription:
      "A short, high-quality escape into the tea highlands — planters' bungalows, mist and long walks.",
    longDescription:
      "Ideal as a standalone short break or a highland add-on. Days move slowly here — a fireplace, a tea tasting, a walk into the mist.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 260,
    inclusions: [
      "Private transfers",
      "Planters' bungalow stays (full board)",
      "Guided tea estate walk",
      "Vintage rail carriage",
      "Waterfall picnic",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival · Highlands", body: "Warm welcome, fireplace tea and estate stroll.", activities: ["Estate walk"], meals: "Dinner", accommodation: "Ceylon Tea Trails · Norwood" },
      { title: "Tea Plucking Morning", body: "A morning with the estate's tea pluckers and factory tour.", activities: ["Tea plucking"], meals: "Full board", accommodation: "Ceylon Tea Trails · Norwood" },
      { title: "Highland Rail", body: "First-class vintage rail carriage to Ella.", activities: ["Rail journey"], meals: "Full board", accommodation: "98 Acres" },
      { title: "Nine Arch & Waterfalls", body: "Sunrise at Nine Arch Bridge, waterfall picnic.", activities: ["Bridge walk", "Picnic"], meals: "Full board", accommodation: "98 Acres" },
      { title: "Departure", body: "Scenic descent to Colombo.", activities: ["Transfer"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Ceylon Tea Trails", stars: 5, location: "Norwood", amenities: ["Butler", "Full board"], image: hotelBungalow },
      { name: "98 Acres", stars: 4, location: "Ella", amenities: ["Chalets", "Views"], image: heroHighlands },
    ],
    activities: [
      { title: "Estate Tea Plucking", category: "Heritage", meta: "Morning · Norwood", image: galTea },
      { title: "Vintage Rail First Class", category: "Journey", meta: "3 hrs · Hill Country", image: heroHighlands },
    ],
    gallery: [heroHighlands, galTea, hotelBungalow, galBreakfast],
    seo: {
      title: "Tea Country Retreat — 5 Day Highland Escape · Vaya Ceylon",
      description: "A five-day retreat into Sri Lanka's tea highlands — planters' bungalows, vintage rail and slow days.",
    },
  },
  {
    slug: "family-adventure-sri-lanka",
    title: "Family Adventure Sri Lanka",
    tagline: "Turtles, elephants and forts — designed for all ages",
    category: "Family",
    categories: ["Family", "Adventure", "Wildlife"],
    heroImage: pkgYala,
    coverImage: pkgYala,
    duration: "11 Days · 10 Nights",
    days: 11,
    destinations: ["Negombo", "Sigiriya", "Kandy", "Udawalawe", "Galle", "Bentota"],
    routeSummary: "Negombo → Sigiriya → Kandy → Udawalawe → Galle → Bentota",
    startingPrice: 5400,
    rating: 4.7,
    reviewsCount: 47,
    shortDescription:
      "A paced adventure engineered for families — elephants, gentle hikes, cooking classes and beach days.",
    longDescription:
      "Balanced days of exploration and downtime, with family-friendly hotels and a chauffeur-guide chosen for warmth with children.",
    googleMapsEmbedUrl: slEmbed,
    routeDistanceKm: 760,
    inclusions: [
      "Private family vehicle & guide",
      "Family suites / interconnecting rooms",
      "All breakfasts & 6 family dinners",
      "Elephant transit visit",
      "Cooking class & village lunch",
      "Snorkel & river safari",
    ],
    exclusions: commonExclusions,
    itinerary: buildDays([
      { title: "Arrival · Negombo", body: "Easy first night by the ocean.", activities: ["Beach"], meals: "Dinner", accommodation: "Jetwing Blue" },
      { title: "Cultural Triangle Transfer", body: "Family drive with a village lunch stop.", activities: ["Village lunch"], meals: "Breakfast, Dinner", accommodation: "Aliya Resort" },
      { title: "Sigiriya Kids' Climb", body: "Age-appropriate ascent with a specialist guide.", activities: ["Climb"], meals: "Breakfast", accommodation: "Aliya Resort" },
      { title: "Habarana Elephant Safari", body: "Open jeep safari at Kaudulla.", activities: ["Safari"], meals: "Breakfast, Dinner", accommodation: "Aliya Resort" },
      { title: "Kandy Highlands", body: "Peradeniya Botanic Gardens, cooking class.", activities: ["Cooking class"], meals: "Breakfast", accommodation: "Cinnamon Citadel" },
      { title: "Transfer · Udawalawe", body: "Elephant transit home visit.", activities: ["Elephant orphanage"], meals: "Breakfast, Dinner", accommodation: "Grand Udawalawe" },
      { title: "Udawalawe Safari", body: "Morning family safari.", activities: ["Safari"], meals: "Breakfast", accommodation: "Grand Udawalawe" },
      { title: "Coastal Transfer · Galle", body: "Fort walk and ice-cream stops.", activities: ["Fort walk"], meals: "Breakfast, Dinner", accommodation: "Le Grand Galle" },
      { title: "Bentota Beach Days", body: "Snorkel and mangrove river safari.", activities: ["Snorkel", "River safari"], meals: "Breakfast", accommodation: "Bentota Beach" },
      { title: "Turtle Hatchery", body: "Visit a conservation hatchery and beach BBQ.", activities: ["Turtles"], meals: "Breakfast, Dinner", accommodation: "Bentota Beach" },
      { title: "Departure", body: "Transfer to Colombo airport.", activities: ["Transfer"], meals: "Breakfast", accommodation: "—" },
    ]),
    hotels: [
      { name: "Aliya Resort", stars: 4, location: "Sigiriya", amenities: ["Pool", "Family rooms"], image: destSigiriya },
      { name: "Grand Udawalawe", stars: 4, location: "Udawalawe", amenities: ["Pool", "Guides"], image: actSafari },
      { name: "Bentota Beach", stars: 4, location: "Bentota", amenities: ["Beach", "Kids club"], image: pkgCoast },
    ],
    activities: [
      { title: "Kaudulla Elephant Safari", category: "Wildlife", meta: "Half day · Habarana", image: actSafari },
      { title: "Family Cooking Class", category: "Cultural", meta: "2 hrs · Kandy", image: galBreakfast },
    ],
    gallery: [pkgYala, actSafari, pkgCoast, galBreakfast],
    seo: {
      title: "Family Adventure Sri Lanka — 11 Day Family Journey · Vaya Ceylon",
      description: "An 11-day family adventure through Sri Lanka's cultural triangle, safari parks and southern beaches.",
    },
  },
];

export const tourCategories: (TourCategory | "All")[] = [
  "All",
  "Luxury",
  "Wellness",
  "Wildlife",
  "Honeymoon",
  "Family",
  "Adventure",
  "Cultural",
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function filterTours(category: string, query = ""): Tour[] {
  const q = query.trim().toLowerCase();
  return tours.filter((t) => {
    const catMatch = category === "All" || t.categories.includes(category as TourCategory);
    if (!catMatch) return false;
    if (!q) return true;
    return (
      t.title.toLowerCase().includes(q) ||
      t.destinations.some((d) => d.toLowerCase().includes(q)) ||
      t.shortDescription.toLowerCase().includes(q)
    );
  });
}
