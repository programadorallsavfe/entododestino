"use client";

import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  User, 
  Building,
  X,
  FileText,
  CheckCircle,
  Download,
  MessageCircle,
  Printer,
  Mail,
  Link,
  ArrowLeft,
  ArrowRight,
  Clipboard
} from "lucide-react";

// Importar componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Importar componentes de cotización
import { DatosClienteCotizacion } from "./datos-cliente-cotizacion";

interface ReservationData {
  item: any;
  selectedDate: string;
  price: number;
  searchParams: any;
  timestamp: string;
}

interface DetallesCotizacionProps {
  reservationData: ReservationData;
  onClose: () => void;
}

export const DetallesCotizacion = ({ reservationData, onClose }: DetallesCotizacionProps) => {
  const [currentStep, setCurrentStep] = useState<'resumen' | 'datos-cliente' | 'confirmacion' | 'exportacion'>('resumen');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Hotel';
      case 'flight': return 'Vuelo';
      case 'package': return 'Paquete';
      default: return 'Servicio';
    }
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <Building className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'flight': return <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'package': return <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />;
      default: return <FileText className="w-6 h-6 sm:w-8 sm:h-8" />;
    }
  };

  const renderResumen = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Header de la Reserva */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Resumen de tu Reserva
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Revisa los detalles antes de continuar
        </p>
      </div>

      {/* Información del Item Seleccionado */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-xl text-blue-600">
                {getItemTypeIcon(reservationData.item.type)}
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl text-blue-900 break-words">
                  {reservationData.item.name || reservationData.item.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-blue-700 break-words">
                  {getItemTypeLabel(reservationData.item.type)} • {reservationData.item.location || `${reservationData.item.origin} → ${reservationData.item.destination}`}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm self-start sm:self-center">
              {getItemTypeLabel(reservationData.item.type)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="text-xs sm:text-sm text-blue-600 font-medium">Fecha Seleccionada</div>
              <div className="text-base sm:text-lg font-bold text-blue-900 leading-tight">
                {formatDate(reservationData.selectedDate)}
              </div>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-xs sm:text-sm text-green-600 font-medium">Precio</div>
              <div className="text-base sm:text-lg font-bold text-green-600">
                {formatPrice(reservationData.price)}
              </div>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-blue-200 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="text-xs sm:text-sm text-purple-600 font-medium">Reservado el</div>
              <div className="text-base sm:text-lg font-bold text-purple-600">
                {new Date(reservationData.timestamp).toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalles del Item */}
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            Detalles del Servicio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {reservationData.item.description && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2 text-sm sm:text-base">Descripción</h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{reservationData.item.description}</p>
            </div>
          )}
          
          {reservationData.item.amenities && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2 text-sm sm:text-base">Amenities Incluidas</h4>
              <div className="flex flex-wrap gap-2">
                {reservationData.item.amenities.map((amenity: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {reservationData.item.includes && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2 text-sm sm:text-base">Incluye</h4>
              <div className="flex flex-wrap gap-2">
                {reservationData.item.includes.map((item: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 px-4 sm:px-0">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="w-full sm:w-auto px-4 sm:px-6 order-2 sm:order-1"
        >
          Cancelar
        </Button>
        <Button 
          onClick={() => setCurrentStep('datos-cliente')}
          className="w-full sm:w-auto px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 order-1 sm:order-2"
        >
          <span className="hidden sm:inline">Continuar con Datos del Cliente</span>
          <span className="sm:hidden">Continuar</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDatosCliente = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-0">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Datos del Cliente
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Complete la información personal para generar la cotización
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentStep('resumen')}
          className="self-start sm:self-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Volver al Resumen</span>
          <span className="sm:hidden">Volver</span>
        </Button>
      </div>
      
      <DatosClienteCotizacion onComplete={() => setCurrentStep('exportacion')} />
      
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 px-4 sm:px-0">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('resumen')}
          className="w-full sm:w-auto px-4 sm:px-6 order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <Button 
          onClick={() => setCurrentStep('confirmacion')}
          className="w-full sm:w-auto px-4 sm:px-6 bg-green-600 hover:bg-green-700 order-1 sm:order-2"
        >
          Generar Cotización
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderConfirmacion = () => (
    <div className="space-y-6 sm:space-y-8 text-center px-4 sm:px-0">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 sm:p-4 bg-green-100 rounded-full">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
        ¡Cotización Generada Exitosamente!
      </h2>
      
      <p className="text-base sm:text-lg text-slate-600">
        Tu cotización ha sido creada y está lista para revisión.
      </p>
      
      <Card className="max-w-sm sm:max-w-md mx-auto">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-slate-600">Número de Cotización:</span>
              <span className="font-bold">COT-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-slate-600">Estado:</span>
              <Badge className="bg-green-100 text-green-800 text-xs">Pendiente de Aprobación</Badge>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-slate-600">Fecha de Creación:</span>
              <span className="font-medium">{new Date().toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('exportacion')}
          className="w-full sm:w-auto px-4 sm:px-6 order-2 sm:order-1"
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button 
          onClick={() => window.print()}
          className="w-full sm:w-auto px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 order-1 sm:order-2"
        >
          <Printer className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Imprimir Cotización</span>
          <span className="sm:hidden">Imprimir</span>
        </Button>
      </div>
    </div>
  );

  const renderExportacion = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Header de Exportación */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Exportar y Compartir Cotización
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Elige cómo quieres compartir tu cotización
        </p>
      </div>

      {/* Resumen de la Cotización */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="pb-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-green-100 rounded-xl text-green-600">
                <Clipboard className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl text-green-900 break-words">
                  Cotización COT-{Date.now().toString().slice(-6)}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-green-700 break-words">
                  {getItemTypeLabel(reservationData.item.type)} • {reservationData.item.name || reservationData.item.title}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm bg-green-100 text-green-800 self-start sm:self-center">
              Completada
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-xs sm:text-sm text-green-600 font-medium">Fecha del Viaje</div>
              <div className="text-base sm:text-lg font-bold text-green-900 leading-tight">
                {formatDate(reservationData.selectedDate)}
              </div>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-xs sm:text-sm text-green-600 font-medium">Precio Total</div>
              <div className="text-base sm:text-lg font-bold text-green-600">
                {formatPrice(reservationData.price)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opciones de Exportación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Exportar PDF */}
        <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="p-3 sm:p-4 bg-blue-100 rounded-full w-fit mx-auto mb-3 sm:mb-4">
              <Download className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Exportar PDF</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
              Descarga tu cotización en formato PDF para imprimir o compartir
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
              onClick={() => {
                console.log("Generando PDF...");
                alert("PDF generado exitosamente. Descargando...");
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Generar y Descargar PDF</span>
              <span className="sm:hidden">Descargar PDF</span>
            </Button>
          </CardContent>
        </Card>

        {/* Enviar por WhatsApp */}
        <Card className="border-2 border-green-200 hover:border-green-300 transition-colors duration-200 cursor-pointer">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="p-3 sm:p-4 bg-green-100 rounded-full w-fit mx-auto mb-3 sm:mb-4">
              <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Enviar por WhatsApp</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
              Comparte tu cotización directamente por WhatsApp
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base"
              onClick={() => {
                const message = `Hola! Aquí tienes tu cotización:\n\n${reservationData.item.name || reservationData.item.title}\nFecha: ${formatDate(reservationData.selectedDate)}\nPrecio: ${formatPrice(reservationData.price)}\n\nNúmero de cotización: COT-${Date.now().toString().slice(-6)}`;
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Enviar por WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Opciones Adicionales */}
      <Card className="border border-slate-200">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            Otras Opciones
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              className="h-16 sm:h-20 flex flex-col gap-2 text-sm sm:text-base"
              onClick={() => window.print()}
            >
              <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
              Imprimir
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 sm:h-20 flex flex-col gap-2 text-sm sm:text-base"
              onClick={() => {
                console.log("Enviando por email...");
                alert("Función de email en desarrollo");
              }}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Enviar por Email</span>
              <span className="sm:hidden">Email</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 sm:h-20 flex flex-col gap-2 text-sm sm:text-base sm:col-span-2 lg:col-span-1"
              onClick={() => {
                console.log("Copiando enlace...");
                alert("Enlace copiado al portapapeles");
              }}
            >
              <Link className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Copiar Enlace</span>
              <span className="sm:hidden">Enlace</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botones de Navegación */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-6 px-4 sm:px-0">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('datos-cliente')}
          className="w-full sm:w-auto px-4 sm:px-6 order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Volver a Datos del Cliente</span>
          <span className="sm:hidden">Volver</span>
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 order-1 sm:order-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-6"
          >
            Cerrar
          </Button>
          <Button 
            onClick={() => setCurrentStep('confirmacion')}
            className="w-full sm:w-auto px-4 sm:px-6 bg-green-600 hover:bg-green-700"
          >
            <span className="hidden sm:inline">Ver Confirmación</span>
            <span className="sm:hidden">Confirmación</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Principal */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold leading-tight">Detalles de la Cotización</h1>
                <p className="text-sm sm:text-base text-blue-100 mt-1 leading-tight">
                  {currentStep === 'resumen' && 'Resumen de la reserva'}
                  {currentStep === 'datos-cliente' && 'Datos del cliente'}
                  {currentStep === 'confirmacion' && 'Confirmación de cotización'}
                  {currentStep === 'exportacion' && 'Exportar y compartir'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/20 self-end sm:self-center w-full sm:w-auto"
            >
              <X className="w-4 h-4 mr-2" />
              Cerrar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl lg:max-w-6xl mx-auto">
          {currentStep === 'resumen' && renderResumen()}
          {currentStep === 'datos-cliente' && renderDatosCliente()}
          {currentStep === 'confirmacion' && renderConfirmacion()}
          {currentStep === 'exportacion' && renderExportacion()}
        </div>
      </div>
    </div>
  );
};   
