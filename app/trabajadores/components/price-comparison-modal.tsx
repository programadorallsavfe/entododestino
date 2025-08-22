"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  Building, 
  TrendingDown, 
  TrendingUp, 
  Filter, 
  Info, 
  Star
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PriceComparisonModalProps {
  isVisible: boolean;
  selectedItem: any;
  onClose: () => void;
  onReservar: (selectedDate: string) => void;
}

export const PriceComparisonModal = ({ 
  isVisible, 
  selectedItem, 
  onClose, 
  onReservar 
}: PriceComparisonModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 10);
    
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10);
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    };
  });

  useEffect(() => {
    if (isVisible) {
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    }
  }, [isVisible]);

  const generatePricesForDates = () => {
    const basePrice = selectedItem?.price || 0;
    const variation = selectedItem?.type === 'hotel' ? 0.25 : selectedItem?.type === 'flight' ? 0.35 : 0.30;
    
    const dates = [];
    const startDate = new Date(dateRange.start);
    
    for (let i = 0; i < 21; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const priceVariation = (Math.random() - 0.5) * variation;
      const price = Math.round(basePrice * (1 + priceVariation));
      
      dates.push({
        date: currentDate.toISOString().split('T')[0],
        price,
        isSelected: currentDate.toISOString().split('T')[0] === selectedDate,
        isLowest: false
      });
    }
    
    const lowestPrice = Math.min(...dates.map(d => d.price));
    dates.forEach(date => {
      if (date.price === lowestPrice) {
        date.isLowest = true;
      }
    });
    
    return dates;
  };

  const pricesForDates = generatePricesForDates();
  const lowestPrice = Math.min(...pricesForDates.map(d => d.price));
  const highestPrice = Math.max(...pricesForDates.map(d => d.price));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleReservar = () => {
    if (selectedDate) {
      onReservar(selectedDate);
    }
  };

  if (!isVisible || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl lg:max-w-5xl max-h-[95vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">Análisis de Precios por Fecha</h3>
                <p className="text-sm sm:text-base text-blue-100 mt-1 leading-tight">Selecciona una fecha para ver el precio exacto</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 self-end sm:self-center"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-xl self-center sm:self-start">
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {selectedItem.name || selectedItem.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
                      {selectedItem.location || `${selectedItem.origin} → ${selectedItem.destination}`}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-slate-200">
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Precio Base</span>
                        <div className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{formatPrice(selectedItem.price)}</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-slate-200">
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Rango de Precios</span>
                        <div className="text-base sm:text-lg font-semibold text-slate-900 mt-1">
                          {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
                        </div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-slate-200">
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Ahorro Máximo</span>
                        <div className="text-base sm:text-lg font-semibold text-green-600 mt-1">
                          {formatPrice(selectedItem.price - lowestPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 sm:p-6 rounded-2xl text-center shadow-lg">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    <span className="text-xs sm:text-sm font-medium">Mejor Precio</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">{formatPrice(lowestPrice)}</div>
                  <div className="text-green-100 text-xs sm:text-sm mt-1">
                    {new Date(pricesForDates.find(d => d.isLowest)?.date || '').toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-200 shadow-sm">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Filtrador de Fechas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Seleccionar Fecha
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={dateRange.start}
                    max={dateRange.end}
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rango de Análisis
                </label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(dateRange.start).toLocaleDateString('es-ES')} - {new Date(dateRange.end).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Acciones Rápidas
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const bestPriceDate = pricesForDates.find(d => d.isLowest)?.date;
                      if (bestPriceDate) {
                        setSelectedDate(bestPriceDate);
                      }
                    }}
                    className="text-green-600 border-green-300 hover:bg-green-50 flex items-center gap-2"
                  >
                    <TrendingDown className="w-4 h-4" />
                    Mejor Precio
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0];
                      setSelectedDate(today);
                    }}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Hoy
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Evolución de Precios (20 días)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Las barras más altas indican precios más bajos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200">
              <div className="relative mb-8">
                <div className="grid gap-1 sm:gap-2 mb-8" style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}>
                  {pricesForDates.map((dateData, index) => {
                    const priceHeight = ((highestPrice - dateData.price) / (highestPrice - lowestPrice)) * 120 + 40;
                    const isBestPrice = dateData.isLowest;
                    const isSelected = dateData.isSelected;
                    const priceDifference = selectedItem.price - dateData.price;
                    const isGoodDeal = priceDifference > 0;
                    
                    return (
                      <div
                        key={index}
                        className={`relative cursor-pointer group transition-all duration-300 ${
                          isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                        onClick={() => setSelectedDate(dateData.date)}
                      >
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isBestPrice
                              ? 'bg-gradient-to-t from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                              : isSelected
                              ? 'bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                              : isGoodDeal
                              ? 'bg-gradient-to-t from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600'
                              : 'bg-gradient-to-t from-slate-300 to-slate-400 hover:from-slate-400 hover:to-slate-500'
                          }`}
                          style={{ height: `${priceHeight}px` }}
                        />
                        
                        {isBestPrice && (
                          <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-bold shadow-lg z-20 animate-pulse">
                            <TrendingDown className="w-2 h-2 sm:w-3 sm:h-3" />
                          </div>
                        )}
                        
                        {isSelected && !isBestPrice && (
                          <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-bold shadow-lg z-20">
                            <Calendar className="w-2 h-2 sm:w-3 sm:h-3" />
                          </div>
                        )}
                        
                        {!isBestPrice && !isSelected && isGoodDeal && (
                          <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-bold shadow-lg z-20">
                            <TrendingDown className="w-2 h-2 sm:w-3 sm:h-3" />
                          </div>
                        )}
                        
                        <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 whitespace-nowrap font-medium">
                          {new Date(dateData.date).getDate()}
                        </div>
                        
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                          {formatPrice(dateData.price)}
                        </div>
                        
                        {isGoodDeal && (
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                            -{formatPrice(priceDifference)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute left-0 right-0 border-t-2 border-dashed border-slate-400 opacity-50" 
                     style={{ 
                       top: `${((highestPrice - selectedItem.price) / (highestPrice - lowestPrice)) * 120 + 40}px` 
                     }} />
                <div className="absolute right-0 top-0 bg-slate-400 text-white text-xs px-2 py-1 rounded transform translate-y-[-50%] hidden sm:block">
                  Precio Base: {formatPrice(selectedItem.price)}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-slate-300 to-slate-400 rounded-sm"></div>
                  <span className="text-slate-600">Precio normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-sm"></div>
                  <span className="text-slate-600">Buen precio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-600 rounded-sm"></div>
                  <span className="text-slate-600">Fecha seleccionada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-600 rounded-sm"></div>
                  <span className="text-slate-600">Mejor precio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-t-2 border-dashed border-slate-400"></div>
                  <span className="text-slate-600">Precio base</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="flex-1 h-12 sm:h-14 text-slate-700 border-slate-300 hover:bg-slate-50"
              onClick={onClose}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cerrar
            </Button>
            <Button 
              size="lg"
              className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
              onClick={handleReservar}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">
                Reservar para {selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES') : 'Fecha Seleccionada'}
              </span>
              <span className="sm:hidden">
                Reservar
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
