import { motion } from "framer-motion";
import { ChevronRight, Check, ShieldAlert, Scale, FileText, Gavel, Lock, Shield, MapPin, Phone, Mail, PlayCircle } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "@/assets/logo_gilson.png";
import imgGilsonAuthority from "@/assets/fotogilson3.png";
import { initAnalytics, trackEvent, trackPageView, trackWhatsApp } from "@/lib/analytics";

const WHATSAPP = "5563984474070";
const INSTAGRAM_URL = "https://instagram.com/gilsoncarvalho.adv";
const EMAIL = "advogado@gilsoncarvalho.com";
const MAPS_URL = "https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO";
const MAPS_URL_RJ = "https://maps.app.goo.gl/aHr8H2udhfHtgt7r5";
const MAPS_EMBED = "https://www.google.com/maps?q=Av.%20Guanabara%2C%201669%2C%20Centro%20-%20Gurupi%2C%20TO&output=embed";



export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const PAIN_ICONS = [ShieldAlert, Scale, FileText, Gavel, Lock];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export type LandingProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  painsImage?: string;
  solutionsImage?: string;
  authorityImage?: string;
  finalImage?: string;
  pains: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  ctaText: string;
  whatsappMessage: string;
};

export default function LegalLanding(p: LandingProps) {



  const [waTipVisible, setWaTipVisible] = useState(false);
  const [waTipKey, setWaTipKey] = useState(0);

  useEffect(() => {
    initAnalytics();
    trackPageView(typeof window !== "undefined" ? window.location.pathname : p.eyebrow, p.eyebrow);
  }, [p.eyebrow]);

  useEffect(() => {
    const id = setInterval(() => {
      setWaTipKey((k) => k + 1);
      setWaTipVisible(true);
      const t = setTimeout(() => setWaTipVisible(false), 3000);
      return () => clearTimeout(t);
    }, 8000);
    return () => clearInterval(id);
  }, []);





  const painsBg = p.painsImage ?? p.heroImage;
  const solutionsBg = p.solutionsImage ?? p.heroImage;
  const finalBg = p.finalImage ?? p.heroImage;

  return (
    <div className="min-h-screen text-stone-100 relative" style={{ backgroundColor: "#333333" }}>
      <div className="noise-overlay" aria-hidden="true" />

      {/* HEADER — Logo + WhatsApp apenas */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5" style={{ backgroundColor: "rgba(29,29,29,0.85)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#topo" className="flex items-center gap-3">
            <img src={logo} alt="Gilson Carvalho Advocacia" width={200} height={48} className="h-12 w-auto" loading="eager" decoding="async" />
          </a>
          <a
            href={waLink(p.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("cta")}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold shadow-lg shadow-green-900/30 hover:scale-[1.03] transition-transform"
            style={{ backgroundColor: "#25D366", color: "#0d2418" }}
          >
            <FaWhatsapp className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="topo" className="relative min-h-[88vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${p.heroImage})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 py-24 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold">{p.eyebrow}</span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <motion.h1 {...reveal} className="font-serif-luxe text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-stone-50 text-balance">
            <em className="text-gold-gradient not-italic">{p.heroTitle}</em>
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }} className="mt-8 text-stone-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {p.heroSubtitle}
          </motion.p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#triagem" className="cta-pulse-gold inline-flex items-center justify-center gap-3 text-charcoal-deep font-semibold px-7 py-4 text-xs tracking-[0.25em] uppercase hover:shadow-2xl hover:shadow-amber-900/40 transition-all" style={{ backgroundColor: "#bfa15f" }}>
              <FaWhatsapp className="w-4 h-4" /> {p.ctaText}
            </a>
            <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("cta")} className="cta-pulse-gold inline-flex items-center justify-center gap-2 border text-gold font-medium px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-charcoal-deep transition-colors" style={{ borderColor: "#bfa15f" }}>
              Falar Agora
            </a>

          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${painsBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Você reconhece?</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">Desafios que enfrentamos juntos</h2>
          </div>
          <motion.div {...reveal} className="grid md:grid-cols-3 gap-6">
            {p.pains.map((it, i) => {
              const PainIcon = PAIN_ICONS[i % PAIN_ICONS.length];
              return (
                <div key={it.title} className="relative p-8 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
                  <PainIcon size={28} className="text-gold mb-5" strokeWidth={1.3} />
                  <h4 className="font-serif-luxe text-xl text-stone-50 mb-3">{it.title}</h4>
                  <p className="text-stone-300 text-sm leading-relaxed">{it.desc}</p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${solutionsBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Como podemos ajudar</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">Soluções jurídicas estratégicas</h2>
          </div>
          <motion.div {...reveal} className="grid md:grid-cols-2 gap-6">
            {p.solutions.map((it) => (
              <div key={it.title} className="card-hover-gold relative p-8 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 border border-gold/50 shrink-0">
                    <Shield size={16} className="text-gold" />
                  </span>
                  <div>
                    <h4 className="font-serif-luxe text-xl text-stone-50 mb-2">{it.title}</h4>
                    <p className="text-stone-300 text-sm leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#242424" }}>
        <div className="absolute inset-0 opacity-[0.05] bg-cover bg-center" style={{ backgroundImage: `url(${p.authorityImage ?? p.heroImage})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Autoridade Jurídica</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">
              Quem vai defender os direitos da <em className="text-gold-gradient not-italic">sua família?</em>
            </h2>
          </div>
          <motion.div {...reveal} className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative mx-auto max-w-[460px]">
              <div className="absolute -inset-2 border border-gold/40" />
              <div style={{ border: "1px solid #C8A84B" }} className="p-[2px]">
                <img
                  src={imgGilsonAuthority}
                  alt="Dr. Gilson Carvalho — Advogado especialista em Direito de Família e Sucessões"
                  width={450}
                  height={563}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover shadow-2xl shadow-black/60"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>
            <div>
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/40 px-4 py-2 mb-6">Dr. Gilson Carvalho</span>
              <p className="text-stone-200 text-lg leading-relaxed mb-6">
                Gilson Carvalho é especialista em <strong className="text-gold">Direito de Família e Sucessões</strong> com mais de <strong className="text-gold">20 anos de atuação estratégica</strong>. Dedica-se a proteger o patrimônio e garantir a paz em momentos de transição familiar, com total discrição e excelência jurídica.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 px-3 py-1.5">OAB/TO 2.591</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 px-3 py-1.5">OAB/RJ 256.131</span>
              </div>
              <ul className="space-y-3">
                {["20+ anos de atuação estratégica", "Mestre em Direito · MBA em Gestão", "Atendimento sigiloso em todo o Brasil"].map((it) => (
                  <li key={it} className="flex items-center gap-3 text-stone-200">
                    <Check size={16} className="text-gold shrink-0" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA + EMBEDDED FORM */}
      <section id="triagem" className="relative py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${finalBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h3 className="font-serif-luxe text-3xl md:text-4xl text-stone-50 leading-tight mb-5">
              Pronto para dar o <em className="text-gold-gradient not-italic">próximo passo seguro?</em>
            </h3>
            <p className="text-stone-300 leading-relaxed max-w-2xl mx-auto">
              Agende uma consulta privada e receba orientação estratégica feita sob medida para o seu caso.
            </p>
            <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-gold">Escolha a opção desejada abaixo:</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Embedded form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 md:p-10 border border-gold/20 space-y-5" style={{ backgroundColor: "rgba(20,20,20,0.85)" }}>
              <h4 className="font-serif-luxe text-2xl text-stone-50 mb-2">Formulário de Triagem Privada</h4>
              <p className="text-xs text-stone-400 mb-4">Preencha abaixo — entraremos em contato com a discrição que o seu caso merece.</p>

              {sent ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle2 size={56} className="text-gold" strokeWidth={1.2} />
                  <p className="font-serif-luxe text-2xl text-stone-50">Triagem iniciada com sucesso!</p>
                  <p className="text-stone-400 text-sm">Clique no botão verde abaixo para iniciar sua conversa privada no WhatsApp.</p>
                  <a
                    href={waFinalLink || waLink(p.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsApp("pos_triagem")}
                    className="wa-pulse-cta mt-2 inline-flex items-center justify-center gap-3 px-6 py-4 text-xs tracking-[0.25em] uppercase font-semibold shadow-2xl shadow-green-900/30"
                    style={{ backgroundColor: "#25D366", color: "#0d2418" }}
                  >
                    <FaWhatsapp className="w-5 h-5" /> Abrir conversa no WhatsApp
                  </a>
                </div>

              ) : (
                <>
                  {[
                    { id: "nome", label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
                    { id: "telefone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(63) 99999-9999" },
                    { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={`${f.id}-tri`} className="block text-[10px] tracking-[0.3em] uppercase text-gold mb-2">{f.label}</label>
                      <input
                        id={`${f.id}-tri`}
                        type={f.type}
                        required
                        maxLength={f.id === "telefone" ? 15 : 150}
                        placeholder={f.placeholder}
                        inputMode={f.id === "telefone" ? "numeric" : undefined}
                        value={form[f.id as keyof typeof form]}
                        onChange={(e) => {
                          const v = f.id === "telefone" ? maskPhone(e.target.value) : e.target.value;
                          setForm({ ...form, [f.id]: v });
                        }}
                        className="w-full bg-transparent border-b border-white/20 focus:border-gold py-2.5 text-stone-100 placeholder:text-stone-600 outline-none transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="mensagem-tri" className="block text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Relate brevemente o seu caso</label>
                    <textarea
                      id="mensagem-tri"
                      required
                      rows={4}
                      maxLength={1000}
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      className="w-full bg-transparent border border-white/15 focus:border-gold p-3 text-stone-100 placeholder:text-stone-600 outline-none transition-colors resize-none"
                      placeholder="Conte um pouco sobre a sua necessidade…"
                    />
                  </div>
                  {error && <p className="text-[12px] text-red-300">{error}</p>}
                  <button type="submit" disabled={sending} className="cta-pulse-gold w-full gold-gradient text-charcoal-deep font-medium py-3.5 text-sm tracking-[0.25em] uppercase hover:shadow-2xl hover:shadow-amber-900/40 transition-all disabled:opacity-60">
                    {sending ? "Abrindo WhatsApp…" : "Enviar pelo WhatsApp"}
                  </button>

                  <p className="text-[11px] text-stone-400 text-center leading-relaxed pt-1">
                    🔒 Dados protegidos sob sigilo profissional · LGPD
                  </p>
                </>
              )}
            </form>

            {/* Direct channels */}
            <aside className="lg:col-span-2 space-y-5">
              <a
                href={waLink(p.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
            onClick={() => trackWhatsApp("cta")}
                className="wa-pulse-cta relative flex items-center justify-center gap-3 text-charcoal-deep font-semibold px-6 py-4 text-xs tracking-[0.25em] uppercase shadow-2xl shadow-green-900/30"
                style={{ backgroundColor: "#25D366", color: "#0d2418" }}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="wa-pulse-label">Falar agora no WhatsApp</span>
                <ChevronRight size={16} />
              </a>
              <div className="p-6 border border-gold/20 space-y-4" style={{ backgroundColor: "rgba(20,20,20,0.85)" }}>
                <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("telefone")} className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <Phone size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">WhatsApp · Telefone</div>
                    <div className="text-stone-100 text-sm">+55 (63) 98447-4070</div>
                  </div>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <Mail size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">E-mail</div>
                    <div className="text-stone-100 text-sm">{EMAIL}</div>
                  </div>
                </a>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">Endereço</div>
                    <div className="text-stone-100 text-sm">Av. Guanabara, 1669 — Centro · Gurupi/TO</div>
                  </div>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-stone-300 hover:text-gold transition-colors pt-2">
                  <FaInstagram /> @gilsoncarvalho.adv
                </a>
              </div>
            </aside>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <Check size={14} className="text-gold" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-stone-400">Atendimento Presencial e Digital · Todo o Brasil</span>
          </div>
        </div>
      </section>

      {/* ONDE ESTAMOS */}
      <section className="relative py-20 lg:py-24" style={{ backgroundColor: "#1f1f1f" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Onde Estamos</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h3 className="font-serif-luxe text-3xl md:text-4xl text-stone-50">Escritório em Gurupi/TO</h3>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-stone-300 hover:text-gold transition-colors text-sm">
              <MapPin size={14} className="text-gold" /> Av. Guanabara, nº 1669, Centro — Gurupi/TO
            </a>
          </div>
          <div className="border border-gold/20 overflow-hidden shadow-2xl shadow-black/40">
            <iframe
              title="Localização do escritório — Av. Guanabara, 1669, Centro, Gurupi/TO"
              src={MAPS_EMBED}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER simplificado */}
      <footer className="relative pt-14 pb-8 border-t border-gold/20" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 items-start mb-10">
            <div>
              <img src={logo} alt="Gilson Carvalho" width={230} height={56} className="h-14 mb-4" loading="lazy" decoding="async" />
              <p className="text-xs tracking-[0.25em] uppercase text-gold mb-1">OAB/TO 2.591 · OAB/RJ 256.131</p>
              <p className="text-stone-400 text-sm">Direito de Família e Sucessões · Atendimento sigiloso.</p>
            </div>
            <div className="space-y-2 text-sm md:text-right">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block text-stone-300 hover:text-gold transition-colors">
                Av. Guanabara, nº 1669, Centro — Gurupi/TO
              </a>
              <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("telefone")} className="block text-stone-300 hover:text-gold transition-colors">
                +55 (63) 98447-4070
              </a>
              <a href={`mailto:${EMAIL}`} className="block text-stone-300 hover:text-gold transition-colors">
                {EMAIL}
              </a>
              <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("cta")} className="inline-flex items-center gap-2 text-gold hover:opacity-80 transition-opacity pt-1">
                <FaWhatsapp /> Falar no WhatsApp
              </a>
            </div>
          </div>
          <p className="text-xs text-stone-500 text-center pt-6 border-t border-white/5">© 2026 Gilson Carvalho — Advocacia. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-6 z-40 flex flex-col items-end gap-2">
        {waTipVisible && (
          <div
            key={waTipKey}
            className="wa-tooltip relative mr-1 px-4 py-2 border border-gold/40 text-[11px] tracking-[0.2em] uppercase text-stone-100 shadow-2xl"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <span className="text-gold">Agendar Consulta · Linha Direta</span>
            <span className="absolute -bottom-1 right-6 w-2 h-2 rotate-45 border-r border-b border-gold/40" style={{ backgroundColor: "#1a1a1a" }} />
          </div>
        )}
        <a
          href={waLink(p.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
            onClick={() => trackWhatsApp("cta")}
          aria-label="Falar no WhatsApp"
          className="wa-ping wa-pulse-cta relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl shadow-green-900/50 hover:scale-110 transition-transform"
          style={{ backgroundColor: "#25D366" }}
        >
          <FaWhatsapp className="w-9 h-9 text-white" />
        </a>
      </div>
    </div>
  );
}
