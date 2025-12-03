import type React from "react"
import type { Metadata } from "next"
import { inter, interTight } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zales Machine",
  description: "AI-powered revenue operations platform that automates sales, marketing, and growth processes for B2B companies.",
  generator: "ZalesMachine",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  other: {
    "format-detection": "telephone=no",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} font-body dark`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
