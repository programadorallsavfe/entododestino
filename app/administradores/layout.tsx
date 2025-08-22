import AdministradoresNavbar from "@/components/administradores/administradores-navbar";
import TrabajadoresNavbar from "@/components/trabajadores/trabajadores-navbar";

export default function AdministradoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
    <AdministradoresNavbar />
    <div className="lg:ml-[var(--sidebar-width,16rem)] transition-all duration-300 ease-in-out">
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  </div>
)
}   