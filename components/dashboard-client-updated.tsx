
'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageLoading } from '@/components/ui/loading-spinner';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Building2, 
  TrendingUp,
  DollarSign,
  MoreVertical,
  Edit,
  Eye,
  Package,
  Layers,
  ShoppingCart
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Orcamento {
  id: string;
  nome: string;
  descricao?: string;
  versao: string;
  status: string;
  valorTotal: number;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardClientUpdated() {
  const router = useRouter();
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const response = await fetch('/api/orcamentos');
      if (response.ok) {
        const data = await response.json();
        setOrcamentos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const forceNavigate = (path: string) => {
    router.push(path);
  };

  const filteredOrcamentos = orcamentos.filter(orc =>
    orc?.nome?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '') ||
    orc?.descricao?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '') ||
    false
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RASCUNHO':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'FINALIZADO':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'APROVADO':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalOrcamentos = orcamentos?.length || 0;
  const valorTotalGeral = orcamentos?.reduce((sum, orc) => sum + (orc?.valorTotal || 0), 0) || 0;
  const orcamentosFinalizados = orcamentos?.filter(orc => orc?.status === 'FINALIZADO')?.length || 0;

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoading title="Carregando Dashboard..." description="Aguarde enquanto carregamos suas informações" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Estatísticas principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total de Orçamentos</p>
                  <p className="text-3xl font-bold">{totalOrcamentos}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Valor Total</p>
                  <p className="text-xl font-bold">{formatCurrency(valorTotalGeral)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Finalizados</p>
                  <p className="text-3xl font-bold">{orcamentosFinalizados}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Em Andamento</p>
                  <p className="text-3xl font-bold">{totalOrcamentos - orcamentosFinalizados}</p>
                </div>
                <Building2 className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => forceNavigate('/dashboard/insumos')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Insumos</h3>
                  <p className="text-sm text-gray-600">Gerencie insumos básicos</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => forceNavigate('/dashboard/composicoes')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Composições</h3>
                  <p className="text-sm text-gray-600">Composições unitárias</p>
                </div>
                <Layers className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => forceNavigate('/dashboard/produtos')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Produtos</h3>
                  <p className="text-sm text-gray-600">Catálogo de produtos</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Orçamentos */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Meus Orçamentos</CardTitle>
                <CardDescription>Gerencie todos os seus orçamentos de obras</CardDescription>
              </div>
              <Button onClick={() => forceNavigate('/dashboard/orcamentos/novo')}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Orçamento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Barra de pesquisa e filtros */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar orçamentos..."
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

            {/* Lista de orçamentos */}
            {filteredOrcamentos.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {orcamentos.length === 0 ? 'Nenhum orçamento criado' : 'Nenhum orçamento encontrado'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {orcamentos.length === 0 
                    ? 'Comece criando seu primeiro orçamento de obra'
                    : 'Tente ajustar os filtros de pesquisa'
                  }
                </p>
                {orcamentos.length === 0 && (
                  <Button onClick={() => forceNavigate('/dashboard/orcamentos/novo')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Orçamento
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredOrcamentos.map((orcamento) => (
                  <Card key={orcamento?.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{orcamento?.nome || 'Sem nome'}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(orcamento?.status || '')}`}>
                              {orcamento?.status || 'RASCUNHO'}
                            </span>
                            <span className="text-xs text-gray-500">v{orcamento?.versao || '1.0'}</span>
                          </div>
                          
                          {orcamento?.descricao && (
                            <p className="text-sm text-gray-600 mb-2">{orcamento.descricao}</p>
                          )}
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span>Criado em {formatDate(orcamento?.createdAt || '')}</span>
                            <span>Valor: <span className="font-medium text-green-600">{formatCurrency(orcamento?.valorTotal || 0)}</span></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => forceNavigate(`/dashboard/orcamentos/${orcamento.id}`)}
                            title="Visualizar orçamento"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => forceNavigate(`/dashboard/orcamentos/${orcamento.id}/editar`)}
                            title="Editar orçamento"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Mais opções"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
