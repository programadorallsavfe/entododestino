"use client";

import TarifasTable from "@/app/trabajadores/components/tarifas-table";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, TrendingUp, Settings, BarChart3 } from "lucide-react";

export default function ListaTarifasPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/20 rounded-xl border border-white/30 backdrop-blur-sm">
                                    <DollarSign className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white">Gestión de Tarifas</h1>
                                    <p className="text-xl text-white/90">
                                        Administra y configura las tarifas de servicios turísticos
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <BarChart3 className="w-5 h-5 mr-2" />
                                Ver Reportes
                            </Button>
                            <Button 
                                size="lg" 
                                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Nueva Tarifa
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mx-auto px-4 py-8">
                {/* Header del contenido */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Panel de Control de Tarifas</h2>
                            <p className="text-muted-foreground">
                                Gestiona precios, descuentos y políticas de tarifas para todos los servicios
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                                <Settings className="w-4 h-4 mr-2" />
                                Configuración
                            </Button>
                            <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Análisis
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                        <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">24</p>
                        <p className="text-sm text-muted-foreground">Tarifas Activas</p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                        <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-sm text-muted-foreground">Categorías</p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                        <div className="p-2 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
                            <Settings className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">8</p>
                        <p className="text-sm text-muted-foreground">Regiones</p>
                    </div>
                </div>

                {/* Tabla de Tarifas */}
                <div className="bg-card border border-border rounded-lg">
                    <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-semibold text-foreground">Lista de Tarifas</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Gestiona todas las tarifas del sistema de manera centralizada
                        </p>
                    </div>
                    <div className="p-6">
                        <TarifasTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}   