/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleQuote, ContactMethod } from '../types.ts';
import { X, Check, Mail, Phone, Calendar, Landmark, Coins, Calculator, Send, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (quote: VehicleQuote) => void;
  initialTab?: 'specs' | 'quote';
}

export default function VehicleModal({ vehicle, isOpen, onClose, onSubmitQuote, initialTab = 'specs' }: VehicleModalProps) {
  if (!vehicle) return null;

  const [activeTab, setActiveTab] = useState<'specs' | 'quote'>(initialTab);
  const [activeImage, setActiveImage] = useState<string>(vehicle.image);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(vehicle.colors[0]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [downPayment, setDownPayment] = useState<number>(Math.round(vehicle.price * 0.3)); // 30% default down payment
  const [installments, setInstallments] = useState<number>(48); // 48 installments default
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset states when vehicle is changed
  useEffect(() => {
    setActiveImage(vehicle.image);
    setSelectedColor(vehicle.colors[0]);
    setDownPayment(Math.round(vehicle.price * 0.3));
    setIsSubmitted(false);
    setFormErrors({});
    setActiveTab(initialTab);
    // Let's reset form inputs
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setContactMethod('whatsapp');
    setInstallments(48);
  }, [vehicle, initialTab]);

  // Sync image if selected color changes (simulate premium feel)
  useEffect(() => {
    // Keep main image unless we want a neat gallery selection on specific colors,
    // let's just make the active image default when tabs or color updates.
  }, [selectedColor]);

  // Simple formatting helpers
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Financing calculation
  const getFinancingMetrics = () => {
    const financedAmount = Math.max(0, vehicle.price - downPayment);
    if (installments === 1) {
      return {
        financedAmount: 0,
        monthlyPayment: 0,
        totalWithInterest: vehicle.price,
        interestMessage: 'Sem juros'
      };
    }

    // Standard simulated finance rate: 1.15% per month (a.m.)
    const rate = 0.0115;
    // PMT formula: P * (r * (1+r)^n) / ((1+r)^n - 1)
    const monthlyPayment = financedAmount * (rate * Math.pow(1 + rate, installments)) / (Math.pow(1 + rate, installments) - 1);
    const totalWithInterest = downPayment + (monthlyPayment * installments);

    return {
      financedAmount,
      monthlyPayment: Math.round(monthlyPayment),
      totalWithInterest: Math.round(totalWithInterest),
      interestMessage: 'Taxa fixa de 1,15% a.m.'
    };
  };

  const { financedAmount, monthlyPayment, totalWithInterest, interestMessage } = getFinancingMetrics();

  // Handle forms
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errors.fullName = 'Nome completo é obrigatório (mínimo 3 caracteres)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = 'E-mail válido é obrigatório';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone.trim() || phoneDigits.length < 10) {
      errors.phone = 'Telefone/WhatsApp com DDD é obrigatório';
    }

    if (downPayment < 0) {
      errors.downPayment = 'Valor de entrada não pode ser negativo';
    } else if (downPayment > vehicle.price) {
      errors.downPayment = 'O valor de entrada não pode ser maior que o preço total';
    } else if (downPayment < vehicle.price * 0.1) {
      errors.downPayment = `Entrada mínima recomendada de 10% (${formatBRL(vehicle.price * 0.1)})`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission delivery
    const newQuote: VehicleQuote = {
      id: `quote-${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleBrand: vehicle.brand,
      vehicleModel: vehicle.model,
      vehicleImage: vehicle.image,
      vehiclePrice: vehicle.price,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone,
      contactMethod: contactMethod,
      downPayment: downPayment,
      installments: installments,
      message: message.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'Em Análise'
    };

    onSubmitQuote(newQuote);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-[#0c0c0c] w-full max-w-5xl rounded-none shadow-2xl z-10 overflow-hidden flex flex-col max-h-[100vh] sm:max-h-[90vh] md:max-h-[92vh] border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black">
              <div className="flex items-center space-x-3">
                <span className="text-orange-500 font-extrabold text-[10px] font-mono tracking-widest uppercase">{vehicle.brand}</span>
                <span className="w-1.5 h-1.5 bg-white/20"></span>
                <span className="font-black text-white text-sm uppercase tracking-tight">{vehicle.model}</span>
                <span className="bg-white/15 text-white text-[9px] font-black px-2 py-0.5 rounded-none ml-2 font-mono">
                  {vehicle.year}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 px-3 hover:bg-white/5 text-neutral-400 hover:text-white cursor-pointer transition-colors border border-white/10 rounded-none text-xs uppercase font-mono tracking-wider"
                aria-label="Fechar modal"
              >
                [ FECHAR ]
              </button>
            </div>

            {/* Content Body Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Media Gallery & Quick Specs (7 Cols) */}
              <div className="col-span-1 lg:col-span-7 p-6 lg:p-8 border-r border-white/10 bg-[#070707]">
                
                {/* Active Image Container */}
                <div className="relative aspect-16/9 rounded-none overflow-hidden bg-black border border-white/5 mb-4">
                  <img
                    src={activeImage}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-black text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-none">
                      {vehicle.category}
                    </span>
                  </div>
                </div>

                {/* Thumbnails Gallery */}
                <div className="flex items-center space-x-3 mb-6">
                  {/* Main image thumbnail */}
                  <button
                    onClick={() => setActiveImage(vehicle.image)}
                    className={`relative w-20 aspect-4/3 rounded-none overflow-hidden border cursor-pointer transition-all ${
                      activeImage === vehicle.image ? 'border-white' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={vehicle.image} alt="principal" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>

                  {/* Secondary gallery images */}
                  {vehicle.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-20 aspect-4/3 rounded-none overflow-hidden border cursor-pointer transition-all ${
                        activeImage === imgUrl ? 'border-white' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={imgUrl} alt={`gallery ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>

                {/* Tab buttons switcher */}
                <div className="flex border-b border-white/10 mb-6">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all px-1 mr-6 cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-white text-white'
                        : 'border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Especificações Técnicas
                  </button>
                  <button
                    onClick={() => setActiveTab('quote')}
                    className={`pb-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all px-1 cursor-pointer ${
                      activeTab === 'quote'
                        ? 'border-white text-white'
                        : 'border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Simulação & Orçamento
                  </button>
                </div>

                {/* Specs Tab View */}
                {activeTab === 'specs' && (
                  <div>
                    {/* Commercial Description */}
                    <p className="text-xs leading-relaxed text-neutral-400 mb-6 font-light">
                      {vehicle.description}
                    </p>

                    {/* Technical spec list */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 bg-[#0a0a0a] p-5 border border-white/10">
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest">Motorização</span>
                        <span className="text-xs font-bold text-white uppercase font-mono">{vehicle.engine}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest">Potência total</span>
                        <span className="text-xs font-bold text-white uppercase font-mono">{vehicle.power}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest">Transmissão</span>
                        <span className="text-xs font-bold text-white uppercase font-mono">{vehicle.transmission}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest">Combustível</span>
                        <span className="text-xs font-bold text-white uppercase font-mono">{vehicle.fuel}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest">Aceleração (0 a 100)</span>
                        <span className="text-xs font-bold text-white uppercase font-mono">{vehicle.acceleration}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest">Quilometragem</span>
                        <span className="text-xs font-bold text-white uppercase font-mono">
                          {vehicle.mileage === 0 ? '0 km (Novo)' : `${vehicle.mileage.toLocaleString('pt-BR')} km`}
                        </span>
                      </div>
                    </div>

                    {/* Highlighting Colors */}
                    <div className="mb-6">
                      <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest mb-3">Opções de Cor Disponíveis</span>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.colors.map((colorObj, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedColor(colorObj)}
                            className={`flex items-center space-x-2.5 p-2 rounded-none border text-xs font-medium cursor-pointer transition-all ${
                              selectedColor.name === colorObj.name
                                ? 'border-white bg-white/5 shadow-xs'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 border border-white/20 inline-shadow flex-shrink-0"
                              style={{ backgroundColor: colorObj.hex }}
                            />
                            <span className="text-[10px] text-white pr-1 uppercase tracking-wider font-mono">{colorObj.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Highlighted Equipment list */}
                    <div>
                      <span className="block text-[8px] uppercase font-bold text-neutral-500 tracking-widest mb-3">Destaques e Características</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-400">
                        {vehicle.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="p-0.5 bg-orange-500 text-black">
                              <Check className="h-3 w-3" />
                            </span>
                            <span className="uppercase tracking-wide font-mono text-[10px]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Financing Quick Info (when on quotation tab) */}
                {activeTab === 'quote' && (
                  <div>
                    <h4 className="text-xs font-black text-white hover:text-neutral-200 mb-3 flex items-center space-x-2 uppercase tracking-wider font-mono">
                      <Calculator className="h-4 w-4 text-orange-500" />
                      <span>Detalhes da sua Simulação Financeira</span>
                    </h4>
                    <p className="text-xs text-neutral-400 mb-6 leading-relaxed font-light">
                      Ajuste as opções do formulário ao lado para simular o financiamento ideal baseado em taxas atualizadas de aprovação instantânea.
                    </p>

                    <div className="space-y-3.5 p-5 bg-[#0a0a0a] border border-white/10">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-neutral-500 uppercase">Valor total:</span>
                        <span className="font-extrabold text-white">{formatBRL(vehicle.price)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-neutral-500 uppercase">Valor da entrada:</span>
                        <span className="font-bold text-white">{formatBRL(downPayment)}</span>
                      </div>

                      {installments > 1 ? (
                        <>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-neutral-500 uppercase">Saldo financiado:</span>
                            <span className="font-bold text-white">{formatBRL(financedAmount)}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-neutral-500 uppercase">Prazo:</span>
                            <span className="font-bold text-white">{installments}x mensais</span>
                          </div>
                          <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                            <div>
                              <span className="block text-[8px] uppercase font-black text-orange-500 tracking-widest">PRESTAÇÃO ESTIMADA</span>
                              <span className="text-[10px] text-neutral-500 font-mono capitalize">{interestMessage}</span>
                            </div>
                            <span className="text-2xl font-[900] text-white tracking-tight font-mono">
                              {formatBRL(monthlyPayment)}<span className="text-xs font-normal text-neutral-500">/mês</span>
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                          <div>
                            <span className="block text-[8px] uppercase font-black text-orange-500 tracking-widest">FORMA DE PAGAMENTO</span>
                            <span className="text-[10px] text-neutral-500 uppercase font-mono">À Vista integral</span>
                          </div>
                          <span className="text-2xl font-[900] text-white font-mono">
                            {formatBRL(vehicle.price)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex items-start space-x-3 text-[10px] text-neutral-400 bg-amber-950/20 p-4 border border-amber-500/10 font-mono leading-relaxed">
                      <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p>
                        IMPORTANTE: Cálculo simulador meramente informativo. Sujeito a alteração de tarifas adicionais de acordo com score de crédito pessoal consultado no sistema do banco parceiro.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Interative Form / Success Screen (5 Cols) */}
              <div className="col-span-1 lg:col-span-5 p-6 lg:p-8 bg-black flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="quote-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest">FORMULÁRIO DE PROPOSTA</h3>
                        <p className="text-[10px] text-neutral-400 leading-relaxed mt-1">Preencha seus canais de atendimento e receba retorno do seu cadastro em minutos.</p>
                      </div>

                      {/* Full Name input */}
                      <div>
                        <label htmlFor="fullName" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Nome Completo *</label>
                        <input
                          type="text"
                          id="fullName"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ex: João da Silva"
                          className={`w-full text-xs px-4 py-3 bg-[#0a0a0a] border rounded-none focus:ring-1 focus:ring-white focus:border-white text-white outline-none transition-all ${
                            formErrors.fullName ? 'border-red-500' : 'border-white/10'
                          }`}
                        />
                        {formErrors.fullName && (
                          <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1 font-mono"><AlertCircle className="h-3.5 w-3.5" /> {formErrors.fullName}</span>
                        )}
                      </div>

                      {/* Contact Fields row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">E-mail *</label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="exemplo@gmail.com"
                            className={`w-full text-xs px-4 py-3 bg-[#0a0a0a] border rounded-none focus:ring-1 focus:ring-white focus:border-white text-white outline-none transition-all ${
                              formErrors.email ? 'border-red-500' : 'border-white/10'
                            }`}
                          />
                          {formErrors.email && (
                            <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1 font-mono"><AlertCircle className="h-3.5 w-3.5" /> {formErrors.email}</span>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">WhatsApp / Fone *</label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(11) 99999-9999"
                            className={`w-full text-xs px-4 py-3 bg-[#0a0a0a] border rounded-none focus:ring-1 focus:ring-white focus:border-white text-white outline-none transition-all ${
                              formErrors.phone ? 'border-red-500' : 'border-white/10'
                            }`}
                          />
                          {formErrors.phone && (
                            <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1 font-mono"><AlertCircle className="h-3.5 w-3.5" /> {formErrors.phone}</span>
                          )}
                        </div>
                      </div>

                      {/* Contact preference */}
                      <div>
                        <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Canal de Contato Preferencial</span>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setContactMethod('whatsapp')}
                            className={`py-2 text-[10px] font-black uppercase tracking-wider border rounded-none cursor-pointer transition-all ${
                              contactMethod === 'whatsapp' ? 'bg-[#00e676]/10 border-[#00e676] text-[#00e676]' : 'bg-[#0a0a0a] border-white/10 hover:bg-white/5 text-neutral-400'
                            }`}
                          >
                            WhatsApp
                          </button>
                          <button
                            type="button"
                            onClick={() => setContactMethod('email')}
                            className={`py-2 text-[10px] font-black uppercase tracking-wider border rounded-none cursor-pointer transition-all ${
                              contactMethod === 'email' ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-[#0a0a0a] border-white/10 hover:bg-white/5 text-neutral-400'
                            }`}
                          >
                            E-mail
                          </button>
                          <button
                            type="button"
                            onClick={() => setContactMethod('phone')}
                            className={`py-2 text-[10px] font-black uppercase tracking-wider border rounded-none cursor-pointer transition-all ${
                              contactMethod === 'phone' ? 'bg-white/10 border-white text-white' : 'bg-[#0a0a0a] border-white/10 hover:bg-white/5 text-neutral-400'
                            }`}
                          >
                            Ligação
                          </button>
                        </div>
                      </div>

                      {/* Down Payment setting with slider */}
                      <div className="bg-[#0a0a0a] p-4.5 border border-white/10 rounded-none">
                        <div className="flex justify-between items-center mb-1">
                          <label htmlFor="downPaymentInput" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Valor de Entrada *</label>
                          <span className="text-xs font-black font-mono text-orange-500">{formatBRL(downPayment)}</span>
                        </div>
                        <p className="text-[9px] text-neutral-500 mb-3 uppercase tracking-wide font-mono">Use a barra abaixo para recalcular.</p>
                        
                        <input
                          type="range"
                          min={Math.round(vehicle.price * 0.1)} // 10% min
                          max={Math.round(vehicle.price * 0.9)} // 90% max
                          step={5000}
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-orange-500 mb-3"
                        />
                        <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
                          <span>MIN: {formatBRL(vehicle.price * 0.1)}</span>
                          <span>MAX: {formatBRL(vehicle.price * 0.9)}</span>
                        </div>
                        {formErrors.downPayment && (
                          <span className="text-[10px] text-red-450 flex items-center gap-1 mt-1 font-mono"><AlertCircle className="h-3 w-3" /> {formErrors.downPayment}</span>
                        )}
                      </div>

                      {/* Installments selector */}
                      <div>
                        <label className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Nº de Parcelas de Financiamento</label>
                        <div className="grid grid-cols-5 gap-1">
                          {[1, 24, 36, 48, 60].map((inst) => (
                            <button
                              key={inst}
                              type="button"
                              onClick={() => setInstallments(inst)}
                              className={`py-2 px-1 text-[10px] font-black uppercase tracking-wider border rounded-none cursor-pointer transition-all ${
                                installments === inst
                                  ? 'bg-white border-white text-black'
                                  : 'bg-[#0a0a0a] border-white/10 text-neutral-400 hover:bg-white/5'
                              }`}
                            >
                              {inst === 1 ? 'A vista' : `${inst}x`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message optional detail */}
                      <div>
                        <label htmlFor="message" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Condições adicionais (Opcional)</label>
                        <textarea
                          id="message"
                          rows={2}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ex: Oferecer seminovo usado na troca, blindado o veículo..."
                          className="w-full text-xs px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-none focus:ring-1 focus:ring-white focus:border-white outline-none resize-none transition-all placeholder:text-neutral-700 font-medium"
                        />
                      </div>

                      {/* Primary Submit CTA */}
                      <button
                        type="submit"
                        className="w-full py-4 px-4 bg-white hover:bg-orange-500 text-black hover:text-white font-black text-xs tracking-widest rounded-none cursor-pointer transition-colors flex items-center justify-center space-x-2.5 uppercase"
                      >
                        <Send className="h-4 w-4" />
                        <span>ENVIAR PROPOSTA VIP</span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 px-4 flex flex-col items-center my-auto"
                    >
                      <div className="w-14 h-14 bg-orange-950/20 border border-orange-500/30 text-orange-500 rounded-none flex items-center justify-center mb-6">
                        <CheckCircle className="h-7 w-7" />
                      </div>
                      
                      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Simulação Salva!</h3>
                      <p className="text-xs text-neutral-450 leading-relaxed max-w-sm mb-6 font-mono uppercase">
                        EXCELENTE ESCOLHA, {fullName}! SUA PROPOSTA DO {vehicle.brand} {vehicle.model} FOI REGISTRADA COM SUCESSO.
                      </p>

                      <div className="w-full p-4.5 border border-white/10 bg-[#0a0a0a] text-left text-xs mb-8 space-y-2.5 font-mono text-neutral-450">
                        <div className="flex gap-2 text-white">
                          <Check className="h-4 w-4 flex-shrink-0 text-orange-500" />
                          <span>Meio de Retorno: <strong className="text-orange-500 uppercase">{contactMethod === 'whatsapp' ? 'WhatsApp' : contactMethod === 'email' ? 'E-mail' : 'Fone'} ({phone})</strong>.</span>
                        </div>
                        <div className="flex gap-2">
                          <Check className="h-4 w-4 flex-shrink-0 text-orange-500" />
                          <span>Disponibilizado na sua aba "Minhas Simulações".</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <button
                          type="button"
                          onClick={() => setIsSubmitted(false)}
                          className="w-full py-3.5 border border-white/10 hover:bg-white/5 text-white font-bold text-[10px] uppercase tracking-widest rounded-none cursor-pointer transition-colors"
                        >
                          Nova Simulação
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full py-3.5 bg-white text-black hover:bg-orange-500 hover:text-white font-[900] text-[10px] uppercase tracking-widest rounded-none cursor-pointer transition-colors"
                        >
                          Voltar ao Estoque
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
