import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Target, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

/**
 * K-Glow Professional Website
 * Design Theme: Elegant Rose Gold & Charcoal
 */

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll logic
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Scroll visibility and active section effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const sections = ['hero', 'about', 'service', 'contact'];
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observers.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBFB] font-sans text-rich-charcoal">
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/90 border-rose-gold/10 backdrop-blur-md shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          id="nav-logo"
        >
          <div className="h-12 w-auto flex items-center justify-center">
            <span className={`text-2xl sm:text-3xl font-elegant font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-rose-gold' : 'text-white'} group-hover:text-rose-gold-lighter`}>
              K-Glow
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <button 
            className={`text-sm font-semibold transition-all hover:text-rose-gold relative ${
              activeSection === 'about' 
                ? 'text-rose-gold' 
                : (isScrolled ? 'text-slate-500 font-medium' : 'text-white font-medium')
            }`}
            onClick={() => scrollTo('about')}
          >
            About Us
            {activeSection === 'about' && (
              <motion.div 
                layoutId="navUnderline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-rose-gold rounded-full"
              />
            )}
          </button>
          <button 
            className={`text-sm font-semibold transition-all hover:text-rose-gold relative ${
              activeSection === 'service' 
                ? 'text-rose-gold' 
                : (isScrolled ? 'text-slate-500 font-medium' : 'text-white font-medium')
            }`}
            onClick={() => scrollTo('service')}
          >
            Our Service
            {activeSection === 'service' && (
              <motion.div 
                layoutId="navUnderline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-rose-gold rounded-full"
              />
            )}
          </button>
          <button 
            className={`px-7 py-2.5 text-sm font-bold rounded-full transition-all active:scale-95 border-2 ${
              activeSection === 'contact'
                ? 'bg-rose-gold text-white border-rose-gold shadow-lg shadow-rose-gold/20'
                : isScrolled
                  ? 'bg-rose-gold text-white border-rose-gold hover:bg-deep-rose shadow-lg shadow-rose-gold/20'
                  : 'bg-white text-rich-charcoal border-white hover:bg-rose-gold-lighter'
            }`}
            onClick={() => scrollTo('contact')}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isScrolled ? 'p-2 text-slate-600' : 'p-2 text-white'}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-white px-6 pb-8 shadow-2xl border-b border-rose-gold/10 z-50 md:hidden flex flex-col gap-2"
            >
              <button onClick={() => scrollTo('about')} className="text-left py-4 font-semibold text-rich-charcoal border-b border-slate-50 outline-none">About Us</button>
              <button onClick={() => scrollTo('service')} className="text-left py-4 font-semibold text-rich-charcoal border-b border-slate-50 outline-none">Our Service</button>
              <button onClick={() => scrollTo('contact')} className="text-left py-4 font-bold text-rose-gold outline-none">Contact Us</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Sections */}
        <HeroSection id="hero" onContactClick={() => scrollTo('contact')} />
        <AboutSection />
        <ServiceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-rich-charcoal border-t border-white/5 py-16 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-elegant font-bold text-white tracking-tight">K-glow</span>
              <div className="h-px w-12 bg-rose-gold/40"></div>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                <span className="font-bold text-white/60 mr-3 inline-block w-24">상호</span> 케이글로우(K-Glow)
              </p>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                <span className="font-bold text-white/60 mr-3 inline-block w-24">사업자등록번호</span> 813-09-03478
              </p>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                <span className="font-bold text-white/60 mr-3 inline-block w-24">주소</span> 경기도 성남시 분당구 황새울로360번길 21, 1005호
              </p>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                <span className="font-bold text-white/60 mr-3 inline-block w-24">전화번호</span> 010-3040-0321
              </p>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">
                <span className="font-bold text-white/60 mr-3 inline-block w-24">이메일</span> benjamin@kglowofficial.co.kr
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium">
              © 2026 K-glow Global Inc. All rights reserved.
            </p>
            <div className="h-0.5 w-16 bg-rose-gold/20 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroSection({ id, onContactClick }: { id: string, onContactClick: () => void }) {
  return (
    <section id={id} className="min-h-screen w-full relative flex items-center justify-center text-center py-32">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
          alt="Global Marketing"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-12"
        >
          <div className="px-5 py-2 sm:px-8 sm:py-3 rounded-full border border-rose-gold/40 bg-rose-gold/10 backdrop-blur-md text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase text-rose-gold-lighter whitespace-nowrap shadow-[0_0_20px_rgba(183,110,121,0.1)]">
            USA Market
          </div>

          <div className="flex items-center">
            <div className="h-px w-6 sm:w-16 bg-gradient-to-r from-rose-gold/60 to-transparent"></div>
            <div className="mx-4 text-xs sm:text-sm font-black tracking-[0.4em] uppercase text-white whitespace-nowrap">
              K-Glow
            </div>
            <div className="h-px w-6 sm:w-16 bg-gradient-to-l from-rose-gold/60 to-transparent"></div>
          </div>

          <div className="px-5 py-2 sm:px-8 sm:py-3 rounded-full border border-rose-gold/40 bg-rose-gold/10 backdrop-blur-md text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase text-rose-gold-lighter whitespace-nowrap shadow-[0_0_20px_rgba(183,110,121,0.1)]">
            India Market
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-rose-gold/60 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-medium flex items-center justify-center gap-4">
            <span className="h-px w-4 bg-rose-gold/30"></span>
            K-Glow's Slogan
            <span className="h-px w-4 bg-rose-gold/30"></span>
          </p>
          <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-sans font-light text-white mb-10 border-y border-white/5 py-8 md:py-14 lowercase flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6 select-none max-w-[95vw] mx-auto overflow-hidden">
            {[
              { i: "c", r: "reate" },
              { i: "c", r: "onnect" },
              { i: "c", r: "onvert" }
            ].map((word, idx, arr) => (
              <React.Fragment key={idx}>
                <motion.div 
                  className="flex items-center cursor-default group"
                  initial="initial"
                  whileHover="hover"
                >
                  <span className="tracking-tighter transition-colors group-hover:text-rose-gold-lighter font-semibold">{word.i}</span>
                  <motion.span
                    variants={{
                      initial: { width: 0, opacity: 0 },
                      hover: { width: "auto", opacity: 1, marginLeft: "0.2em" }
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 150 }}
                    className="overflow-hidden whitespace-nowrap inline-block text-white/90 font-light"
                  >
                    {word.r}
                  </motion.span>
                </motion.div>
                {idx < arr.length - 1 && (
                  <span className="text-rose-gold/30 text-2xl sm:text-5xl md:text-7xl font-sans not-italic font-thin px-1 md:px-4 leading-none opacity-50 flex items-center">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-rose-gold uppercase tracking-[0.4em] sm:tracking-[0.8em] text-[9px] sm:text-xs font-black">
              Strategic Global Marketing Bridge
            </p>
            <p className="text-slate-200 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed tracking-tight px-4">
              미국과 인도 시장을 관통하는 최적의 통합 솔루션<br/>
              온-오프라인 마케팅의 경계를 허물고 혁신적인 글로벌 성장을 실현합니다.
            </p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onClick={onContactClick}
          className="mt-14 px-10 py-4 sm:px-12 sm:py-5 rounded-full bg-rose-gold hover:bg-white hover:text-rich-charcoal transition-all font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] shadow-2xl shadow-rose-gold/30 active:scale-95 border border-transparent hover:border-rose-gold/20"
        >
          Get In Touch
        </motion.button>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 bg-white flex justify-center">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-rose-gold font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
          <h2 className="text-4xl md:text-5xl font-elegant italic font-bold text-rich-charcoal mb-8 tracking-tight">Vision</h2>
          <div className="h-1 w-24 bg-rose-gold mb-12"></div>
          
          <div className="relative h-[300px] md:h-[450px] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-16 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
              alt="Global Vision"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBFB] via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full border border-rose-gold/20 shadow-sm">
                <span className="text-[10px] font-black text-rose-gold uppercase tracking-[0.3em]">Illuminating Possibilities</span>
              </div>
            </div>
          </div>

          <p className="text-xl md:text-3xl text-slate-500 font-light leading-relaxed italic text-center max-w-3xl mx-auto">
            "Bridging continents, illuminating possibilities."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceSection() {
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  const services = [
    {
      id: 'usa',
      title: '미국시장 타겟팅 서비스',
      subtitle: 'USA Market Strategic Penetration',
      description: '북미 시장의 소비 트렌드 분석과 로컬 커뮤니티 타겟팅을 통한 정교한 마케팅 솔루션을 제공합니다.',
      details: [
        '데이터 기반 인플루언서 Seeding 캠페인',
        '데이터 기반 인플루언서 Viral 캠페인',
        'TikTok shop, Amazon 운영 대행 서비스',
        '미국 현지 오프라인 30개 벤더십'
      ],
      color: 'rose-gold'
    },
    {
      id: 'india',
      title: '인도시장 타겟팅 서비스',
      subtitle: 'India Market Growth Acceleration',
      description: '급성장하는 인도 시장의 문화적 특수성을 반영한 혁신적인 시장 진입 전략을 제시합니다.',
      details: [
        'CDSCO 단기간 인증 보장 서비스',
        '인도 국적기 및 델리 지하철을 이용한 오프라인 마케팅 가능',
        '지역 및 언어 타겟팅 온라인 인플루언서 마케팅',
        '인도 소셜커머스 입점 대행 서비스',
        '인도 현지 오프라인 마케팅'
      ],
      color: 'rose-gold'
    }
  ];

  return (
    <section id="service" className="py-24 md:py-40 px-6 md:px-12 bg-[#FDFBFB] flex justify-center">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-rose-gold font-bold tracking-widest uppercase text-sm mb-4 block text-center">Our Service</span>
          <h2 className="text-4xl md:text-5xl font-elegant italic font-bold text-rich-charcoal mb-8 tracking-tight text-center">Global Strategy</h2>
          <div className="h-1 w-24 bg-rose-gold mb-16 mx-auto"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className={`relative bg-white rounded-[2rem] md:rounded-[2.5rem] border p-6 md:p-10 shadow-xl overflow-hidden cursor-default transition-all duration-500 ${
                  hoveredMarket === service.id 
                    ? 'border-rose-gold/40 shadow-2xl z-20' 
                    : hoveredMarket 
                      ? 'border-rose-gold/5 opacity-30 grayscale blur-[1px]' 
                      : 'border-rose-gold/10'
                }`}
                onMouseEnter={() => setHoveredMarket(service.id)}
                onMouseLeave={() => setHoveredMarket(null)}
                transition={{ duration: 0.4 }}
              >
                <div className="relative z-10">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 block transition-colors duration-300 ${
                    hoveredMarket === service.id ? 'text-rose-gold' : 'text-slate-400'
                  }`}>
                    {service.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-rich-charcoal mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  <AnimatePresence>
                    {hoveredMarket === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-rose-gold/10 space-y-3">
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                              <div className="w-1.5 h-1.5 bg-rose-gold rounded-full"></div>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Decorative Background Icon */}
                <div className="absolute top-10 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <Building2 size={120} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-8 md:p-16 border border-rose-gold/10 rounded-[2rem] md:rounded-[3rem] bg-white shadow-2xl shadow-rose-gold/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-elegant font-bold text-rich-charcoal mb-4 italic">Core Competencies</h3>
              <p className="text-slate-500 italic mb-8 text-sm">최적의 성과를 이끌어내는 K-glow만의 독보적인 강점.</p>
              <div className="grid grid-cols-1 gap-6">
                {['Strategic Market Analysis', 'Cross-border Logistics', 'Ecosystem Connectivity', 'Omni-channel Branding'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-5 text-slate-600 font-semibold text-sm group cursor-default">
                    <div className="w-2.5 h-2.5 bg-rose-gold rounded-full transition-transform group-hover:scale-150"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-rose-gold/20 flex items-center justify-center p-4">
                <Sparkles className="h-16 w-16 text-rose-gold/30 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-12 bg-white flex justify-center">
      <div className="max-w-4xl w-full">
        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#FDFBFB] rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 shadow-2xl border border-rose-gold/10 text-center"
          >
            <div className="mb-10 flex justify-center">
              <div className="w-24 h-24 bg-rose-gold/10 rounded-full flex items-center justify-center text-rose-gold">
                <Mail className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-4xl font-elegant font-bold text-rich-charcoal leading-tight">Thank You!</h2>
            <p className="mt-6 text-slate-500 text-lg">We have received your message and will get back to you shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-16 text-sm font-bold text-rose-gold hover:tracking-widest transition-all uppercase"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl p-8 md:p-20 border border-rose-gold/10"
          >
            <h2 className="text-4xl md:text-5xl font-elegant italic font-bold text-rich-charcoal mb-4 text-center tracking-tight">Contact Us</h2>
            <p className="text-center text-slate-400 text-[10px] sm:text-sm mb-12 md:mb-16 font-medium tracking-[0.2em] sm:tracking-[0.4em] uppercase">Let's build global connections together.</p>
            
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div>
                  <label className="block text-[10px] font-black text-rose-gold uppercase tracking-widest mb-3 md:mb-4 ml-1">이름 (회사)</label>
                  <input 
                    required type="text"
                    className="w-full px-5 py-4 md:px-7 md:py-5 bg-[#FDFBFB] border border-rose-gold/10 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-rose-gold/5 focus:border-rose-gold transition-all font-medium text-rich-charcoal shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-rose-gold uppercase tracking-widest mb-3 md:mb-4 ml-1">전화번호</label>
                  <input 
                    required type="tel"
                    className="w-full px-5 py-4 md:px-7 md:py-5 bg-[#FDFBFB] border border-rose-gold/10 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-rose-gold/5 focus:border-rose-gold transition-all font-medium text-rich-charcoal shadow-sm text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-rose-gold uppercase tracking-widest mb-3 md:mb-4 ml-1">이메일 주소</label>
                <input 
                  required type="email"
                  className="w-full px-5 py-4 md:px-7 md:py-5 bg-[#FDFBFB] border border-rose-gold/10 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-rose-gold/5 focus:border-rose-gold transition-all font-medium text-rich-charcoal shadow-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-rose-gold uppercase tracking-widest mb-3 md:mb-4 ml-1">타겟 시장 (주관식)</label>
                <textarea 
                  required rows={5}
                  className="w-full px-5 py-4 md:px-7 md:py-5 bg-[#FDFBFB] border border-rose-gold/10 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-rose-gold/5 focus:border-rose-gold transition-all font-medium text-rich-charcoal resize-none shadow-sm text-sm"
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-6 bg-rose-gold text-white font-bold rounded-3xl hover:bg-deep-rose transition-all shadow-xl shadow-rose-gold/20 tracking-widest uppercase text-xs mt-4"
              >
                문의 보내기
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
