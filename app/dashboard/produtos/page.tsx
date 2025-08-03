
'use client';

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLoading } from '@/components/ui/loading-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Search, Filter, Import, Download } from 'lucide-react';

interface Produto {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  preco: number;
  categoria?: string;
  estoque?: number;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setProdutos([
        {
          id: '1',
          codigo: 'PROD001',
          descricao: 'Tijolo cerâmico 6 furos 14x19x19cm',
          unidade: 'un',
          preco: 0.85,
          categoria: 'Cerâmica',
          estoque: 5000
        },
        {
          id: '2',
          codigo: 'PROD002',
          descricao: 'Porta de madeira 80x210cm',
          unidade: 'un',
          preco: 180.00,
          categoria: 'Esquadrias',
          estoque: 25
        },
        {
          id: '3',
          codigo: 'PROD003',
          descricao: 'Telha cerâmica tipo francesa',
          unidade: 'un',
          preco: 2.50,
          categoria: 'Cobertura',
          estoque: 800
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredProdutos = produtos.filter(produto =>
    produto.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
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
        <PageLoading title="Carregando Produtos..." description="Aguarde enquanto carregamos a lista de produtos" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
            <p className="text-gray-600">Gerencie todos os produtos do seu catálogo</p>
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
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Produtos</p>
                  <p className="text-2xl font-bold">{produtos.length}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valor Médio</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(produtos.reduce((sum, p) => sum + p.preco, 0) / produtos.length || 0)}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold">
                    {new Set(produtos.map(p => p.categoria).filter(Boolean)).size}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Estoque</p>
                  <p className="text-2xl font-bold">
                    {produtos.reduce((sum, p) => sum + (p.estoque || 0), 0)}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
            <CardDescription>Visualize e gerencie todos os produtos cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar produtos..."
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Preço</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Categoria</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Estoque</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProdutos.map((produto) => (
                    <tr key={produto.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{produto.codigo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{produto.descricao}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{produto.unidade}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(produto.preco)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{produto.categoria || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{produto.estoque || 0}</td>
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
