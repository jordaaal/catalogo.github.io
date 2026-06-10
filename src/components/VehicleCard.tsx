/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Vehicle } from '../types.ts';
import { Gauge, Zap, Sparkles, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface VehicleCardProps {
  key?: React.Key;
  vehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onRequestQuote: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onSelectVehicle, onRequestQuote }: VehicleCardProps) {
  // Format price into BRL format (R$ XX.XXX,XX)
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Determine category color classes - stark and sharp
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Esportivo':
        return 'bg-red-950/40 text-red-400 border-red-500/20';
      case 'Elétrico':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20';
      case 'SUV':
        return 'bg-blue-950/40 text-blue-400 border-blue-500/20';
      case 'Sedan':
        return 'bg-neutral-900 text-neutral-300 border-neutral-700/20';
      default:
        return 'bg-orange-950/40 text-orange-400 border-orange-500/20';
    }
  };

  return (
    <div
      id={`vehicle-card-${vehicle.id}`}
      className="bg-[#0c0c0c] rounded-none border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300 group flex flex-col justify-between h-full"
    >
      {/* Card Header Media */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-900 rounded-none">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-none border ${getCategoryTheme(vehicle.category)}`}>
            {vehicle.category}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="bg-black text-[#f3f3f3] text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-none border border-white/10">
            {vehicle.year}
          </span>
        </div>

        {/* Mileage Status Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-none text-[9px] font-mono tracking-wider text-white border border-white/10">
          {vehicle.mileage === 0 ? (
            <span className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span>0 KM - NOVO</span>
            </span>
          ) : (
            <span>{vehicle.mileage.toLocaleString('pt-BR')} KM - SEMINOVO</span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">{vehicle.brand}</span>
            <h3 className="text-xl font-[900] text-white tracking-tight leading-tight group-hover:text-orange-500 transition-colors uppercase mt-1">
              {vehicle.model}
            </h3>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 my-4 text-[11px] text-neutral-400 font-mono">
            <div className="flex items-center space-x-2">
              <Zap className="h-3.5 w-3.5 text-neutral-500 flex-shrink-0" />
              <span className="truncate">{vehicle.power}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gauge className="h-3.5 w-3.5 text-neutral-500 flex-shrink-0" />
              <span className="truncate">{vehicle.acceleration} (0-100)</span>
            </div>
            <div className="col-span-2 text-[10px] text-neutral-500 uppercase tracking-wider font-sans mt-1">
              <span>{vehicle.engine} • {vehicle.fuel}</span>
            </div>
          </div>
        </div>

        <div>
          {/* Price & Primary Action */}
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <span className="block text-[9px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Preço à vista</span>
              <span className="text-2xl font-[900] text-white tracking-tight font-sans">
                {formatBRL(vehicle.price)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSelectVehicle(vehicle)}
              className="py-3 px-3 text-[10px] font-bold text-neutral-300 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-none cursor-pointer tracking-widest uppercase transition-colors text-center"
            >
              Ficha Técnica
            </button>

            <button
              onClick={() => onRequestQuote(vehicle)}
              className="py-3 px-3 text-[10px] font-black text-black bg-white hover:bg-orange-500 hover:text-white border border-transparent rounded-none cursor-pointer tracking-widest uppercase transition-colors flex items-center justify-center space-x-1.5"
            >
              <ClipboardCheck className="h-3.5 w-3.5" />
              <span>Orçamento</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
