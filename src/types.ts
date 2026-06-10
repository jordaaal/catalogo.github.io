/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleCategory = 'Esportivo' | 'SUV' | 'Sedan' | 'Elétrico';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // In BRL (R$)
  category: VehicleCategory;
  engine: string;
  power: string; // e.g. "450 cv"
  transmission: string;
  fuel: string;
  acceleration: string; // e.g. "3.8s"
  image: string; // Main high quality Unsplash url
  gallery: string[];
  colors: { name: string; hex: string }[];
  description: string;
  features: string[];
  mileage: number; // km
}

export type ContactMethod = 'email' | 'whatsapp' | 'phone';

export interface VehicleQuote {
  id: string;
  vehicleId: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleImage: string;
  vehiclePrice: number;
  fullName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  downPayment: number;
  installments: number; // e.g. 1 (A vista), 24, 36, 48, 60
  message?: string;
  createdAt: string;
  status: 'Pendente' | 'Em Análise' | 'Aprovado';
}
