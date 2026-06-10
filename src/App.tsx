/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useMemo } from 'react';
import { VEHICLES_DATA } from './data.ts';
import { Vehicle, VehicleQuote, VehicleCategory } from './types.ts';

// Components
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import VehicleCard from './components/VehicleCard.tsx';
import VehicleModal from './components/VehicleModal.tsx';
import ContactSection from './components/ContactSection.tsx';
import MyQuotes from './components/MyQuotes.tsx';

// Icons
import { SlidersHorizontal, Search, ArrowUpDown, RefreshCw, Car, HelpCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('catalog');
  
  // Modal controllers
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialTab, setModalInitialTab] = useState<'specs' | 'quote'>('specs');

  // Quotes state (synced with localStorage)
  const [quotes, setQuotes] = useState<VehicleQuote[]>([]);

  // Catalog Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [maxPrice, setMaxPrice] = useState<number>(1200000); // Max possible is 1,120,000
  const [sortBy, setSortBy] = useState<string>('featured');

  // Load quotes from local storage upon mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('elite-motors-quotes');
      if (stored) {
        setQuotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Falha ao ler orçamentos do localStorage:', e);
    }
  }, []);

  // Sync quotes to local storage
  const saveQuotesToLocalStorage = (updatedQuotes: VehicleQuote[]) => {
    setQuotes(updatedQuotes);
    localStorage.setItem('elite-motors-quotes', JSON.stringify(updatedQuotes));
  };

  // Add new quote
  const handleAddQuote = (newQuote: VehicleQuote) => {
    const nextQuotes = [newQuote, ...quotes];
    saveQuotesToLocalStorage(nextQuotes);
  };

  // Delete simulated quote
  const handleDeleteQuote = (id: string) => {
    const nextQuotes = quotes.filter((q) => q.id !== id);
    saveQuotesToLocalStorage(nextQuotes);
  };

  // Interactive mock credit approval action
  const handleApproveQuote = (id: string) => {
    const nextQuotes = quotes.map((q) => {
      if (q.id === id) {
        return { ...q, status: 'Aprovado' as const };
      }
      return q;
    });
    saveQuotesToLocalStorage(nextQuotes);
  };

  // Handler to view specs or launch direct quoting form from cards
  const handleViewSpecs = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalInitialTab('specs');
    setIsModalOpen(true);
  };

  const handleLaunchQuoteForm = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalInitialTab('quote');
    setIsModalOpen(true);
  };

  // Categories helper extraction
  const categories: string[] = ['Todos', 'Esportivo', 'SUV', 'Sedan', 'Elétrico'];

  // Dynamically Filter & Sort List of Vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter((car) => {
      // 1. Category check
      const matchesCategory = selectedCategory === 'Todos' || car.category === selectedCategory;
      
      // 2. Pricing threshold check
      const matchesPrice = car.price <= maxPrice;

      // 3. Normalized search string check (brand & model)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query) ||
        car.fuel.toLowerCase().includes(query);

      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      // Sort strategy dispatcher
      if (sortBy === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      if (sortBy === 'yearDesc') {
        return b.year - a.year;
      }
      // default: Featured (as described in array)
      return 0;
    });
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  // Reset all catalog filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setMaxPrice(1200000);
    setSortBy('featured');
  };

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Dynamic Scroll Anchor Helper
  const scrollToCatalog = () => {
    setActiveSection('catalog');
    setTimeout(() => {
      const el = document.getElementById('catalog-search-block');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Dynamic Navigation Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={(sec) => {
          setActiveSection(sec);
          if (sec === 'catalog') {
            setTimeout(() => {
              document.getElementById('catalog-search-block')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          } else if (sec === 'contact') {
            setTimeout(() => {
              document.getElementById('contact-element')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }}
        quotesCount={quotes.length}
      />

      {/* Primary Section Switcher */}
      <main className="flex-1">
        {activeSection === 'quotes' ? (
          /* "Meus Orçamentos" Separate state list */
          <MyQuotes
            quotes={quotes}
            onDeleteQuote={handleDeleteQuote}
            onApproveQuote={handleApproveQuote}
            onNavigateToCatalog={() => {
              setActiveSection('catalog');
              setTimeout(() => {
                document.getElementById('catalog-search-block')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          />
        ) : (
          /* Unified Homepage (Hero + Catalog Grid + Showroom Details) */
          <>
            {/* Immersive Hero */}
            <Hero onExploreCatalog={scrollToCatalog} />

            {/* Catalog Grid Section container */}
            <section id="catalog-search-block" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Grid Section Head title */}
              <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-orange-500 tracking-[0.34em]">Showroom Oficial</span>
                  <h2 className="text-3xl sm:text-6xl font-[900] text-white tracking-[calc(-0.04em)] uppercase mt-2">Nossas Unidades</h2>
                  <p className="text-xs text-neutral-400 mt-2 max-w-2xl font-light">
                    Explore nossa exclusiva seleção física. Cada esportivo e SUV de luxo é submetido a dezenas de testes de engenharia preventiva.
                  </p>
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  ESTOQUE <strong className="text-white text-sm font-black italic">{filteredVehicles.length}</strong> / {VEHICLES_DATA.length} DISPONÍVEIS
                </div>
              </div>

              {/* Advanced Filtering controls block - geometric and high contrast */}
              <div className="bg-[#0c0c0c] border border-white/10 p-6 md:p-8 rounded-none mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                
                {/* Search query input */}
                <div className="col-span-1 md:col-span-4 relative">
                  <label htmlFor="searchFilter" className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">BUSCA DIRETA</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      type="text"
                      id="searchFilter"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Audi, Porsche, M3, E-tron..."
                      className="w-full text-xs pl-11 pr-4 py-3.5 bg-black border border-white/15 focus:border-white focus:ring-1 focus:ring-white rounded-none outline-none transition-all placeholder:text-neutral-600 text-white font-medium"
                    />
                  </div>
                </div>

                {/* Categories filtering selection */}
                <div className="col-span-1 md:col-span-3">
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5 font-sans">SEGMENTO</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full text-xs font-bold px-3.5 py-3.5 bg-black border border-white/15 text-white focus:border-white focus:ring-0 rounded-none cursor-pointer appearance-none uppercase tracking-wider"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-black text-white py-2">
                          {cat === 'Todos' ? 'TODOS OS SEGMENTOS' : cat.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-4.5 pointer-events-none w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white/60"></div>
                  </div>
                </div>

                {/* Maximum Price sliding boundary picker */}
                <div className="col-span-1 md:col-span-3">
                  <div className="flex justify-between items-baseline mb-2.5">
                    <label htmlFor="maxPriceSlider" className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">TETO DE VALOR</label>
                    <span className="text-xs font-extrabold text-white font-mono">{formatBRL(maxPrice)}</span>
                  </div>
                  <div className="px-3 py-4 bg-black border border-white/15 rounded-none flex items-center">
                    <input
                      type="range"
                      id="maxPriceSlider"
                      min={500000}
                      max={1200000}
                      step={50000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white"
                    />
                  </div>
                </div>

                {/* Sorting strategies selector */}
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="sortFilter" className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">ORDENAÇÃO</label>
                  <div className="relative">
                    <select
                      id="sortFilter"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full text-xs font-bold px-3.5 py-3.5 bg-black border border-white/15 text-white focus:border-white rounded-none outline-none cursor-pointer appearance-none uppercase tracking-wider"
                    >
                      <option value="featured" className="bg-[#050505]">DESTAQUES</option>
                      <option value="priceAsc" className="bg-[#050505]">MENOR PREÇO</option>
                      <option value="priceDesc" className="bg-[#050505]">MAIOR PREÇO</option>
                      <option value="yearDesc" className="bg-[#050505]">RECENTES</option>
                    </select>
                    <div className="absolute right-4 top-4.5 pointer-events-none w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white/60"></div>
                  </div>
                </div>

              </div>

              {/* Secondary Filter Badge Bar if filters are active */}
              {(searchQuery || selectedCategory !== 'Todos' || maxPrice < 1200000 || sortBy !== 'featured') && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 px-4 py-3 bg-[#0c0c0c] border border-white/10 rounded-none text-xs gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-neutral-400">
                    <span className="font-bold text-white uppercase tracking-wider text-[10px]">Filtros Ativos:</span>
                    {searchQuery && <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-none text-[10px] font-bold text-white">" {searchQuery} "</span>}
                    {selectedCategory !== 'Todos' && <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-none text-[10px] font-bold text-white">{selectedCategory.toUpperCase()}</span>}
                    {maxPrice < 1200000 && <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-none text-[10px] font-bold text-white">ATÉ {formatBRL(maxPrice)}</span>}
                    {sortBy !== 'featured' && <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-none text-[10px] font-bold text-white">{sortBy.toUpperCase()}</span>}
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center space-x-1.5 text-orange-500 hover:text-orange-400 font-extrabold uppercase tracking-widest text-[10px] cursor-pointer transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Redefinir Filtros</span>
                  </button>
                </div>
              )}

              {/* Rendered Catalog Results or Empty fallback */}
              {filteredVehicles.length === 0 ? (
                <div className="text-center py-20 bg-[#0c0c0c] border border-white/10 rounded-none max-w-md mx-auto">
                  <Car className="h-10 w-10 text-neutral-500 mx-auto mb-4" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">Nenhum Veículo Encontrado</h3>
                  <p className="text-xs text-neutral-400 mt-2 mb-6 max-w-xs mx-auto leading-relaxed">
                    Nenhum automóvel atende aos critérios exatos. Tente filtrar por valores maiores ou redefinir a busca.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="py-3 px-6 bg-white text-black hover:bg-orange-500 hover:text-white font-bold text-xs rounded-none cursor-pointer uppercase tracking-widest"
                  >
                    Resetar Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredVehicles.map((car) => (
                    <VehicleCard
                      key={car.id}
                      vehicle={car}
                      onSelectVehicle={handleViewSpecs}
                      onRequestQuote={handleLaunchQuoteForm}
                    />
                  ))}
                </div>
              )}

            </section>

            {/* Custom static Contact Section showroom layout */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Master Detail Overlay Modal */}
      <VehicleModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVehicle(null);
        }}
        onSubmitQuote={handleAddQuote}
        initialTab={modalInitialTab}
      />

      {/* Styled Footer */}
      <footer id="app-footer" className="bg-[#030303] text-neutral-500 text-[11px] py-16 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <span className="text-white font-[900] tracking-widest uppercase text-sm">ELITE MOTORS</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="font-mono text-neutral-600">CNPJ: 45.242.000/0001-99</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-neutral-500 md:text-right">
            <span>© 2026 Concessionária Elite. Todos os direitos reservados.</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-mono text-xs"><ShieldCheck className="h-4 w-4 text-orange-500" /> SECURE SSL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
