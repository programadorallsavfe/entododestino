import AdministradoresNavbar from "@/components/administradores/administradores-navbar";
import TrabajadoresNavbar from "@/components/trabajadores/trabajadores-navbar";

export default function AdministradoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar superior */}
      <AdministradoresNavbar />
      
      {/* Contenedor principal con transición */}
      <div className="flex-1 lg:ml-[var(--sidebar-width,16rem)] transition-all duration-300 ease-in-out">
        {/* Contenedor del contenido principal */}
        <main className="flex-1 w-full">
          {/* Wrapper del contenido para mejor estructura */}
          <div className="min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}   