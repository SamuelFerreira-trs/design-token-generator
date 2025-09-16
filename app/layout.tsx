import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Design Token Generator",
  description: "Generate and manage design tokens for your projects",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="space-y-2 text-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-muted-foreground">Carregando...</p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
