/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Percent, Truck, ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
}

export default function Hero({ onExploreCatalog }: HeroProps) {
  return (
    <div id="hero-section" className="relative bg-[#050505] text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with High Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Dealership Hero"
          className="w-full h-full object-cover object-center opacity-30 transform scale-102 transition-transform duration-10000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/40"></div>
      </div>

      {/* Extreme Watermark Typo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] md:text-[24rem] font-[900] text-white/[0.02] leading-none pointer-events-none select-none tracking-tighter font-sans">
        ELITE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-between h-full w-full">
        <div className="max-w-4xl">
          {/* Animated Accent */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-none mb-8"
          >
            <span className="w-2 h-2 rounded-none bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono text-orange-500">
              Estoque Selecionado • Atualizado Hoje
            </span>
          </motion.div>

          {/* Majestic Title - Bold Typography flagship instruction */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[105px] font-[900] leading-[0.85] tracking-[calc(-0.04em)] uppercase text-white font-sans"
          >
            ALTA<br />PERFORMANCE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xs uppercase tracking-[0.4em] font-light text-white/50 mt-4 mb-8"
          >
            A definição de luxo, engenharia alemã e tração integral
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-sm text-neutral-400 mb-10 leading-relaxed font-light"
          >
            Coleção exclusiva de veículos superesportivos, SUVs de altíssimo luxo e os carros elétricos mais inovadores do mercado. Encontre sua próxima conquista com atendimento totalmente personalizado e sob medida.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <button
              onClick={onExploreCatalog}
              className="px-8 py-4.5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-2.5 shadow-xl hover:scale-[1.02]"
            >
              <span>Explorar Estoque</span>
              <ArrowDown className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                const element = document.getElementById('contact-element');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4.5 bg-transparent hover:bg-white/5 text-white font-black uppercase text-[11px] tracking-[0.2em] border border-white/10 transition-all cursor-pointer"
            >
              Falar com Consultor
            </button>
          </motion.div>
        </div>

        {/* Info badges banner at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10"
        >
          {/* Badge 1 */}
          <div className="flex items-start space-x-4">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-none text-white">
              <ShieldCheck className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h4 className="font-extrabold text-white tracking-[0.1em] text-[11px] font-sans uppercase">Laudo Cautelar 100%</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Todas as nossas unidades contam com perícia aprovada e certificado de procedência rigoroso.
              </p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-start space-x-4">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-none text-white">
              <Percent className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h4 className="font-extrabold text-white tracking-[0.1em] text-[11px] font-sans uppercase">Taxas Exclusivas</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Parcerias diretas com os maiores bancos para oferecer condições de financiamento diferenciadas.
              </p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-start space-x-4">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-none text-white">
              <Truck className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h4 className="font-extrabold text-white tracking-[0.1em] text-[11px] font-sans uppercase">Entrega em Todo País</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Transportamos seu veículo novo em caminhão fechado segurado diretamente para a sua residência.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
