import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "VFS Global - Agendamento de Visto Cabo Verde para Portugal",
  description:
    "Plataforma oficial de agendamento de visto de Cabo Verde para Portugal. Agende o seu atendimento de forma rapida e segura.",
  icons: {
    icon: "/vfs-logo.png",
    apple: "/vfs-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
