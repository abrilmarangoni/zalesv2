"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { interTight } from "@/lib/fonts"
import { Marquee } from "@/components/magicui/marquee"

interface Testimonial {
  id: string
  name: string
  username?: string
  body: string
  img: string
  role?: string
  company?: string
}

const TestimonialCard = ({
  img,
  name,
  username,
  body,
  role,
  company,
}: Testimonial) => {
  return (
    <div className={`relative w-full max-w-[280px] overflow-hidden rounded-xl border border-white/10 bg-black p-6 ${interTight.className}`}>
      <div className={`text-white/80 leading-relaxed font-extralight text-sm mb-4`}>{body || "Great product!"}</div>

      <div className="flex items-center gap-3">
        <img 
          src={img || "/placeholder.svg"} 
          alt={name} 
          className="h-8 w-8 rounded-full object-cover" 
        />
        <div className="flex flex-col">
          <div className={`leading-4 font-extralight tracking-tight text-white text-xs ${interTight.className}`}>
            {name}
          </div>
          {(role || company) && (
            <div className={`leading-4 tracking-tight text-white/50 font-extralight text-xs ${interTight.className}`}>
              {role && company ? `${role}, ${company}` : role || company || username}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Intentar obtener testimonios de Senja
    const fetchSenjaTestimonials = async () => {
      try {
        // Senja API endpoint - ajusta según tu widget ID
        const widgetId = "7120adc0-7e87-438f-bf7d-435059d4728c"
        const response = await fetch(`https://widget.senja.io/widget/${widgetId}/testimonials.json`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          // Transformar los datos de Senja al formato que necesitamos
          const formattedTestimonials = data.testimonials?.map((t: any) => ({
            id: t.id || Math.random().toString(),
            name: t.author?.name || "Anonymous",
            username: t.author?.username || t.author?.handle,
            body: t.body || t.content || "Great product!",
            img: t.author?.avatar || t.author?.photo || `https://i.pravatar.cc/150?u=${t.author?.name || Math.random()}`,
            role: t.author?.role || t.author?.title,
            company: t.author?.company || t.author?.company_name,
          })).filter((t: any) => t.body && t.body.trim() !== "") || []
          
          if (formattedTestimonials.length > 0) {
            setTestimonials(formattedTestimonials)
          } else {
            setTestimonials(getDefaultTestimonials())
          }
        } else {
          // Si la API falla, usar datos de ejemplo
          setTestimonials(getDefaultTestimonials())
        }
      } catch (error) {
        console.error("Error fetching Senja testimonials:", error)
        // Si falla, usar datos de ejemplo
        setTestimonials(getDefaultTestimonials())
      } finally {
        setLoading(false)
      }
    }

    fetchSenjaTestimonials()
  }, [])

  const getDefaultTestimonials = (): Testimonial[] => {
    return [
      {
        id: "1",
        name: "John Doe",
        username: "@johndoe",
        body: "ZalesMachine has transformed our sales process.",
        img: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "2",
        name: "Jane Smith",
        username: "@janesmith",
        body: "We've seen a 300% increase in qualified leads.",
        img: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "3",
        name: "Mike Johnson",
        username: "@mikejohnson",
        body: "Best investment we've made. ROI calculator was spot on.",
        img: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: "4",
        name: "Sarah Williams",
        username: "@sarahwilliams",
        body: "The outbound machine is a game changer.",
        img: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "5",
        name: "David Brown",
        username: "@davidbrown",
        body: "Our pipeline has never been healthier.",
        img: "https://i.pravatar.cc/150?img=13",
      },
      {
        id: "6",
        name: "Emily Davis",
        username: "@emilydavis",
        body: "The AI-powered content machine is revolutionary.",
        img: "https://i.pravatar.cc/150?img=10",
      },
      {
        id: "7",
        name: "Chris Wilson",
        username: "@chriswilson",
        body: "The system is intuitive and powerful.",
        img: "https://i.pravatar.cc/150?img=14",
      },
      {
        id: "8",
        name: "Lisa Anderson",
        username: "@lisanderson",
        body: "ZalesMachine's framework is exactly what we needed.",
        img: "https://i.pravatar.cc/150?img=47",
      },
      {
        id: "9",
        name: "Robert Taylor",
        username: "@roberttaylor",
        body: "The automation capabilities are outstanding.",
        img: "https://i.pravatar.cc/150?img=15",
      },
    ]
  }

  if (loading) {
  return (
      <section id="testimonials" className="mb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-[540px]">
            <h2 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px] relative z-10`}>
              {t("testimonials.title")}
            </h2>
            <p className={`mt-5 relative z-10 text-center text-lg text-zinc-500 ${interTight.className} font-extralight`}>
              {t("testimonials.description")}
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Asegurar que siempre tengamos testimonios
  const safeTestimonials = testimonials.length > 0 ? testimonials : getDefaultTestimonials()
  
  const firstColumn = safeTestimonials.slice(0, Math.ceil(safeTestimonials.length / 3))
  const secondColumn = safeTestimonials.slice(Math.ceil(safeTestimonials.length / 3), Math.ceil(safeTestimonials.length * 2 / 3))
  const thirdColumn = safeTestimonials.slice(Math.ceil(safeTestimonials.length * 2 / 3))

  return (
    <section id="testimonials" className="mb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[540px]">
          <h2 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px] relative z-10`}>
            {t("testimonials.title")}
          </h2>

          <p className={`mt-5 relative z-10 text-center text-lg text-zinc-500 ${interTight.className} font-extralight`}>
            {t("testimonials.description")}
          </p>
        </div>

        <div className="my-12 flex max-h-[500px] justify-center gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          {firstColumn.length > 0 && (
            <div>
              <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </Marquee>
            </div>
          )}

          {secondColumn.length > 0 && (
            <div className="hidden md:block">
              <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
                {secondColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </Marquee>
            </div>
          )}

          {thirdColumn.length > 0 && (
            <div className="hidden lg:block">
              <Marquee pauseOnHover vertical className="[--duration:30s]">
                {thirdColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
