import ClientNavbar from "@/components/clientes/client-navbar"

interface ClientesLayoutProps {
  children: React.ReactNode
}

export default function ClientesLayout({ children }: ClientesLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <ClientNavbar/>
        {children}
    </div>
  )
}
