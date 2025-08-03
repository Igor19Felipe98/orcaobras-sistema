
'use client';

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLoading } from '@/components/ui/loading-spinner';
import { LoadingButton } from '@/components/ui/loading-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Plus, Search, Filter, Import, Download } from 'lucide-react';

interface Insumo {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  preco: number;
  categoria?: string;
}

export default function InsumosPage() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setInsumos([
        {
          id: '1',
          codigo: 'INS001',
          descricao: 'Cimento Portland CP-II-E-32',
          unidade: 'kg',
          preco: 0.45,
          categoria: 'Cimento'
        },
        {
          id: '2',
          codigo: 'INS002',
          descricao: 'Areia média lavada',
          unidade: 'm³',
          preco: 35.00,
          categoria: 'Agregados'
        },
        {
          id: '3',
          codigo: 'INS003',
          descricao: 'Brita nº 1',
          unidade: 'm³',
          preco: 42.00,
          categoria: 'Agregados'
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredInsumos = insumos.filter(insumo =>
    insumo.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insumo.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoading title="Carregando Insumos..." description="Aguarde enquanto carregamos a lista de insumos" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insumos</h1>
            <p className="text-gray-600">Gerencie todos os insumos do seu sistema</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Import className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Insumo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Insumos</p>
                  <p className="text-2xl font-bold">{insumos.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Preço Médio</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(insumos.reduce((sum, i) => sum + i.preco, 0) / insumos.length || 0)}
                  </p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold">
                    {new Set(insumos.map(i => i.categoria).filter(Boolean)).size}
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unidades</p>
                  <p className="text-2xl font-bold">
                    {new Set(insumos.map(i => i.unidade)).size}
                  </p>
                </div>
                <Package className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Insumos</CardTitle>
            <CardDescription>Visualize e gerencie todos os insumos cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar insumos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Código</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Descrição</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Unidade</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Preço</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Categoria</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInsumos.map((insumo) => (
                    <tr key={insumo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{insumo.codigo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{insumo.descricao}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{insumo.unidade}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(insumo.preco)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{insumo.categoria || '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
