/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Car, FileText, Phone, ListFilter } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  quotesCount: number;
}

export default function Header({ activeSection, setActiveSection, quotesCount }: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-50 bg-[#050505] border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => setActiveSection('catalog')}
            className="flex items-baseline space-x-2 group text-left cursor-pointer"
          >
            <span className="text-2xl font-[900] tracking-tighter text-white">ELITE</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-light text-white/50">Motors</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-4 text-[11px] uppercase tracking-widest font-bold">
            <button
              onClick={() => setActiveSection('catalog')}
              className={`px-4 py-2 border-b-2 cursor-pointer transition-all duration-200 ${
                activeSection === 'catalog'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <ListFilter className="h-3.5 w-3.5" />
                <span>Estoque</span>
              </span>
            </button>

            <button
              onClick={() => setActiveSection('contact')}
              className={`px-4 py-2 border-b-2 cursor-pointer transition-all duration-200 ${
                activeSection === 'contact'
                  ? 'border-transparent text-white/40 hover:text-white'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>Contato</span>
              </span>
            </button>

            <button
              onClick={() => setActiveSection('quotes')}
              className={`relative px-4 py-2 border-b-2 cursor-pointer transition-all duration-200 ${
                activeSection === 'quotes'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>Simulações</span>
              </span>
              {quotesCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-orange-500 text-white text-[9px] font-[900] w-4.5 h-4.5 flex items-center justify-center rounded-none animate-pulse">
                  {quotesCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
