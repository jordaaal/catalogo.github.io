/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VehicleQuote } from '../types.ts';
import { FileText, Trash2, CheckCircle2, RefreshCw, Calendar, ArrowRight, Compass, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface MyQuotesProps {
  quotes: VehicleQuote[];
  onDeleteQuote: (id: string) => void;
  onApproveQuote: (id: string) => void;
  onNavigateToCatalog: () => void;
}

export default function MyQuotes({ quotes, onDeleteQuote, onApproveQuote, onNavigateToCatalog }: MyQuotesProps) {
  
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20 text-[9px]';
      case 'Em Análise':
        return 'bg-amber-950/40 text-amber-400 border-amber-500/20 text-[9px]';
      default:
        return 'bg-neutral-900 text-neutral-400 border-white/5 text-[9px]';
    }
  };

  // Helper payment metric calculation
  const calculateInstallmentSim = (price: number, downPayment: number, installments: number) => {
    if (installments === 1) return 0;
    const financed = Math.max(0, price - downPayment);
    const rate = 0.0115; // 1.15% pm
    const payment = financed * (rate * Math.pow(1 + rate, installments)) / (Math.pow(1 + rate, installments) - 1);
    return Math.round(payment);
  };

  return (
    <div className="py-24 bg-[#050505] min-h-[90vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Info Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-orange-500 tracking-[0.3em]">Minha Atividade</span>
            <h2 className="text-3xl sm:text-5xl font-[900] text-white tracking-[calc(-0.04em)] uppercase mt-2">Simulações Ativas</h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl font-light">Acompanhe as condições de financiamento pré-analisadas e o status de crédito das suas propostas salvos no seu navegador.</p>
          </div>
          <div className="px-4 py-2 bg-[#0c0c0c] rounded-none border border-white/10 inline-flex items-center space-x-2.5 text-[10px] font-bold text-white uppercase tracking-widest w-fit">
            <span className="w-2 h-2 rounded-none bg-orange-500 animate-pulse"></span>
            <span>Total: {quotes.length} Simulação(ões)</span>
          </div>
        </div>

        {quotes.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 border border-white/10 rounded-none bg-[#0c0c0c] flex flex-col items-center max-w-lg mx-auto"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-white mb-6">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">Nenhuma Simulação Efetuada</h3>
            <p className="text-xs text-neutral-450 mt-2 mb-8 leading-relaxed max-w-xs font-mono">
              ENTRE NO ESTOQUE PRINCIPAL PARA ESCOLHER UM VEÍCULO E CONFIGURAR O SEU ORÇAMENTO.
            </p>
            <button
              onClick={onNavigateToCatalog}
              className="py-4 px-8 bg-white hover:bg-orange-500 hover:text-white text-black font-black text-xs rounded-none cursor-pointer tracking-widest uppercase transition-colors flex items-center space-x-2.5 shadow-xl"
            >
              <Compass className="h-4 w-4" />
              <span>Explorar Novo Estoque</span>
            </button>
          </motion.div>
        ) : (
          /* List of Quotes */
          <div className="space-y-6">
            {quotes.map((quote) => {
              const monthly = calculateInstallmentSim(quote.vehiclePrice, quote.downPayment, quote.installments);
              const formattedDate = new Date(quote.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <motion.div
                  key={quote.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#0c0c0c] rounded-none border border-white/10 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  {/* Aspect Thumbnail (3 cols) */}
                  <div className="md:col-span-3 aspect-16/10 rounded-none overflow-hidden bg-neutral-900 border border-white/10">
                    <img
                      src={quote.vehicleImage}
                      alt={`${quote.vehicleBrand} ${quote.vehicleModel}`}
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Core simulation Details (6 cols) */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase tracking-widest">{quote.vehicleBrand}</span>
                      <h3 className="text-base font-black text-white uppercase tracking-tight">{quote.vehicleModel}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="block text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-1.5">DADOS DO SOLICITANTE</span>
                        <span className="block font-bold text-white truncate">{quote.fullName}</span>
                        <span className="block text-[11px] text-neutral-400 font-mono truncate">{quote.email}</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-1.5">PLANO DE ATENDIMENTO</span>
                        {quote.installments > 1 ? (
                          <span className="block font-black text-orange-500 font-mono">
                            {quote.installments}X DE {formatBRL(monthly)}
                          </span>
                        ) : (
                          <span className="block font-black text-orange-500 font-mono">{formatBRL(quote.vehiclePrice)} À VISTA</span>
                        )}
                        <span className="block text-[11px] text-neutral-400 font-mono">Entrada: {formatBRL(quote.downPayment)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-neutral-500 font-mono">
                      <span className="flex items-center space-x-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Data: {formattedDate}</span>
                      </span>
                      <span>• Meio: <strong className="uppercase text-white tracking-widest">{quote.contactMethod}</strong></span>
                    </div>

                    {quote.message && (
                      <div className="p-3 bg-black border border-white/5 rounded-none text-[11px] text-neutral-400 font-light leading-relaxed">
                        "{quote.message}"
                      </div>
                    )}
                  </div>

                  {/* Action actions (3 cols) */}
                  <div className="md:col-span-3 flex flex-row md:flex-col items-center justify-end md:justify-center gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 pl-0 md:pl-6">
                    
                    {/* Status Badge */}
                    <div className={`px-4 py-2 text-center w-full text-[10px] font-black uppercase tracking-widest rounded-none border ${getStatusStyle(quote.status)}`}>
                      {quote.status}
                    </div>

                    {quote.status === 'Em Análise' && (
                      <button
                        onClick={() => onApproveQuote(quote.id)}
                        className="py-2.5 px-3 text-[9px] font-black uppercase tracking-widest text-black bg-white hover:bg-orange-500 hover:text-white rounded-none cursor-pointer transition-colors flex items-center justify-center space-x-1.5 w-full border border-transparent"
                        title="Simular prospecção de aprovação imediata"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Aprovar Crédito</span>
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteQuote(quote.id)}
                      className="p-2.5 text-neutral-500 hover:text-rose-400 rounded-none bg-neutral-900/50 hover:bg-rose-950/20 border border-white/10 hover:border-rose-500/20 cursor-pointer transition-colors flex items-center justify-center space-x-1.5 w-full md:w-auto text-[9px] font-bold uppercase tracking-widest md:px-4"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Excluir</span>
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
