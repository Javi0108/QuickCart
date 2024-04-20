import { Shop } from './shop.interface';
import { User } from './user.interface';

export interface Profile {
  id_profile: number;
  user: User;
  user_name: string;
  user_type: string;
  phone: string;
  mobile: string;
  address: string;
  socials: {
    webpage: string;
    instagram: string;
    facebook: string;
    x: string;
    linkedin: string;
  }
}

export interface ProfileSeller {
  id_profile: number;
  user: User;
  user_name: string;
  user_type: string;
  phone: string;
  mobile: string;
  address: string;
  socials: ("Instagram" | "Facebook" | "X" | "LinkedIn")[]; // Limitado a Instagram, Facebook y X
  sales: number;
  shop: Shop[];
}

export interface ProfileClient {
  id_profile: number;
  user: User;
  user_name: string;
  user_type: string;
  phone: string;
  mobile: string;
  address: string;
}