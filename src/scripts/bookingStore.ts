// Client-side Booking and Atmosphere State Manager for Casa Botánica

export interface RoomInfo {
  id: string;
  name: string;
  subtitle: string;
  priceCLP: number;
  capacity: string;
  bed: string;
  size: string;
  view: string;
  image: string;
  tag: string;
  description: string;
  amenities: string[];
}

export interface ExperienceItem {
  id: string;
  name: string;
  category: 'bienestar' | 'gastronomia' | 'tours' | 'romance';
  duration: string;
  priceCLP: number;
  image: string;
  tag: string;
  description: string;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: string;
  adults: number;
  children: number;
  roomId: string;
  roomName: string;
  roomPriceCLP: number;
  selectedExperiences: string[]; // ids
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    idNumber: string;
    specialRequests: string;
    pillowPreference: string;
    aromaPreference: string;
    welcomeDrink: string;
  };
  paymentMethod: 'card' | 'apple-pay' | 'google-pay' | 'transfer';
  currency: 'CLP' | 'USD' | 'EUR';
  atmosphere: 'morning' | 'sunset' | 'night';
  soundtrack: 'off' | 'breeze' | 'rain' | 'fireplace';
  soundVolume: number;
}

export const ROOMS_CATALOG: RoomInfo[] = [
  {
    id: 'suite-botanica',
    name: 'Suite Botánica',
    subtitle: 'Nuestra obra maestra con terraza privada y vista al dosel verde',
    priceCLP: 145000,
    capacity: '2 huéspedes',
    bed: '1 Cama King California',
    size: '38 m²',
    view: 'Vista al dosel botánico y la ciudad',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=88',
    tag: 'La más elegida',
    description: 'Nuestra suite insignia combina arquitectura orgánica, sábanas de algodón egipcio de 800 hilos, tina exenta de piedra volcánica y terraza privada rodeada de vegetación nativa.',
    amenities: ['Tina de piedra volcánica', 'Balcón privado', 'Sábanas 800 hilos', 'Cafetera espresso de especialidad', 'Carta de almohadas y aromaterapia', 'Minibar orgánico de cortesía']
  },
  {
    id: 'deluxe-jardin',
    name: 'Habitación Deluxe Jardín',
    subtitle: 'Luz natural, patio privado y silencio absoluto',
    priceCLP: 115000,
    capacity: '2 huéspedes',
    bed: '1 Cama Queen Plush',
    size: '30 m²',
    view: 'Vista al jardín interior de orquídeas',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=88',
    tag: 'Refugio Verde',
    description: 'Un santuario de calma con ventanales de piso a techo que se abren a un patio privado de orquídeas y helechos. Ideal para lectura, descanso profundo y desconexión.',
    amenities: ['Patio privado ajardinado', 'Ducha de lluvia termostática', 'Altavoz Marshall Bluetooth', 'Selección de infusiones botánicas', 'Colchón ergonómico de látex natural']
  },
  {
    id: 'superior-solarium',
    name: 'Habitación Superior Solarium',
    subtitle: 'Calidez matutina, maderas nobles y diseño escandinavo-mediterráneo',
    priceCLP: 95000,
    capacity: '2 huéspedes',
    bed: '1 Cama Queen',
    size: '26 m²',
    view: 'Vista a los patios coloniales',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=88',
    tag: 'Gran confort',
    description: 'Espacio cálido y luminoso con techos altos de madera a la vista, iluminación tenue regulable y texturas de lino natural que invitan al descanso reparador.',
    amenities: ['Luz natural abundante', 'Smart TV con streaming', 'Wi-Fi 6 de alta velocidad', 'Productos de baño orgánicos de lavanda', 'Zona de lectura con sillón de cuero']
  },
  {
    id: 'villa-botanica',
    name: 'Gran Villa Botánica',
    subtitle: 'Exclusividad total con alberca privada y dos dormitorios',
    priceCLP: 245000,
    capacity: '4 huéspedes',
    bed: '2 Camas King',
    size: '72 m²',
    view: 'Jardín privado y alberca',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=88',
    tag: 'Exclusividad Suprema',
    description: 'Una residencia privada de dos plantas con jardín secreto, pequeña piscina de inmersión en piedra termal, comedor privado y servicio de mayordomo dedicado.',
    amenities: ['Alberca privada de inmersión', 'Comedor y sala exterior', 'Servicio de mayordomo', 'Desayuno privado en la villa', 'Cava de vinos seleccionados']
  }
];

