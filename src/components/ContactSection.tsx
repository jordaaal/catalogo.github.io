/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GENERAL_CONTACT_INFO } from '../data.ts';
import { MapPin, Phone, MessageSquare, Mail, Clock, Calendar, CheckSquare, Send, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userSubject, setUserSubject] = useState('');
  const [userText, setUserText] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userText) return;

    setSentStatus(true);
    // Reset contact fields
    setUserName('');
    setUserEmail('');
    setUserSubject('');
    setUserText('');
  };

  return (
    <section id="contact-element" className="py-24 bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold font-mono">Consulte Especialistas</span>
          <h2 className="text-3xl sm:text-5xl font-[900] text-white tracking-[calc(-0.04em)] uppercase mt-3 mb-5 leading-tight">
            AGENDE UMA VISITA
          </h2>
          <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Estamos prontos para recebê-lo de portas abertas em nosso lounge premium. Venha realizar um test-drive exclusivo no esportivo ou SUV dos seus sonhos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Panel: Contact Cards & Map & Hours (7 Cols) */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            
            {/* Direct Channels Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Phone item */}
              <a
                href={`tel:${GENERAL_CONTACT_INFO.phone.replace(/\D/g, '')}`}
                className="bg-[#0c0c0c] rounded-none p-6 border border-white/10 hover:border-white/30 transition-all group block"
              >
                <div className="p-3 bg-white/5 text-white w-fit rounded-none border border-white/10 group-hover:bg-white group-hover:text-black transition-all mb-4">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Ligações</h4>
                <p className="text-xs font-semibold text-white mt-2 font-mono">{GENERAL_CONTACT_INFO.phone}</p>
              </a>

              {/* Whatsapp item */}
              <a
                href={`https://wa.me/${GENERAL_CONTACT_INFO.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0c0c0c] rounded-none p-6 border border-white/10 hover:border-emerald-500/40 transition-all group block"
              >
                <div className="p-3 bg-emerald-950/20 text-emerald-400 w-fit rounded-none border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all mb-4">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">WhatsApp</h4>
                <p className="text-xs font-semibold text-white mt-2 font-mono">CONVERSAR AO VIVO</p>
              </a>

              {/* Email item */}
              <a
                href={`mailto:${GENERAL_CONTACT_INFO.email}`}
                className="bg-[#0c0c0c] rounded-none p-6 border border-white/10 hover:border-white/30 transition-all group block"
              >
                <div className="p-3 bg-white/5 text-white w-fit rounded-none border border-white/10 group-hover:bg-white group-hover:text-black transition-all mb-4">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">E-mail VIP</h4>
                <p className="text-xs font-semibold text-white mt-2 font-mono truncate">{GENERAL_CONTACT_INFO.email}</p>
              </a>

            </div>

            {/* Simulated Interactive Map Location */}
            <div className="bg-[#0c0c0c] rounded-none border border-white/10 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 aspect-4/3 rounded-none overflow-hidden relative bg-black border border-white/10">
                {/* Mock map style graphic */}
                <div className="absolute inset-0 bg-[#070707] overflow-hidden flex items-center justify-center text-center p-6 border-none">
                  <div className="space-y-3">
                    <MapPin className="h-8 w-8 text-orange-500 mx-auto animate-bounce" />
                    <span className="block text-[10px] font-black text-white uppercase tracking-[0.25em]">Elite Motors VIP Salon</span>
                    <span className="block text-[9px] text-neutral-500 font-mono">São Paulo, SP - Brasil</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-5">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Endereço Principal</h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{GENERAL_CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="divider border-t border-white/10 my-2"></div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>Horário de Atendimento</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5 text-[11px] font-mono">
                    {GENERAL_CONTACT_INFO.hours.map((item, index) => (
                      <div key={index} className="flex justify-between border-b border-white/5 pb-1 last:border-none">
                        <span className="text-neutral-500">{item.days}:</span>
                        <span className="font-bold text-white uppercase">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Send a message Form (5 Cols) */}
          <div className="col-span-1 lg:col-span-5">
            <div className="bg-[#0c0c0c] rounded-none border border-white/10 p-6 sm:p-8 flex flex-col justify-between h-full">
              
              <AnimatePresence mode="wait">
                {!sentStatus ? (
                  <form key="general-contact-form" onSubmit={handleGeneralSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">MENSAGEM RÁPIDA</h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">Solicitações de financiamento, parcerias corporativas ou propostas sob medida.</p>
                    </div>

                    <div>
                      <label htmlFor="genName" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Seu Nome Completo *</label>
                      <input
                        type="text"
                        id="genName"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Ex: Pedro Henrique"
                        className="w-full text-xs px-4 py-3.5 bg-black border border-white/15 focus:border-white focus:ring-1 focus:ring-white rounded-none outline-none transition-all placeholder:text-neutral-700 text-white font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="genEmail" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Seu E-mail de Contato *</label>
                      <input
                        type="email"
                        id="genEmail"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="pedro@exemplo.com"
                        className="w-full text-xs px-4 py-3.5 bg-black border border-white/15 focus:border-white focus:ring-1 focus:ring-white rounded-none outline-none transition-all placeholder:text-neutral-700 text-white font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="genSubject" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Assunto</label>
                      <input
                        type="text"
                        id="genSubject"
                        value={userSubject}
                        onChange={(e) => setUserSubject(e.target.value)}
                        placeholder="Ex: Oferecer seminovo na troca"
                        className="w-full text-xs px-4 py-3.5 bg-black border border-white/15 focus:border-white focus:ring-1 focus:ring-white rounded-none outline-none transition-all placeholder:text-neutral-700 text-white font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="genText" className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Conteúdo da Mensagem *</label>
                      <textarea
                        id="genText"
                        rows={4}
                        required
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        placeholder="Digite os detalhes da sua mensagem..."
                        className="w-full text-xs px-4 py-3.5 bg-black border border-white/15 focus:border-white focus:ring-1 focus:ring-white rounded-none outline-none resize-none transition-all placeholder:text-neutral-700 text-white font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-4 bg-white hover:bg-orange-500 text-black hover:text-white font-black text-xs tracking-widest rounded-none cursor-pointer transition-colors flex items-center justify-center space-x-2.5 uppercase"
                    >
                      <Send className="h-4 w-4" />
                      <span>Enviar Mensagem</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="general-contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 flex flex-col items-center justify-center h-full my-auto"
                  >
                    <div className="w-14 h-14 bg-orange-950/20 border border-orange-500/30 text-orange-500 rounded-none flex items-center justify-center mb-6">
                      <CheckSquare className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">Mensagem Recebida</h3>
                    <p className="text-xs text-neutral-450 max-w-xs mb-6 leading-relaxed font-mono">
                      AGRADECEMOS O CONTATO. RETORNAREMOS EM ATÉ 2 HORAS ÚTEIS.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSentStatus(false)}
                      className="py-3.5 px-6 border border-white/10 text-white hover:bg-white/5 rounded-none text-[10px] font-bold cursor-pointer transition-colors uppercase tracking-widest"
                    >
                      Enviar Outra Mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
