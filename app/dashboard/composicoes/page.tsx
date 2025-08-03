
'use client';

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLoading } from '@/components/ui/loading-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, Plus, Search, Filter, Import, Download } from 'lucide-react';

interface Composicao {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  custo: number;
  categoria?: string;
  itens?: number;
}

export default function ComposicoesPage() {
  const [composicoes, setComposicoes] = useState<Composicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setComposicoes([
        {
          id: '1',
          codigo: 'COMP001',
          descricao: 'Concreto FCK 20 - preparo com betoneira',
          unidade: 'm³',
          custo: 285.50,
          categoria: 'Estrutura',
          itens: 5
        },
        {
          id: '2',
          codigo: 'COMP002',
          descricao: 'Alvenaria tijolo cerâmico 6 furos 14x19x19cm',
          unidade: 'm²',
          custo: 48.75,
          categoria: 'Alvenaria',
          itens: 4
        },
        {
          id: '3',
          codigo: 'COMP003',
          descricao: 'Revestimento argamassa traço 1:3',
          unidade: 'm²',
          custo: 12.30,
          categoria: 'Revestimento',
          itens: 3
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredComposicoes = composicoes.filter(comp =>
    comp.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.codigo.toLowerCase().includes(searchTerm.toLowerCase())
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
        <PageLoading title="Carregando Composições..." description="Aguarde enquanto carregamos a lista de composições" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Composições</h1>
            <p className="text-gray-600">Gerencie as composições unitárias do sistema</p>
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
              Nova Composição
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Composições</p>
                  <p className="text-2xl font-bold">{composicoes.length}</p>
                </div>
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Custo Médio</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(composicoes.reduce((sum, c) => sum + c.custo, 0) / composicoes.length || 0)}
                  </p>
                </div>
                <Layers className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold">
                    {new Set(composicoes.map(c => c.categoria).filter(Boolean)).size}
                  </p>
                </div>
                <Layers className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Itens Médios</p>
                  <p className="text-2xl font-bold">
                    {Math.round(composicoes.reduce((sum, c) => sum + (c.itens || 0), 0) / composicoes.length || 0)}
                  </p>
                </div>
                <Layers className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Composições</CardTitle>
            <CardDescription>Visualize e gerencie todas as composições unitárias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar composições..."
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

            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Código</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Descrição</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Unidade</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Custo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Categoria</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Itens</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredComposicoes.map((comp) => (
                    <tr key={comp.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{comp.codigo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{comp.descricao}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{comp.unidade}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(comp.custo)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{comp.categoria || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{comp.itens || 0}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Itens
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
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
