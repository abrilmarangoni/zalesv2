"use client"

import { createContext, useContext, ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, { en: string; es: string }> = {
  // Header
  "nav.features": { en: "Features", es: "Características" },
  "nav.pricing": { en: "Pricing", es: "Precios" },
  "nav.testimonials": { en: "Testimonials", es: "Testimonios" },
  "nav.faq": { en: "FAQ", es: "Preguntas Frecuentes" },
  "nav.team": { en: "Team", es: "Equipo" },
  "nav.contact": { en: "Contact Us", es: "Contáctanos" },
  
  // Hero
  "hero.title": { en: "We turn your company into a", es: "Convertimos tu empresa en una" },
  "hero.description1": { en: "For B2B companies aiming to implement AI and automation in sales, marketing, or growth:", es: "Para empresas B2B que buscan implementar IA + AUTOMATIZACIÓN en sus procesos de ventas, marketing o crecimiento." },
  "hero.description2": { en: "We use our proven ZalesMachine System — a framework that has booked 1,000+ calls and generated over $1M in pipeline for our clients.", es: "Hemos desarrollado un framework probado llamado Sistema ZalesMachine, a través del cual hemos agendado más de 1,000 llamadas y generado más de $1M en pipeline para nuestros clientes." },
  "hero.schedule": { en: "Book a call", es: "Reservar una llamada" },
  "hero.clients.title": { en: "Our clients", es: "Nuestros clientes" },
  
  // Features
  "features.title": { en: "Solutions", es: "Soluciones" },
  "features.globally.title": { en: "Globally Usable", es: "Disponible Globalmente" },
  "features.globally.description": { en: "We work globally, serving clients across multiple countries and regions. Our proven system delivers results regardless of location.", es: "Trabajamos globalmente, atendiendo clientes en múltiples países y regiones. Nuestro sistema probado entrega resultados sin importar la ubicación." },
  
  // Pricing
  "pricing.title": { en: "Pricing", es: "Precios" },
  "pricing.subtitle": { en: "Choose your transformation path", es: "Elige tu camino de transformación" },
  "pricing.description": { en: "Three different approaches to scaling your sales operations", es: "Tres enfoques diferentes para escalar tus operaciones de ventas" },
  "pricing.inhouse.name": { en: "In-House", es: "Interno" },
  "pricing.inhouse.description": { en: "Best for teams that want 100% ownership of their GTM processes", es: "Ideal para equipos que quieren 100% de propiedad de sus procesos GTM" },
  "pricing.inhouse.approach": { en: "You get all our know-how and experience, implemented in a system that works", es: "Obtienes todo nuestro conocimiento y experiencia, implementado en un sistema que funciona" },
  "pricing.inhouse.cta": { en: "Learn More", es: "Saber Más" },
  "pricing.agency.name": { en: "Agency", es: "Agencia" },
  "pricing.agency.description": { en: "Best for teams that want more qualified leads with no extra effort", es: "Ideal para equipos que quieren más leads calificados sin esfuerzo adicional" },
  "pricing.agency.approach": { en: "We take care of the whole process; you just join the call.", es: "Nos encargamos de todo el proceso; tú solo únete a la llamada." },
  "pricing.agency.cta": { en: "Learn More", es: "Saber Más" },
  "pricing.custom.name": { en: "Custom", es: "Personalizado" },
  "pricing.custom.description": { en: "Best for sales, marketing and growth teams stuck doing repetitive, manual work", es: "Ideal para equipos de ventas, marketing y crecimiento atascados haciendo trabajo repetitivo y manual" },
  "pricing.custom.approach": { en: "Free part of your team from ops to focus on real value — and hit this quarter's goals.", es: "Libera a parte de tu equipo de operaciones para enfocarse en valor real — y alcanza los objetivos de este trimestre." },
  "pricing.custom.cta": { en: "Learn More", es: "Saber Más" },
  
  // FAQ
  "faq.title": { en: "Questions? We've got", es: "¿Preguntas? Tenemos" },
  "faq.answers": { en: "answers", es: "respuestas" },
  "faq.q1": { en: "What is ZalesMachine exactly?", es: "¿Qué es ZalesMachine exactamente?" },
  "faq.a1": { en: "ZalesMachine is a comprehensive revenue operations platform that combines AI-powered agents, outbound automation, and content generation to transform your sales, marketing, and growth processes. It's designed to help B2B companies automate end-to-end operations and scale revenue efficiently.", es: "ZalesMachine es una plataforma integral de operaciones de ingresos que combina agentes impulsados por IA, automatización de salida y generación de contenido para transformar tus procesos de ventas, marketing y crecimiento. Está diseñada para ayudar a las empresas B2B a automatizar operaciones de extremo a extremo y escalar ingresos de manera eficiente." },
  "faq.q2": { en: "How quickly can I see results?", es: "¿Qué tan rápido puedo ver resultados?" },
  "faq.a2": { en: "Most clients see measurable results within the first 30-60 days. Our proven framework has booked over 1,000 calls and generated more than $1M in pipeline for clients. The exact timeline depends on your specific use case and implementation scope.", es: "La mayoría de los clientes ven resultados medibles en los primeros 30-60 días. Nuestro framework probado ha agendado más de 1,000 llamadas y generado más de $1M en pipeline para clientes. El tiempo exacto depende de tu caso de uso específico y el alcance de la implementación." },
  "faq.q3": { en: "Can I customize the AI agents?", es: "¿Puedo personalizar los agentes de IA?" },
  "faq.a3": { en: "Yes! All our AI RevOps Agents are fully customizable to match your specific workflows, CRM structure, and business processes. We work with you to configure agents that align perfectly with your operations.", es: "¡Sí! Todos nuestros Agentes AI RevOps son completamente personalizables para adaptarse a tus flujos de trabajo específicos, estructura CRM y procesos comerciales. Trabajamos contigo para configurar agentes que se alineen perfectamente con tus operaciones." },
  "faq.q4": { en: "What CRM systems do you integrate with?", es: "¿Con qué sistemas CRM se integran?" },
  "faq.a4": { en: "Our platform integrates seamlessly with major CRM systems including Salesforce, HubSpot, Pipedrive, and more. We provide CRM workflows, sync capabilities, and enrichment features that work across platforms.", es: "Nuestra plataforma se integra perfectamente con los principales sistemas CRM incluyendo Salesforce, HubSpot, Pipedrive y más. Proporcionamos flujos de trabajo CRM, capacidades de sincronización y funciones de enriquecimiento que funcionan en todas las plataformas." },
  "faq.q5": { en: "How do I get started?", es: "¿Cómo empiezo?" },
  "faq.a5": { en: "Simply schedule a call with our team. We'll discuss your specific needs, show you how the ZalesMachine System can transform your operations, and provide a customized implementation plan tailored to your business.", es: "Simplemente agenda una llamada con nuestro equipo. Discutiremos tus necesidades específicas, te mostraremos cómo el Sistema ZalesMachine puede transformar tus operaciones y proporcionaremos un plan de implementación personalizado adaptado a tu negocio." },
  
  // Footer
  "footer.contact": { en: "Contact", es: "Contacto" },
  "footer.home": { en: "Home", es: "Inicio" },
  
  // Features
  "features.ai.title": { en: "AI RevOps Agents", es: "Agentes AI RevOps" },
  "features.ai.description1": { en: "Sophisticated AI Agents that capture insights, update the CRM, route leads instantly, trigger next steps, and escalate exceptions—end to end.", es: "Agentes de IA sofisticados que capturan insights, actualizan el CRM, enrutan leads instantáneamente, activan los siguientes pasos y escalan excepciones—de extremo a extremo." },
  "features.ai.description2": { en: "Outcomes: Faster speed-to-lead, a cleaner CRM, consistent follow-up, fewer manual hours per rep, and a more reliable pipeline.", es: "Resultados: Velocidad más rápida hacia el lead, un CRM más limpio, seguimiento consistente, menos horas manuales por representante y un pipeline más confiable." },
  "features.content.title": { en: "Content Machine", es: "Máquina de Contenido" },
  "features.content.description": { en: "A ZalesMachine-built platform that transforms call transcripts, technical YouTube videos, Reddit threads, and podcasts into high-quality technical posts that position you as the go-to authority in your niche.", es: "Una plataforma construida por ZalesMachine que transforma transcripciones de llamadas, videos técnicos de YouTube, hilos de Reddit y podcasts en publicaciones técnicas de alta calidad que te posicionan como la autoridad en tu nicho." },
  "features.outbound.title": { en: "Outbound Machine", es: "Máquina de Salida" },
  "features.outbound.description": { en: "A proven-system created by ZalesMachine that automates prospecting end-to-end — from ICP definition and TAM build to enrichment, multichannel outreach, and booked calls.", es: "Un sistema probado creado por ZalesMachine que automatiza la prospección de extremo a extremo — desde la definición de ICP y construcción de TAM hasta enriquecimiento, alcance multicanal y llamadas agendadas." },
  
  // Pricing Features
  "pricing.inhouse.feature1": { en: "New Company Asset", es: "Nuevo Activo de la Empresa" },
  "pricing.inhouse.feature2": { en: "You acquire the ZalesMachine System", es: "Adquieres el Sistema ZalesMachine" },
  "pricing.inhouse.feature3": { en: "Same Capabilities", es: "Mismas Capacidades" },
  "pricing.inhouse.feature4": { en: "As Agency model, delivered in-house", es: "Como el modelo de Agencia, entregado internamente" },
  "pricing.inhouse.feature5": { en: "3-Month Implementation", es: "Implementación de 3 Meses" },
  "pricing.inhouse.feature6": { en: "Complete setup and training", es: "Configuración y capacitación completa" },
  "pricing.inhouse.feature7": { en: "Team Training", es: "Capacitación del Equipo" },
  "pricing.inhouse.feature8": { en: "In-house team training included", es: "Capacitación del equipo interno incluida" },
  "pricing.agency.feature1": { en: "Cold Email Infrastructure", es: "Infraestructura de Email Frío" },
  "pricing.agency.feature2": { en: "Complete email setup and automation", es: "Configuración y automatización completa de email" },
  "pricing.agency.feature3": { en: "Outbound Machine", es: "Máquina de Salida" },
  "pricing.agency.feature4": { en: "Automated lead generation system", es: "Sistema automatizado de generación de leads" },
  "pricing.agency.feature5": { en: "Content Machine", es: "Máquina de Contenido" },
  "pricing.agency.feature6": { en: "30-40 ready-to-post LinkedIn posts", es: "30-40 publicaciones de LinkedIn listas para publicar" },
  "pricing.agency.feature7": { en: "Software Included", es: "Software Incluido" },
  "pricing.agency.feature8": { en: "$1,500+ in tools (Clay, Trigify, etc.)", es: "$1,500+ en herramientas (Clay, Trigify, etc.)" },
  "pricing.custom.feature1": { en: "AI + automation solutions", es: "Soluciones de IA + automatización" },
  "pricing.custom.feature2": { en: "AI Lead-Qualification Bot", es: "Bot de Calificación de Leads con IA" },
  "pricing.custom.feature3": { en: "WhatsApp agent that auto-qualifies leads", es: "Agente de WhatsApp que califica leads automáticamente" },
  "pricing.custom.feature4": { en: "Post-Meeting Workflow", es: "Flujo de Trabajo Post-Reunión" },
  "pricing.custom.feature5": { en: "CRM-driven flows with smart analysis", es: "Flujos impulsados por CRM con análisis inteligente" },
  "pricing.custom.feature6": { en: "Database Enrichment", es: "Enriquecimiento de Base de Datos" },
  "pricing.custom.feature7": { en: "Custom system to enrich existing databases", es: "Sistema personalizado para enriquecer bases de datos existentes" },
  "pricing.custom.feature8": { en: "Meeting Intelligence", es: "Inteligencia de Reuniones" },
  "pricing.custom.feature9": { en: "Notetaker integration for call analysis", es: "Integración de tomador de notas para análisis de llamadas" },
  "pricing.popular": { en: "⚡ Most Popular", es: "⚡ Más Popular" },
  "pricing.setup": { en: "setup", es: "configuración" },
  "pricing.month": { en: "/month", es: "/mes" },
  "pricing.months": { en: "months", es: "meses" },
  "pricing.forMonths": { en: "for {months} months", es: "por {months} meses" },
  "pricing.approach": { en: "Approach", es: "Enfoque" },
  
  // Video Section
  "video.title": { en: "We have built the ZalesMachine System — and it actually works.", es: "Hemos construido el Sistema ZalesMachine — y realmente funciona." },
  "video.description": { en: "We created a system that combines an Outbound Machine and a Content Machine, powered by AI and automation — to deliver leads on autopilot, predictably and consistently.", es: "Creamos un sistema que combina una Máquina de Salida y una Máquina de Contenido, impulsado por IA y automatización — para entregar leads en piloto automático, de manera predecible y consistente." },
  "video.solutionsAction": { en: "Our Solutions in Action", es: "Nuestras Soluciones en Acción" },
  "video.seeHow": { en: "See how we integrate AI, automation and sales tools to create personalized solutions", es: "Descubre cómo integramos IA, automatización y herramientas de ventas para crear soluciones personalizadas" },
  "video.watchYouTube": { en: "Watch on YouTube", es: "Ver en YouTube" },
  
  // Testimonials
  "testimonials.title": { en: "What our users say", es: "Lo que dicen nuestros usuarios" },
  "testimonials.description": { en: "From intuitive design to powerful features, our app has become an essential tool for users around the world.", es: "Desde un diseño intuitivo hasta funciones poderosas, nuestra aplicación se ha convertido en una herramienta esencial para usuarios de todo el mundo." },
  
  // New Release Promo
  "promo.title": { en: "Automate. Transform. Scale Revenue.", es: "Automatiza. Transforma. Escala Ingresos." },
  "promo.description": { en: "Built to deliver predictable results on autopilot.", es: "Construido para entregar resultados predecibles en piloto automático." },
  "promo.cta": { en: "Get started", es: "Comenzar" },
  
  // ROI Calculator
  "roi.title": { en: "Calculate Your ROI", es: "Calcula tu ROI" },
  "roi.description": { en: "See how the ZalesMachine System can transform your revenue operations", es: "Ve cómo el Sistema ZalesMachine puede transformar tus operaciones de ingresos" },
  "roi.metrics": { en: "Your Current Metrics", es: "Tus Métricas Actuales" },
  "roi.monthlyRevenue": { en: "Monthly Revenue Target", es: "Objetivo de Ingresos Mensuales" },
  "roi.conversionRate": { en: "Conversion Rate (%)", es: "Tasa de Conversión (%)" },
  "roi.dealSize": { en: "Average Deal Size", es: "Tamaño Promedio de Venta" },
  "roi.costPerLead": { en: "Cost Per Lead", es: "Costo por Lead" },
  "roi.results": { en: "Your Results", es: "Tus Resultados" },
  "roi.leadsNeeded": { en: "Leads Needed", es: "Leads Necesarios" },
  "roi.qualifiedLeads": { en: "Qualified Leads Needed", es: "Leads Calificados Necesarios" },
  "roi.monthlyCost": { en: "Monthly Cost", es: "Costo Mensual" },
  "roi.annualCost": { en: "Annual Cost", es: "Costo Anual" },
  "roi.annualRevenue": { en: "Annual Revenue", es: "Ingresos Anuales" },
  "roi.roi": { en: "ROI", es: "ROI" },
  "roi.roiMultiplier": { en: "ROI Multiplier", es: "Multiplicador de ROI" },
  "roi.investmentReturn": { en: "Every $1 invested returns", es: "Cada $1 invertido retorna" },
  
  // Problems / Outbound Fails
  "problems.anatomy-failed": { en: "The anatomy of failed outreach", es: "La anatomía del outreach fallido" },
  "problems.generic-template": { en: "Generic template", es: "Plantilla genérica" },
  "problems.vague-value": { en: "Vague value", es: "Valor vago" },
  "problems.pushy-cta": { en: "Pushy CTA", es: "CTA agresivo" },
  "problems.no-social-proof": { en: "No social proof", es: "Sin prueba social" },
  "problems.typical-cold-email": { en: "Typical Cold Email", es: "Email Frío Típico" },
  "problems.gets-deleted": { en: "The kind that gets deleted", es: "El tipo que se elimina" },
  "problems.generic-opening": { en: "GENERIC OPENING", es: "APERTURA GENÉRICA" },
  "problems.generic-opening-text": { en: "\"Hi [First Name], I hope this email finds you well...\"", es: "\"Hola [Nombre], espero que este email te encuentre bien...\"" },
  "problems.vague-value-prop": { en: "VAGUE VALUE PROPOSITION", es: "PROPUESTA DE VALOR VAGA" },
  "problems.vague-value-text": { en: "\"We help companies like yours increase efficiency...\"", es: "\"Ayudamos a empresas como la tuya a aumentar la eficiencia...\"" },
  "problems.pushy-cta-title": { en: "PUSHY CALL-TO-ACTION", es: "LLAMADO A LA ACCIÓN AGRESIVO" },
  "problems.pushy-cta-text": { en: "\"Can we schedule a quick 15-minute call this week?\"", es: "\"¿Podemos agendar una llamada rápida de 15 minutos esta semana?\"" },
  "problems.no-credibility": { en: "NO CREDIBILITY", es: "SIN CREDIBILIDAD" },
  "problems.no-credibility-text": { en: "\"Trust me, you'll find this valuable...\"", es: "\"Confía en mí, encontrarás esto valioso...\"" },
  "problems.response-rate": { en: "Response Rate", es: "Tasa de Respuesta" },
  "problems.conversion": { en: "Conversion", es: "Conversión" },
  "problems.deleted": { en: "Deleted", es: "Eliminados" },
  "problems.avoid-mistakes": { en: "Avoid these mistakes and see how we approach outbound differently.", es: "Evita estos errores y descubre cómo abordamos el outbound de manera diferente." },
  "problems.see-approach": { en: "See Our Approach", es: "Ver Nuestro Enfoque" },
  
  // Email Generator Section
  "email.title": { en: "Why Most Outbounds Fail?", es: "¿Por qué fallan la mayoría de los outbounds?" },
  "email.subtitle": { en: "The anatomy of failed outreach", es: "La anatomía del outreach fallido" },
  "email.failedColdEmail": { en: "Failed Cold Email", es: "Email Frío Fallido" },
  "email.highPerformingTitle": { en: "What a High-Performing Outbound Looks Like", es: "Cómo se ve un Outbound de Alto Rendimiento" },
  "email.highPerformingEmail": { en: "High-Performing Email", es: "Email de Alto Rendimiento" },
  "email.outputExample": { en: "Output Example - Email", es: "Ejemplo de Salida - Email" },
  "email.personalizedVariables": { en: "Personalized variables", es: "Variables personalizadas" },
  "email.placeholder.firstName": { en: "{FirstName}", es: "{Nombre}" },
  "email.placeholder.leadSignal": { en: "{Lead-level signal or activity}", es: "{Señal o actividad del lead}" },
  "email.placeholder.compliment": { en: "{1-3 word compliment}", es: "{Elogio de 1-3 palabras}" },
  "email.placeholder.companyThing": { en: "{Specific thing of their company}", es: "{Algo específico de su empresa}" },
  "email.placeholder.valueProp": { en: "{Value proposition mapping}", es: "{Mapeo de propuesta de valor}" },
  "email.placeholder.outcome": { en: "{Outcome}", es: "{Resultado}" },
  "email.genericTemplates": { en: "— Generic templates that feel robotic", es: "— Plantillas genéricas que se sienten robóticas" },
  "email.vagueValue": { en: "— Vague value propositions that don't resonate", es: "— Propuestas de valor vagas que no resuenan" },
  "email.pushyCTA": { en: "— Pushy CTAs that trigger instant delete", es: "— CTAs agresivos que provocan eliminación instantánea" },
  "email.noSocialProof": { en: "— No social proof or credibility signals", es: "— Sin prueba social o señales de credibilidad" },
  "email.howWeSolve": { en: "How we solve it?", es: "¿Cómo lo resolvemos?" },
  "email.subject": { en: "Subject: Typical Cold Email, The kind that gets deleted", es: "Asunto: Email Frío Típico, El tipo que se elimina" },
  "email.genericOpening": { en: "GENERIC OPENING", es: "APERTURA GENÉRICA" },
  "email.genericOpeningText": { en: "\"Hi [First Name], I hope this email finds you well...\"", es: "\"Hola [Nombre], espero que este email te encuentre bien...\"" },
  "email.vagueValueProp": { en: "VAGUE VALUE PROPOSITION", es: "PROPUESTA DE VALOR VAGA" },
  "email.vagueValueText": { en: "\"We help companies like yours increase efficiency...\"", es: "\"Ayudamos a empresas como la tuya a aumentar la eficiencia...\"" },
  "email.pushyCTATitle": { en: "PUSHY CALL-TO-ACTION", es: "LLAMADO A LA ACCIÓN AGRESIVO" },
  "email.pushyCTAText": { en: "\"Can we schedule a quick 15-minute call this week?\"", es: "\"¿Podemos agendar una llamada rápida de 15 minutos esta semana?\"" },
  "email.noCredibility": { en: "NO CREDIBILITY", es: "SIN CREDIBILIDAD" },
  "email.noCredibilityText": { en: "\"Trust me, you'll find this valuable...\"", es: "\"Confía en mí, encontrarás esto valioso...\"" },
  "email.responseRate": { en: "Response Rate", es: "Tasa de Respuesta" },
  "email.conversion": { en: "Conversion", es: "Conversión" },
  "email.deleted": { en: "Deleted", es: "Eliminados" },
  "email.successSubject": { en: "Subject: The kind that actually generates sales", es: "Asunto: El tipo que realmente genera ventas" },
  "email.meetingsBooked": { en: "Meetings Booked", es: "Reuniones agendadas" },
  "email.outputGreeting": { en: "Hi [Nico]", es: "Hola [Nico]" },
  "email.outputHighlight1": { en: "I saw that [you reached 4.2M ARR - congratulations on that milestone!!]", es: "Vi que [alcanzaron 4.2M ARR - felicitaciones por ese hito!!]" },
  "email.outputAttention": { en: "Something caught my attention: [you're scaling operations with a small recruiting team].", es: "Me llamó la atención algo: [están escalando operaciones con un equipo de recruiting de pocas personas]." },
  "email.outputThinking": { en: "This made me think - [if we could help you hire LATAM professionals 2x faster, those 6 roles you're looking for you could close in weeks instead of months].", es: "Esto me hizo pensar - [si pudiéramos ayudarte a contratar profesionales de LATAM 2x más rápido, esos 6 roles que están buscando los podrías cerrar en semanas en lugar de meses]." },
  "email.outputClosing": { en: "Does it make sense to explore how we could accelerate that process for you?", es: "Tiene sentido explorar cómo podríamos acelerarte ese proceso?" },
  
  // Full Stack AI Solutions
  "fullstack.title": { en: "What we developed", es: "Lo que desarrollamos" },
  "fullstack.subtitle": { en: "Three automated frameworks to scale your outbound", es: "Tres frameworks automatizados para escalar tu outbound" },
  "fullstack.developingGraph": { en: "developing graph", es: "gráfico en desarrollo" },
  "fullstack.meetTeam": { en: "Meet our team", es: "Conoce nuestro equipo" },
  "fullstack.bookCall": { en: "Book a call", es: "Reservar una llamada" },
  "fullstack.warm.title": { en: "Warm Outbound:", es: "Outbound Cálido:" },
  "fullstack.warm.description": { en: "Prospects interact with your Social Media Content. Based on that, we developed a framework that allows you to scrape all the personal information and run email + LinkedIn campaigns automatically", es: "Los prospectos interactúan con tu Contenido de Redes Sociales. Basado en eso, desarrollamos un framework que te permite extraer toda la información personal y ejecutar campañas de email + LinkedIn automáticamente" },
  "fullstack.intent.title": { en: "Intent–Event Outbound:", es: "Outbound de Intención–Evento:" },
  "fullstack.intent.description": { en: "Prospects attend or sponsor an event. We have developed a system that allows you to gather all the information related to the event and automate campaigns to reach all the sponsors, speakers, and attendees of the event.", es: "Los prospectos asisten o patrocinan un evento. Hemos desarrollado un sistema que te permite recopilar toda la información relacionada con el evento y automatizar campañas para llegar a todos los patrocinadores, oradores y asistentes del evento." },
  "fullstack.cold.title": { en: "Cold Outbound:", es: "Outbound Frío:" },
  "fullstack.cold.description": { en: "Prospects will be reached based on ICP, Buyer Persona, Industry, Company Size, etc. We developed the strategy for how to acquire leads that are relevant to your value proposition, and we set up automated LinkedIn + email campaigns", es: "Los prospectos serán contactados basándose en ICP, Buyer Persona, Industria, Tamaño de Empresa, etc. Desarrollamos la estrategia para adquirir leads relevantes para tu propuesta de valor y configuramos campañas automatizadas de LinkedIn + email" },
  
  // Hero
  "hero.learnMore": { en: "Learn more", es: "Saber más" },
  
  // Team Page
  "team.title": { en: "Our Team", es: "Nuestro Equipo" },
  "team.subtitle": { en: "Meet the founders behind ZalesMachine", es: "Conoce a los fundadores detrás de ZalesMachine" },
}

export function LanguageProvider({ children, language, setLanguage }: { children: ReactNode; language: Language; setLanguage: (lang: Language) => void }) {
  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

