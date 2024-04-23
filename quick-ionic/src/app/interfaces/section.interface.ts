export interface Section {
  id: number | undefined;
  type: string;
  data: any;
}

// Interfaz para el objeto "banner_1" dentro de "hero"
export interface Banner1 {
  subtitle: string;
  title: string;
  content: string;
  price_text: string;
  price: string;
  button: string;
  image: string;
}

// Interfaz para el objeto "banner_2" dentro de "hero"
export interface Banner2 {
  subtitle: string;
  title: string;
  price: string;
  image: string;
}

// Interfaz para el objeto "banner_3" dentro de "hero"
export interface Banner3 {
  title: string;
  content: string;
  button: string;
  image: string;
}

// Interfaz para el objeto "hero" completo
export interface HeroSectionData {
  banner_1: Banner1;
  banner_2: Banner2;
  banner_3: Banner3;
}