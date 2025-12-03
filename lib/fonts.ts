import { Inter, Inter_Tight } from "next/font/google"

// Inter Tight 200 (Extra Light) - Para títulos (H1-H6)
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "200",
  variable: "--font-heading",
  display: "swap",
})

// Inter 400 (Regular) - Para textos (body, párrafos, botones, descripciones)
export const inter = Inter({
  subsets: ["latin"],
      weight: "400",
  variable: "--font-body",
  display: "swap",
})