export const EXPERIENCES_CATALOG: ExperienceItem[] = [
  {
    id: 'exp-vinedos',
    name: 'Cata Privada & Tour de Viñedos del Valle',
    category: 'gastronomia',
    duration: '4 horas · Sommelier privado',
    priceCLP: 42000,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=85',
    tag: 'Más solicitada',
    description: 'Recorrido exclusivo por viñedos orgánicos cercanos con maridaje de quesos artesanales y 5 variedades de vinos reserva.'
  },
  {
    id: 'exp-masaje',
    name: 'Ritual Spa Botánico & Masaje a Cuatro Manos',
    category: 'bienestar',
    duration: '75 min · Aceites esenciales nativos',
    priceCLP: 55000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=85',
    tag: 'Relajación Total',
    description: 'Terapia corporal profunda con extracto de romero silvestre, piedras volcánicas calientes y aromaterapia de lavanda.'
  },
  {
    id: 'exp-desayuno',
    name: 'Desayuno Gourmet Flotante / en Cama',
    category: 'gastronomia',
    duration: 'Servicio exclusivo a la habitación',
    priceCLP: 18000,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=85',
    tag: 'Despertar Perfecto',
    description: 'Panadería artesanal horneada al minuto, frutas de temporada, café de especialidad y mimosas con jugo de naranjas frescas.'
  },
  {
    id: 'exp-romance',
    name: 'Noche Romántica con Velas & Champaña',
    category: 'romance',
    duration: 'Preparación especial en tu suite',
    priceCLP: 35000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=85',
    tag: 'Inolvidable',
    description: 'Arreglo floral botánico de autor, botella de espumante del valle helado, fresas con chocolate amargo y baño de inmersión preparado.'
  },
  {
    id: 'exp-botanica',
    name: 'Taller de Botánica & Huerto Terapéutico',
    category: 'tours',
    duration: '90 min con nuestro botánico residente',
    priceCLP: 22000,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=85',
    tag: 'Conexión Natural',
    description: 'Aprende a preparar tus propias infusiones medicinales y conoce los secretos de las plantas nativas de nuestro santuario.'
  },
  {
    id: 'exp-traslado',
    name: 'Traslado Privado VIP en Vehículo Híbrido',
    category: 'tours',
    duration: 'Aeropuerto / Centro ↔ Casa Botánica',
    priceCLP: 28000,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=85',
    tag: 'Llegada sin estrés',
    description: 'Chofer privado, toallas refrescantes con aroma a eucalipto y agua mineral de manantial a bordo.'
  }
];

const CURRENCY_RATES = {
  CLP: 1,
  USD: 0.00105, // approx 1 USD = 950 CLP
  EUR: 0.00098  // approx 1 EUR = 1020 CLP
};

const STORAGE_KEY = 'casa_botanica_state_v1';

// Default initial state
export const DEFAULT_BOOKING_STATE: BookingState = {
  checkIn: '2026-08-14',
  checkOut: '2026-08-17',
  guests: '2 adultos',
  adults: 2,
  children: 0,
  roomId: 'suite-botanica',
  roomName: 'Suite Botánica',
  roomPriceCLP: 145000,
  selectedExperiences: ['exp-vinedos', 'exp-masaje'],
  guestInfo: {
    firstName: 'Jean Pierre',
    lastName: 'Valenzuela',
    email: 'jeanpierre@mail.com',
    phone: '+56 9 1234 5678',
    country: 'Chile',
    idNumber: '18.423.910-K',
    specialRequests: 'Habitación en piso superior con vista abierta al jardín botánico y llegada tranquila.',
    pillowPreference: 'Pluma de ganso & soporte de bambú',
    aromaPreference: 'Lavanda Silvestre & Cedro Andino',
    welcomeDrink: 'Infusión botánica fría de menta y jengibre'
  },
  paymentMethod: 'card',
  currency: 'CLP',
  atmosphere: 'sunset',
  soundtrack: 'off',
  soundVolume: 0.35
};

export function getStoredState(): BookingState {
  if (typeof window === 'undefined') return DEFAULT_BOOKING_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStoredState(DEFAULT_BOOKING_STATE);
      return DEFAULT_BOOKING_STATE;
    }
    return { ...DEFAULT_BOOKING_STATE, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_BOOKING_STATE;
  }
}

export function saveStoredState(state: BookingState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('casa-botanica-state-change', { detail: state }));
  } catch (e) {
    console.error('Error saving booking state', e);
  }
}

export function updateBookingField<K extends keyof BookingState>(key: K, value: BookingState[K]): void {
  const current = getStoredState();
  current[key] = value;
  saveStoredState(current);
}

export function calculateNights(checkInStr: string, checkOutStr: string): number {
  try {
    const d1 = new Date(checkInStr);
    const d2 = new Date(checkOutStr);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(nights) || nights < 1 ? 3 : nights;
  } catch {
    return 3;
  }
}

export function formatPrice(amountCLP: number, currency: 'CLP' | 'USD' | 'EUR' = 'CLP'): string {
  if (currency === 'USD') {
    const amount = Math.round(amountCLP * CURRENCY_RATES.USD);
    return `$${amount.toLocaleString('en-US')} USD`;
  }
  if (currency === 'EUR') {
    const amount = Math.round(amountCLP * CURRENCY_RATES.EUR);
    return `€${amount.toLocaleString('de-DE')} EUR`;
  }
  return `$${amountCLP.toLocaleString('es-CL')} CLP`;
}

export function calculateBookingTotals(state: BookingState) {
  const nights = calculateNights(state.checkIn, state.checkOut);
  const room = ROOMS_CATALOG.find(r => r.id === state.roomId) || ROOMS_CATALOG[0];
  const roomSubtotalCLP = room.priceCLP * nights;

  const extrasSubtotalCLP = state.selectedExperiences.reduce((sum, expId) => {
    const exp = EXPERIENCES_CATALOG.find(e => e.id === expId);
    return sum + (exp ? exp.priceCLP : 0);
  }, 0);

  const subtotalCLP = roomSubtotalCLP + extrasSubtotalCLP;
  const taxesCLP = Math.round(subtotalCLP * 0.15); // 15% IVA y cargos de servicio
  const totalCLP = subtotalCLP + taxesCLP;

  return {
    nights,
    room,
    roomSubtotalCLP,
    extrasSubtotalCLP,
    subtotalCLP,
    taxesCLP,
    totalCLP,
    currency: state.currency
  };
}
