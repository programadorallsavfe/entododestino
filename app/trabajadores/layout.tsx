"use client"

import TrabajadoresNavbar from "@/components/trabajadores/trabajadores-navbar"

interface TrabajadoresLayoutProps {
  children: React.ReactNode
}

export default function TrabajadoresLayout({ children }: TrabajadoresLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TrabajadoresNavbar />
      <div className="lg:ml-[var(--sidebar-width,16rem)] transition-all duration-300 ease-in-out">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}   