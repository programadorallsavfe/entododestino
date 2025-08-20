import { FiltrarReservas } from "./components/filtrar-reservas";
import { FiltrarViajes } from "./components/filtrar-viajes.";
import { FooterHome } from "./components/footer-home";

export default function Clientes() {
  return (
    <div className="flex flex-col gap-4">
      <FiltrarReservas />
      <FiltrarViajes/>
      <FooterHome/>
    </div>
   
  )
}