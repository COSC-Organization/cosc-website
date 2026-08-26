'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Pixelify_Sans } from 'next/font/google';
import { MessageSquare, Pencil, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function GetInTouchPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/cosc@canaraengineering.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _cc: "kaushik0h0s@gmail.com,schaithra2006@gmail.com",
          _subject: `COSC Website Inquiry: ${formData.subject || 'New Contact Message'}`,
          _template: "table",
        }),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error("Direct message submission error:", err);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 h-screen w-screen overflow-hidden select-none flex flex-col justify-between ${pixelify.className}`}>
      
      {/* Full Screen Background Campus Image */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/contact/bg.png"
          alt="Canara Campus Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15 backdrop-brightness-[0.98]" />
      </div>

      {/* --- MIDDLE & BOTTOM CONTENT CONTAINER --- */}
      <main className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-2 sm:px-6 pt-12 sm:pt-16 lg:pt-24 pb-1 sm:pb-3 overflow-hidden">
          <div className="relative z-10 w-full max-w-[720px] mx-auto my-auto mt-6 sm:mt-10 translate-y-4 sm:translate-y-8 aspect-[1536/1024] hidden md:flex items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)] shrink-0">
          <Image
            src="/contact/board.png"
            alt="Contact Board Frame"
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 90vw, 720px"
            className="object-contain"
          />

          {/* Top Wooden Banner Text */}
          <div className="absolute top-[5.8%] left-1/2 -translate-x-1/2 z-20 text-center w-[45%] flex items-center justify-center">
            <span className="text-xs sm:text-sm md:text-base font-bold text-[#2C1D0F] tracking-wide leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              We'd love to hear from you!
            </span>
          </div>

          {/* Content Container Overlay Inside Board Parchment */}
          <div className="absolute inset-[11%_5%_5%_5%] z-20 grid grid-cols-12 gap-3 md:gap-5 items-stretch p-2 sm:p-4">
            
            {/* LEFT COLUMN: LET'S CONNECT */}
            <div className="col-span-5 flex flex-col justify-between pr-3 border-r-2 border-dashed border-[#C4B293]/60">
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-[#2E1F12]">
                  <div className="p-1 rounded bg-[#3D2714] text-[#EDE2C8]">
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </div>
                  <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase">
                    LET'S CONNECT
                  </h2>
                </div>

                <p className="text-[10px] sm:text-xs font-medium text-[#4A3B2C] leading-snug mb-3">
                  Have a question, suggestion, or partnership idea? Reach out to us and we'll get back to you as soon as possible!
                </p>

                <div className="space-y-2">
                  {/* Email */}
                  <div className="p-2 sm:p-2.5 rounded-lg border border-[#C9B99A] flex items-start gap-2 bg-[#E2D3B6]/80">
                    <div className="p-1 rounded bg-[#A2481A] text-white shrink-0 mt-0.5">
                      <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-[9px] sm:text-[10px] font-bold text-[#2A1D11] uppercase tracking-wider">Email</h3>
                      <p className="text-[10px] sm:text-xs font-semibold text-[#3D2D1E] break-all leading-tight">
                        cosc@canaraengineering.in
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="p-2 sm:p-2.5 rounded-lg border border-[#C9B99A] flex items-start gap-2 bg-[#E2D3B6]/80">
                    <div className="p-1 rounded bg-[#A2481A] text-white shrink-0 mt-0.5">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-[9px] sm:text-[10px] font-bold text-[#2A1D11] uppercase tracking-wider">Location</h3>
                      <p className="text-[10px] sm:text-xs font-semibold text-[#3D2D1E] leading-tight">
                        Canara Engineering College, Mangalore, Karnataka, India
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="p-2 sm:p-2.5 rounded-lg border border-[#C9B99A] flex items-start gap-2 bg-[#E2D3B6]/80">
                    <div className="p-1 rounded bg-[#A2481A] text-white shrink-0 mt-0.5">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-[9px] sm:text-[10px] font-bold text-[#2A1D11] uppercase tracking-wider">Response Time</h3>
                      <p className="text-[10px] sm:text-xs font-semibold text-[#3D2D1E] leading-tight">
                        We usually reply within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SEND US A MESSAGE */}
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-[#2E1F12]">
                  <div className="p-1 rounded bg-[#3D2714] text-[#EDE2C8]">
                    <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase">
                    SEND US A MESSAGE
                  </h2>
                </div>

                {submitted ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 bg-[#E2D3B6]/90 rounded-lg border border-[#C9B99A] p-4">
                    <CheckCircle2 className="w-8 h-8 text-[#8B3A13] animate-bounce" />
                    <h3 className="text-xs sm:text-sm font-bold text-[#2C1D0F]">Message Received!</h3>
                    <p className="text-[10px] sm:text-xs font-medium text-[#4A3B2C]">
                      Thank you for reaching out. We will get back to you as soon as possible!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-3 py-1 rounded bg-[#A2481A] hover:bg-[#B8531F] text-white font-bold text-[10px] sm:text-xs uppercase border border-[#5E2408] transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2">
                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[10px] sm:text-xs font-medium focus:outline-none focus:border-[#7A4B20] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[10px] sm:text-xs font-medium focus:outline-none focus:border-[#7A4B20] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[10px] sm:text-xs font-medium focus:outline-none focus:border-[#7A4B20] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[10px] sm:text-xs font-medium focus:outline-none focus:border-[#7A4B20] transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-0.5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-3.5 py-1.5 rounded bg-[#A2481A] hover:bg-[#B8531F] text-white font-bold text-[10px] sm:text-xs uppercase border-2 border-[#5E2408] shadow-[0_2px_0_#5E2408] flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3 h-3 fill-current" />
                        <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE BOARD CONTAINER (image.png - Vertical Portrait 941x1672) - md:hidden */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-[88vw] max-w-[350px] aspect-[941/1672] mx-auto my-auto flex md:hidden items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)] shrink-0">
          <Image
            src="/contact/image.png"
            alt="Mobile Contact Board Frame"
            fill
            priority
            quality={100}
            sizes="88vw"
            className="object-contain"
          />

          {/* Top Wooden Banner Text on Mobile */}
          <div className="absolute top-[2.8%] left-1/2 -translate-x-1/2 z-20 text-center w-[50%] flex flex-col items-center justify-center">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#2C1D0F] tracking-wide leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              We'd love to<br />hear from you!
            </span>
          </div>

          {/* Vertical Parchment Content Overlay on Mobile */}
          <div className="absolute inset-[13.5%_18.5%_9.5%_18.5%] z-20 flex flex-col justify-between py-1 text-[#2C1D0F]">
            
            {/* 1. TOP SECTION: LET'S CONNECT INTRO */}
            <div>
              <div className="flex items-center gap-1 mb-0.5 text-[#2E1F12]">
                <div className="p-1 rounded bg-[#3D2714] text-[#EDE2C8]">
                  <MessageSquare className="w-2.5 h-2.5 fill-current" />
                </div>
                <h2 className="text-[10px] font-bold tracking-wider uppercase">
                  LET'S CONNECT
                </h2>
              </div>

              <p className="text-[8px] font-medium text-[#4A3B2C] leading-tight">
                Have a question, suggestion, or partnership idea? Reach out to us and we'll get back to you as soon as possible!
              </p>
            </div>

            <div className="w-full border-b border-dashed border-[#C4B293]/70 my-0.5" />

            {/* 2. MIDDLE SECTION: SEND US A MESSAGE FORM */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 mb-0.5 text-[#2E1F12]">
                <div className="p-1 rounded bg-[#3D2714] text-[#EDE2C8]">
                  <Pencil className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[10px] font-bold tracking-wider uppercase">
                  SEND US A MESSAGE
                </h2>
              </div>

              {submitted ? (
                <div className="py-3 flex flex-col items-center justify-center text-center space-y-1 bg-[#E2D3B6]/90 rounded-lg border border-[#C9B99A] p-2">
                  <CheckCircle2 className="w-5 h-5 text-[#8B3A13] animate-bounce" />
                  <h3 className="text-[9.5px] font-bold text-[#2C1D0F]">Message Received!</h3>
                  <p className="text-[8px] font-medium text-[#4A3B2C]">
                    Thank you for reaching out. We will get back to you as soon as possible!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-1 px-2 py-0.5 rounded bg-[#A2481A] text-white font-bold text-[8px] uppercase border border-[#5E2408] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-1">
                  <div>
                    <label className="block text-[7.5px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-1.5 py-0.5 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[8px] font-medium focus:outline-none focus:border-[#7A4B20]"
                    />
                  </div>

                  <div>
                    <label className="block text-[7.5px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-1.5 py-0.5 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[8px] font-medium focus:outline-none focus:border-[#7A4B20]"
                    />
                  </div>

                  <div>
                    <label className="block text-[7.5px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-1.5 py-0.5 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[8px] font-medium focus:outline-none focus:border-[#7A4B20]"
                    />
                  </div>

                  <div>
                    <label className="block text-[7.5px] font-bold text-[#2C1D0F] uppercase tracking-wider mb-0.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-1.5 py-0.5 rounded bg-[#DFD1B4]/90 border border-[#AF9F82] text-[#2C1D0F] placeholder-[#8C7B61] text-[8px] font-medium focus:outline-none focus:border-[#7A4B20] resize-none"
                    />
                  </div>

                  <div className="pt-0.5 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-1 rounded-lg bg-[#A2481A] hover:bg-[#B8531F] text-white font-bold text-[8.5px] uppercase border-2 border-[#5E2408] shadow-[0_2px_0_#5E2408] flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-2.5 h-2.5 fill-current" />
                      <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="w-full border-b border-dashed border-[#C4B293]/70 my-0.5" />

            {/* 3. BOTTOM SECTION: CONTACT INFO BOXES */}
            <div className="space-y-1">
              {/* Email */}
              <div className="p-1 rounded-lg border border-[#C9B99A] flex items-center gap-1.5 bg-[#E2D3B6]/80">
                <div className="p-0.5 rounded bg-[#A2481A] text-white shrink-0">
                  <Mail className="w-2.5 h-2.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[7.5px] font-bold text-[#2A1D11] uppercase tracking-wider leading-none">Email</h3>
                  <p className="text-[8px] font-bold text-[#3D2D1E] truncate leading-tight">
                    cosc@canaraengineering.in
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="p-1 rounded-lg border border-[#C9B99A] flex items-center gap-1.5 bg-[#E2D3B6]/80">
                <div className="p-0.5 rounded bg-[#A2481A] text-white shrink-0">
                  <MapPin className="w-2.5 h-2.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[7.5px] font-bold text-[#2A1D11] uppercase tracking-wider leading-none">Location</h3>
                  <p className="text-[8px] font-semibold text-[#3D2D1E] truncate leading-tight">
                    Canara Engg College, Mangalore
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-1 rounded-lg border border-[#C9B99A] flex items-center gap-1.5 bg-[#E2D3B6]/80">
                <div className="p-0.5 rounded bg-[#A2481A] text-white shrink-0">
                  <Clock className="w-2.5 h-2.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[7.5px] font-bold text-[#2A1D11] uppercase tracking-wider leading-none">Response Time</h3>
                  <p className="text-[8px] font-semibold text-[#3D2D1E] truncate leading-tight">
                    Reply within 24-48 hours
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- BOTTOM FLOATING BOARDS: LEFT (board2.png) & RIGHT (plant.png + board3.png) --- */}
        <div className="w-full max-w-[820px] md:max-w-none mx-auto flex justify-between items-end pb-1 sm:pb-4 md:pb-8 pointer-events-none z-30 shrink-0 px-2 sm:px-4 md:px-12 -translate-y-16 sm:-translate-y-20 md:-translate-y-14">
          
          {/* BOTTOM LEFT: BOARD 2 */}
          <div className="relative w-26 sm:w-36 lg:w-34 aspect-[600/900] drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] pointer-events-auto translate-x-1 sm:translate-x-4 md:translate-x-16 lg:translate-x-20 md:-translate-y-6">
            <Image
              src="/contact/board2.png"
              alt="Reach Us On Board"
              fill
              priority
              quality={100}
              sizes="(max-width: 640px) 128px, 160px"
              className="object-contain"
            />

            <div className="absolute inset-[10%_12%_15%_14%] flex flex-col justify-start items-center text-center p-1 sm:p-2 z-10 font-mono">
              <h3 className="font-bold tracking-widest text-[#F3E5AB] text-[10px] sm:text-xs uppercase border-b border-[#F3E5AB]/40 pb-0.5 sm:pb-1 mb-1.5 sm:mb-2.5 w-full">
                REACH US ON
              </h3>

              <div className="flex flex-col gap-1.5 sm:gap-2.5 w-full font-bold text-left pl-0.5 sm:pl-1 -rotate-1 sm:-rotate-2 origin-top-left">
                <a
                  href="https://github.com/COSC-Organization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-[#F3E5AB] hover:text-amber-300 transition-colors text-[9px] sm:text-[10.5px]"
                >
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0 p-0.5">
                    <GithubIcon />
                  </div>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/canara-students-open-source-community/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-[#F3E5AB] hover:text-amber-300 transition-colors text-[9px] sm:text-[10.5px]"
                >
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#0A66C2] text-white flex items-center justify-center shrink-0 p-0.5">
                    <LinkedinIcon />
                  </div>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/cosc_cec?igsi=NWhzZjFlM2lsamJ0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-[#F3E5AB] hover:text-amber-300 transition-colors text-[9px] sm:text-[10.5px]"
                >
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 p-0.5">
                    <InstagramIcon />
                  </div>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: PLANT + BOARD 3 */}
          <div className="flex items-end gap-0.5 sm:gap-2 md:gap-3 pointer-events-auto translate-x-2 sm:translate-x-4 md:-translate-x-8">
            {/* Plant */}
            <div className="relative w-26 sm:w-34 lg:w-40 aspect-square shrink-0 drop-shadow-md translate-x-10 sm:translate-x-14 md:translate-x-8 -translate-y-4 sm:-translate-y-6 md:-translate-y-10">
              <Image
                src="/contact/plant.png"
                alt="Potted Plant"
                fill
                priority
                quality={100}
                sizes="(max-width: 640px) 104px, 160px"
                className="object-contain object-bottom"
              />
            </div>

            {/* Board 3 */}
            <div className="relative w-26 sm:w-36 lg:w-34 aspect-[600/900] drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] pointer-events-auto translate-x-4 sm:translate-x-6 md:translate-x-0 md:-translate-y-4">
              <Image
                src="/contact/board3.png"
                alt="Let's Build Something Amazing Board"
                fill
                priority
                quality={100}
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain"
              />

              <div className="absolute inset-[10%_12%_15%_12%] flex flex-col justify-center items-center text-center p-0.5 sm:p-1.5 z-10 font-mono text-[9.5px] sm:text-xs font-bold tracking-widest gap-0.5 sm:gap-1 text-[#F3E5AB] rotate-2 sm:rotate-4 origin-center -translate-x-1.5 sm:-translate-x-2 -translate-y-1 sm:-translate-y-2">
                <p>LET'S</p>
                <p>BUILD</p>
                <p>SOMETHING</p>
                <p>AMAZING</p>
                <p>TOGETHER!</p>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
