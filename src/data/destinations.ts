import heroHighlands from "@/assets/hero-highlands.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import pkgCoast from "@/assets/pkg-coast.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galBreakfast from "@/assets/gal-breakfast.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galYacht from "@/assets/gal-yacht.jpg";
import actSafari from "@/assets/act-safari.jpg";
import actAyurveda from "@/assets/act-ayurveda.jpg";
import hotelBungalow from "@/assets/hotel-bungalow.jpg";

export type DestinationCategory =
  | "Mountains"
  | "Wildlife"
  | "Beaches"
  | "Culture"
  | "Wellness"
  | "Heritage";

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  region: string;
  category: DestinationCategory;
  categories: DestinationCategory[];
  heroImage: string;
  coverImage: string;
  description: string;
  longDescription: string;
  highlights: string[];
  activities: string[];
  bestTime: string;
  elevation?: string;
  climate: string;
  nearestCity: string;
  distanceFromColombo: string;
  gallery: string[];
  relatedTourSlugs: string[];
  seo: { title: string; description: string };
};

export const destinations: Destination[] = [
  {
    slug: "ella",
    name: "Ella",
    tagline: "Mist-wrapped valleys and the world's most scenic rail",
    region: "Hill Country",
    category: "Mountains",
    categories: ["Mountains", "Wellness", "Culture"],
    heroImage: heroHighlands,
    coverImage: galTea,
    description: "Ella is a small town nestled among Sri Lanka's misty highlands, beloved for its dramatic scenery, the iconic Nine Arch Bridge and a pace of life that slows the world down.",
    longDescription: "Perched at 1,041 metres above sea level, Ella is where the island's emerald tea terraces meet deep jungle ravines. The train from Kandy — ranked among the world's greatest rail journeys — winds through tunnels of cloud and plantation before arriving at this peaceful highland retreat. The Nine Arch Bridge, a colonial-era engineering marvel, frames mornings and golden hours with equal grace. Hike Little Adam's Peak at dawn, or simply sit with a pot of single-estate tea as the mist rolls across the valley.",
    highlights: [
      "Nine Arch Bridge at sunrise",
      "Little Adam's Peak hike",
      "World's greatest rail journey from Kandy",
      "Single-estate tea tastings",
      "Ravana Falls",
      "Buduruwagala rock sculptures nearby",
    ],
    activities: [
      "Scenic rail journey",
      "Hiking and trekking",
      "Tea estate visits",
      "Photography",
      "Cycling through tea gardens",
      "Waterfall bathing",
    ],
    bestTime: "December to April (dry season). Misty and atmospheric year-round.",
    elevation: "1,041 m",
    climate: "Cool and misty. 16–26°C year-round.",
    nearestCity: "Badulla",
    distanceFromColombo: "220 km",
    gallery: [heroHighlands, galTea, galBreakfast, galTemple],
    relatedTourSlugs: ["beyond-the-ordinary-sri-lanka", "tea-country-retreat", "sri-lanka-wellness-escape"],
    seo: {
      title: "Ella, Sri Lanka — Highland Sanctuary · Vaya Ceylon",
      description: "Discover Ella's misty highlands, the Nine Arch Bridge, tea estates and Sri Lanka's most scenic rail journey.",
    },
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    tagline: "The Lion Rock — 2,000 years of civilisation in stone",
    region: "Cultural Triangle",
    category: "Heritage",
    categories: ["Heritage", "Culture", "Wildlife"],
    heroImage: destSigiriya,
    coverImage: destSigiriya,
    description: "Sigiriya is one of humanity's most astonishing achievements — a 5th-century fortress-palace built atop a 200-metre volcanic rock, surrounded by ancient gardens and moats.",
    longDescription: "A UNESCO World Heritage Site and Sri Lanka's most iconic landmark, Sigiriya (Lion Rock) rises 200 metres from the central plains. King Kasyapa built his royal citadel here in 477 AD — complete with water gardens, frescoes of celestial maidens, and a mirrored wall that served as the world's earliest billboard. Climb before dawn to watch the sunrise transform the surrounding jungle in silence, before the day-trippers arrive.",
    highlights: [
      "Dawn ascent of Lion Rock",
      "Ancient water gardens",
      "Gallery of Sigiriya Maidens frescoes",
      "Mirror Wall inscriptions",
      "Dambulla Cave Temples (nearby)",
      "Pidurangala Rock for best Lion Rock view",
    ],
    activities: [
      "Rock climbing",
      "Archaeological exploration",
      "Bird watching",
      "Village cycling",
      "Sunset at Pidurangala",
    ],
    bestTime: "January to April and July to September.",
    elevation: "349 m (rock summit from sea level)",
    climate: "Tropical. 25–35°C. Best visited early morning.",
    nearestCity: "Dambulla",
    distanceFromColombo: "170 km",
    gallery: [destSigiriya, galTemple, heroHighlands, galBreakfast],
    relatedTourSlugs: ["beyond-the-ordinary-sri-lanka", "cultural-triangle-experience", "family-adventure-sri-lanka"],
    seo: {
      title: "Sigiriya, Sri Lanka — Lion Rock Fortress · Vaya Ceylon",
      description: "Explore Sigiriya's UNESCO-listed Lion Rock fortress, ancient water gardens and cave frescoes.",
    },
  },
  {
    slug: "kandy",
    name: "Kandy",
    tagline: "The sacred city — heart of Sinhalese culture",
    region: "Central Province",
    category: "Culture",
    categories: ["Culture", "Heritage", "Wellness"],
    heroImage: galTemple,
    coverImage: galTemple,
    description: "Kandy is Sri Lanka's second city and cultural capital — home to the Temple of the Tooth Relic, a magnificent lake, and centuries of living Buddhist tradition.",
    longDescription: "Sitting in a natural bowl of forested hills, Kandy was the last independent kingdom of Sri Lanka, falling to the British only in 1815. The Temple of the Tooth Relic (Sri Dalada Maligawa) houses what devotees believe to be the Buddha's sacred tooth — drawing pilgrims from across Asia. Evening puja ceremonies, accompanied by drumming and the sweet smoke of incense, are among the island's most profoundly atmospheric experiences. The Royal Botanic Gardens at Peradeniya, a short drive away, contain one of Asia's finest plant collections.",
    highlights: [
      "Evening puja at Temple of the Tooth",
      "Peradeniya Royal Botanic Gardens",
      "Kandyan cultural dance performances",
      "Udawattakele Forest Sanctuary",
      "Kandy Lake at dawn",
      "Gem Museum and markets",
    ],
    activities: [
      "Temple visits and prayer ceremonies",
      "Traditional dance performances",
      "Botanic garden walks",
      "Ayurveda treatments",
      "Tea tasting",
      "Cooking classes",
    ],
    bestTime: "January to April. The Esala Perahera festival (July/August) is unmissable.",
    climate: "Tropical highland. 20–30°C year-round. Some rain throughout.",
    nearestCity: "Kandy (city itself)",
    distanceFromColombo: "115 km",
    gallery: [galTemple, heroHighlands, galBreakfast, destSigiriya],
    relatedTourSlugs: ["beyond-the-ordinary-sri-lanka", "cultural-triangle-experience", "luxury-honeymoon-journey", "sri-lanka-wellness-escape"],
    seo: {
      title: "Kandy, Sri Lanka — Sacred Cultural Capital · Vaya Ceylon",
      description: "Discover Kandy's Temple of the Tooth, Kandyan dance, botanical gardens and living Buddhist culture.",
    },
  },
  {
    slug: "yala",
    name: "Yala",
    tagline: "Sri Lanka's greatest wildlife sanctuary",
    region: "Southern Province",
    category: "Wildlife",
    categories: ["Wildlife", "Mountains"],
    heroImage: pkgYala,
    coverImage: actSafari,
    description: "Yala National Park is one of the world's best places to see leopards — and one of Asia's great wildlife experiences. Private jeep safaris reveal a landscape of lagoons, forest, and ancient ruins.",
    longDescription: "Yala's Block I covers 141 square kilometres of diverse ecosystems — from scrub jungle to coastal lagoons and rocky outcroppings. It has the world's highest density of leopards per square kilometre. But leopards share this landscape with elephants, sloth bears, water buffalo, crocodiles, spotted deer and over 215 species of birds. Sunrises here are extraordinary — the light turning the lagoons copper, with silhouettes of elephants crossing the shallows. Our specialist naturalists know the park's rhythms and hidden paths, making even a single morning unforgettable.",
    highlights: [
      "Highest leopard density in the world",
      "Elephant herds at dawn",
      "Sloth bear sightings",
      "Crocodile-filled lagoons",
      "Ancient Buddhist ruins within the park",
      "Coastal scenery and beach access",
    ],
    activities: [
      "Private jeep safaris",
      "Bird watching",
      "Nature photography",
      "Coastal walks",
      "Sunset lagoon drives",
    ],
    bestTime: "February to July (best dry season). Park closed September to mid-October.",
    climate: "Hot and dry. 28–38°C. Best safaris at dawn and dusk.",
    nearestCity: "Tissamaharama",
    distanceFromColombo: "305 km",
    gallery: [pkgYala, actSafari, galYacht, heroHighlands],
    relatedTourSlugs: ["beyond-the-ordinary-sri-lanka", "ultimate-wildlife-adventure", "family-adventure-sri-lanka"],
    seo: {
      title: "Yala National Park, Sri Lanka — Leopard Safaris · Vaya Ceylon",
      description: "Private leopard safaris in Yala — Sri Lanka's premier wildlife sanctuary with the world's highest leopard density.",
    },
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    tagline: "Blue whales, sea turtles and languid beach days",
    region: "Southern Coast",
    category: "Beaches",
    categories: ["Beaches", "Wildlife"],
    heroImage: galYacht,
    coverImage: pkgCoast,
    description: "Mirissa is a crescent bay of golden sand where you can wake at 4am to join a whale-watching boat, and be back on a sun lounger by 10. The world's largest animal passes through these waters.",
    longDescription: "From November to April, the waters off Mirissa become a stage for the greatest wildlife spectacle on earth: blue whales, the world's largest animals, travelling through the Indian Ocean. Our private charter boats keep a respectful distance while still making these encounters profoundly intimate. The bay itself is a paradise — swaying palms, warm turquoise water, and the southern coast's characteristic blend of Dutch-era heritage and tropical languor. Mirissa pairs perfectly with Galle, Tangalle or Weligama.",
    highlights: [
      "Blue whale watching from November to April",
      "Spinner dolphin pods",
      "Crescent bay swimming",
      "Coconut tree hill at sunset",
      "Sea turtle conservation",
      "Fishing village culture",
    ],
    activities: [
      "Whale watching charters",
      "Snorkelling",
      "Stand-up paddleboarding",
      "Beach yoga",
      "Coastal cycling",
      "Seafood dining",
    ],
    bestTime: "November to April for whale watching. May to October is quieter and cheaper.",
    climate: "Tropical coastal. 27–32°C. Warm waters year-round.",
    nearestCity: "Matara",
    distanceFromColombo: "150 km",
    gallery: [galYacht, pkgCoast, galBreakfast, actSafari],
    relatedTourSlugs: ["ultimate-wildlife-adventure", "southern-coast-discovery"],
    seo: {
      title: "Mirissa, Sri Lanka — Blue Whale Watching & Beaches · Vaya Ceylon",
      description: "Experience blue whale watching, spinner dolphins and golden beaches in Mirissa on Sri Lanka's southern coast.",
    },
  },
  {
    slug: "galle",
    name: "Galle",
    tagline: "A living UNESCO heritage city at the edge of the sea",
    region: "Southern Province",
    category: "Heritage",
    categories: ["Heritage", "Culture", "Beaches"],
    heroImage: destGalle,
    coverImage: destGalle,
    description: "Galle Fort is a Dutch colonial masterpiece — 36 hectares of 17th-century ramparts, cobblestoned streets, independent boutiques and award-winning restaurants, all within the sound of the Indian Ocean.",
    longDescription: "Built by the Portuguese in 1588 and fortified by the Dutch in 1663, Galle Fort survived the 2004 tsunami and remains one of the best-preserved colonial sea fortresses in Asia. Within its thick walls, you'll find a thriving creative community: jewelry designers, print makers, textile artists, and some of Sri Lanka's finest restaurants and guesthouses. Walking the ramparts at sunset, with the Southern Ocean spreading endlessly to the horizon, is among the island's most enduring images.",
    highlights: [
      "Sunset on the Dutch ramparts",
      "Cobblestoned Leyn Baan Street",
      "Galle Lighthouse",
      "Dutch Reformed Church (1755)",
      "National Maritime Museum",
      "Independent design boutiques",
      "Award-winning restaurants within the fort",
    ],
    activities: [
      "Guided heritage walks",
      "Boutique shopping",
      "Photography",
      "Fine dining",
      "Surf lessons at Jungle Beach",
      "Whale watching day trips",
    ],
    bestTime: "December to April (peak season). June to August (lighter crowds and lower rates).",
    climate: "Coastal tropical. 26–32°C. Occasional rains in May/June.",
    nearestCity: "Galle (city itself)",
    distanceFromColombo: "119 km",
    gallery: [destGalle, pkgCoast, galYacht, galBreakfast],
    relatedTourSlugs: ["beyond-the-ordinary-sri-lanka", "southern-coast-discovery", "luxury-honeymoon-journey"],
    seo: {
      title: "Galle Fort, Sri Lanka — Colonial Heritage by the Sea · Vaya Ceylon",
      description: "Explore Galle Fort's Dutch colonial ramparts, heritage architecture, boutiques and restaurants on Sri Lanka's southern coast.",
    },
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    tagline: "Sri Lanka's Little England — mist, roses and high-altitude tea",
    region: "Hill Country",
    category: "Mountains",
    categories: ["Mountains", "Wellness", "Heritage"],
    heroImage: heroHighlands,
    coverImage: hotelBungalow,
    description: "At 1,868 metres, Nuwara Eliya is the highest city in Sri Lanka — a Victorian-era hill station of Tudor-style bungalows, manicured gardens and world-famous tea estates.",
    longDescription: "The British called it 'Little England', planting roses, building mock-Tudor hotels and laying out a golf course in the thin mountain air. Today, Nuwara Eliya retains its anachronistic colonial charm while surrounding itself with the island's finest tea plantations. The air is cool year-round, the dawns are quiet, and a pot of Dimbula tea tastes different when sipped at 1,800 metres with the mist rolling off the terraces.",
    highlights: [
      "Victoria Park botanical gardens",
      "Ceylon Tea Trails planters' bungalows",
      "Single-estate tea factory tours",
      "Gregory Lake morning walks",
      "Colonial Post Office and Hill Club",
      "Horton Plains and World's End viewpoint",
    ],
    activities: [
      "Tea estate walks and tastings",
      "Trekking to Horton Plains",
      "Trout fishing",
      "Golf at the colonial course",
      "Horse riding",
      "Photography",
    ],
    bestTime: "January to April. April brings the warmest and sunniest days.",
    elevation: "1,868 m",
    climate: "Cool montane. 10–22°C. Cold nights. Mist is constant.",
    nearestCity: "Nuwara Eliya (city itself)",
    distanceFromColombo: "180 km",
    gallery: [heroHighlands, hotelBungalow, galTea, galBreakfast],
    relatedTourSlugs: ["beyond-the-ordinary-sri-lanka", "tea-country-retreat", "luxury-honeymoon-journey", "sri-lanka-wellness-escape"],
    seo: {
      title: "Nuwara Eliya, Sri Lanka — Hill Country Tea Estates · Vaya Ceylon",
      description: "Discover Nuwara Eliya's colonial hill station charm, world-famous tea estates and cool highland scenery.",
    },
  },
  {
    slug: "trincomalee",
    name: "Trincomalee",
    tagline: "The finest natural harbour in Asia — and pristine coral reefs",
    region: "Eastern Province",
    category: "Beaches",
    categories: ["Beaches", "Wildlife", "Heritage"],
    heroImage: galYacht,
    coverImage: galYacht,
    description: "Trincomalee is Sri Lanka's best-kept secret — a deep natural harbour flanked by white-sand beaches, ancient Hindu temples and some of the clearest water in the Indian Ocean.",
    longDescription: "Called 'the finest harbour in Asia' by Admiral Nelson, Trincomalee faces east into the Bay of Bengal, making it the destination of choice during Sri Lanka's western monsoon season. Pigeon Island's coral reefs are still pristine — black-tip reef sharks drift through the shallows. Nilaveli Beach stretches for kilometres without a footprint. The ancient Koneswaram Temple crowns Swami Rock, a headland where the jungle meets the sea 130 metres below.",
    highlights: [
      "Pigeon Island Marine National Park",
      "Nilaveli and Uppuveli beaches",
      "Koneswaram Kovil at Swami Rock",
      "Whale and dolphin watching",
      "Hot Springs at Kanniyai",
      "Fort Frederick (Dutch colonial)",
    ],
    activities: [
      "Snorkelling and diving",
      "Whale watching",
      "Beach swimming",
      "Temple visits",
      "Kayaking",
      "Sunset sailing",
    ],
    bestTime: "May to September (while the southwest is in monsoon, Trinco is sunny).",
    climate: "Hot and sunny in dry season. 27–35°C.",
    nearestCity: "Trincomalee (city itself)",
    distanceFromColombo: "257 km",
    gallery: [galYacht, pkgCoast, galBreakfast, actSafari],
    relatedTourSlugs: ["ultimate-wildlife-adventure"],
    seo: {
      title: "Trincomalee, Sri Lanka — Eastern Beaches & Coral Reefs · Vaya Ceylon",
      description: "Discover Trincomalee's pristine beaches, Pigeon Island coral reefs, whale watching and ancient Hindu temples.",
    },
  },
];

export const destinationCategories: (DestinationCategory | "All")[] = [
  "All",
  "Mountains",
  "Wildlife",
  "Beaches",
  "Culture",
  "Heritage",
  "Wellness",
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function filterDestinations(category: string, query = ""): Destination[] {
  const q = query.trim().toLowerCase();
  return destinations.filter((d) => {
    const catMatch = category === "All" || d.categories.includes(category as DestinationCategory);
    if (!catMatch) return false;
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  });
}
