/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle } from './types.ts';

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'porsche-911',
    brand: 'Porsche',
    model: '911 Carrera S',
    year: 2024,
    price: 945000,
    category: 'Esportivo',
    engine: '3.0L Boxer Bi-turbo 6 cil.',
    power: '450 cv',
    transmission: 'PDK 8 marchas',
    fuel: 'Gasolina',
    acceleration: '3.7s',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Vermelho Guarda', hex: '#DC2626' },
      { name: 'Cinza Giz', hex: '#D1D5DB' },
      { name: 'Azul Gentian', hex: '#1E3A8A' },
      { name: 'Preto Metálico', hex: '#111827' }
    ],
    description: 'O Porsche 911 Carrera S personifica o DNA purista da marca. Com o icônico motor boxer de 6 cilindros traseiro bi-turbo, ele entrega respostas imediatas de direção, estabilidade impressionante e acabamento interno de altíssimo luxo com painel digital configurável e acabamento em couro nobre.',
    features: [
      'Escapamento Esportivo Ativo',
      'Faróis de LED Matrix PDLS+',
      'Teto Solar em Vidro',
      'Sistema de Som Bose Surround',
      'Eixo Traseiro Direcional',
      'Suspensão Ativa PASM'
    ],
    mileage: 0
  },
  {
    id: 'audi-etron-gt',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 1120000,
    category: 'Elétrico',
    engine: 'Dois Motores Elétricos síncronos',
    power: '646 cv',
    transmission: 'Automática (2 marchas atrás)',
    fuel: 'Elétrico',
    acceleration: '3.3s',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cinza Kemora', hex: '#4B5563' },
      { name: 'Preto Mito', hex: '#000000' },
      { name: 'Azul Ascari', hex: '#1E40AF' },
      { name: 'Branco Ibis', hex: '#F9FAFB' }
    ],
    description: 'O Audi RS e-tron GT é a obra-prima elétrica da engenharia alemã. Com tração quattro elétrica integral permanente, entrega torque instantâneo brutal combinado com dinâmica aerodinâmica inteligente. Sua bateria de 800 volts permite recargas rápidas de 5% a 80% em menos de 23 minutos.',
    features: [
      'Faróis HD Matrix LED com Laser',
      'Som Bang & Olufsen 3D 710W',
      'Bancos Esportivos Pro com Massagem',
      'Teto de Carbono Premium',
      'Head-up Display colorido',
      'Eixo Traseiro Direcionável'
    ],
    mileage: 0
  },
  {
    id: 'bmw-x5-hybrid',
    brand: 'BMW',
    model: 'X5 xDrive50e M Sport',
    year: 2024,
    price: 729950,
    category: 'SUV',
    engine: '3.0L Turbo 6 cil + Motor Elétrico',
    power: '489 cv',
    transmission: 'StepTronic 8 marchas',
    fuel: 'Híbrido plug-in',
    acceleration: '4.8s',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cinza Brooklyn', hex: '#9CA3AF' },
      { name: 'Preto Safira', hex: '#0F172A' },
      { name: 'Azul Phytonic', hex: '#1d4ed8' },
      { name: 'Branco Mineral', hex: '#FFFFFF' }
    ],
    description: 'Conforto majestoso aliado à sustentabilidade de ponta. O BMW X5 híbrido plug-in oferece até 110 km de autonomia puramente elétrica e potência de sobra com um motor 6 cilindros clássico da grife alemã. Equipado com a nova tela curva BMW Curved Display.',
    features: [
      'Teto Solar Panorâmico Sky Lounge',
      'Suspensão Pneumática Adaptativa de 2 Eixos',
      'Driving Assistant Professional',
      'Ar-condicionado de 4 Zonas',
      'Portas com Fechamento Suave (Soft Close)',
      'Rodas M Sport Aro 22"'
    ],
    mileage: 1200
  },
  {
    id: 'ford-mustang',
    brand: 'Ford',
    model: 'Mustang Mach 1',
    year: 2023,
    price: 585000,
    category: 'Esportivo',
    engine: '5.0L Coyote V8 naturalmente aspirado',
    power: '483 cv',
    transmission: 'Automática de 10 marchas',
    fuel: 'Gasolina',
    acceleration: '4.3s',
    image: 'https://images.unsplash.com/photo-1612462276532-6a68285514b8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cinza Fighter Jet', hex: '#6B7280' },
      { name: 'Verde Grabber', hex: '#16A34A' },
      { name: 'Laranja Cyber', hex: '#F97316' },
      { name: 'Preto Shadow', hex: '#171717' }
    ],
    description: 'Uma lenda automotiva que dispensa apresentações. O Mustang Mach 1 é focado em alta performance de pista para as ruas. Equipa coletores do Shelby GT350, radiador de transmissão aprimorado e o consagrado rugido do motor V8 aspirado raiz acompanhado de escapamento ativo quad-tip.',
    features: [
      'Amortecedores Selenoides MagneRide',
      'Assentos com Climatização e Aquecimento',
      'Escapamento de Performance Ativado',
      'Painel de Instrumentos Digital de 12"',
      'Monitor de Pressão dos Pneus Individual',
      'Frenagem de Emergência com Detecção'
    ],
    mileage: 4500
  },
  {
    id: 'mercedes-c63',
    brand: 'Mercedes-Benz',
    model: 'AMG C63 S E-Performance',
    year: 2024,
    price: 899000,
    category: 'Sedan',
    engine: '2.0L Turbo 4 cil. + Motor Elétrico Traseiro',
    power: '680 cv',
    transmission: 'AMG SpeedShift MCT 9G',
    fuel: 'Híbrido plug-in',
    acceleration: '3.4s',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Prata High-Tech', hex: '#94A3B8' },
      { name: 'Preto Obsidian', hex: '#1E293B' },
      { name: 'Cinza Selenita Magno', hex: '#475569' },
      { name: 'Azul Espectral', hex: '#2563EB' }
    ],
    description: 'Inspirado diretamente na Fórmula 1, este é o sedan médio mais rápido do mundo. Ele traz o motor 2.0 turbo de quatro cilindros mais potente já fabricado acoplado a um motor elétrico de alta voltagem, gerando assombrosos 680 cv de potência combinada e torque constante de locomotiva de 104 kgfm.',
    features: [
      'Tração Integral AMG Performance 4MATIC+',
      'Direção Ativa no Eixo Traseiro',
      'Bancos Performance AMG em Couro Nappa',
      'Pintura Acetinada Exclusiva de Fábrica',
      'Head-up display de Realidade Aumentada',
      'Sistema de Som Burmester Surround 3D'
    ],
    mileage: 0
  },
  {
    id: 'porsche-cayenne',
    brand: 'Porsche',
    model: 'Cayenne Coupé E-Hybrid',
    year: 2024,
    price: 745000,
    category: 'SUV',
    engine: '3.0L V6 Turbo + Motor Elétrico',
    power: '470 cv',
    transmission: 'Tiptronic S de 8 marchas',
    fuel: 'Híbrido plug-in',
    acceleration: '4.9s',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', // Alternate Cayenne styling
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cinza Quartzite', hex: '#4B5563' },
      { name: 'Preto Chromite', hex: '#111827' },
      { name: 'Branco Carrara', hex: '#F9FAFB' },
      { name: 'Azul Algarve', hex: '#1E3A8A' }
    ],
    description: 'A esportividade de Stuttgart moldada em proporções utilitárias incomparáveis. O Cayenne Coupé E-Hybrid reúne excelente habitabilidade interna, posição de dirigir altamente esportiva e o caimento coupé icônico que garante uma aerodinâmica única no segmento de SUVs familiares rápidos.',
    features: [
      'Suspensão Pneumática Adaptativa PASM',
      'Faróis HD Matrix LED',
      'Rodas RS Spyder Design Aro 21',
      'Pacote Sport Chrono Integrado',
      'Bancos Traseiros Conforto Individuais',
      'Portas com Fechamento Suave'
    ],
    mileage: 0
  }
];

export const GENERAL_CONTACT_INFO = {
  address: 'Av. das Nações Unidas, 14205 - Vila Gertrudes, São Paulo - SP, 04794-000',
  phone: '(11) 4004-9800',
  whatsapp: '+5511999998888',
  email: 'contato@concessionariaelite.com.br',
  hours: [
    { days: 'Segunda a Sexta', hours: '08:00 - 19:00' },
    { days: 'Sábado', hours: '09:00 - 17:00' },
    { days: 'Domingos e Feriados', hours: '10:00 - 14:00' }
  ]
};
