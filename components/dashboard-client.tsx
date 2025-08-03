
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { 
  Calculator, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Building2, 
  TrendingUp,
  DollarSign,
  MoreVertical,
  Edit,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Soluções de clique que funcionam mesmo com problemas de hydration
  const forceNavigate = (path: string) => {
    console.log('🚀 Navegando para:', path);
    try {
      router.push(path);
    } catch (error) {
      console.error('Erro com router.push, usando window.location:', error);
      window.location.href = path;
    }
  };

  const forceAlert = (message: string) => {
    console.log('📢 Alert:', message);
    alert(message);
  };

  useEffect(() => {
    if (!mounted || status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session) {
      fetchOrcamentos();
    }
  }, [session, status, router, mounted]);

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

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const handleNovoOrcamento = () => {
    console.log('🔥 Botão Novo Orçamento clicado!');
    forceNavigate('/dashboard/orcamentos/novo');
  };

  const handleCriarPrimeiroOrcamento = () => {
    console.log('🔥 Botão Criar Primeiro Orçamento clicado!');
    forceNavigate('/dashboard/orcamentos/novo');
  };

  const handleVisualizarOrcamento = (id: string) => {
    console.log('🔥 Botão Visualizar clicado para ID:', id);
    forceNavigate(`/dashboard/orcamentos/${id}`);
  };

  const handleEditarOrcamento = (id: string) => {
    console.log('🔥 Botão Editar clicado para ID:', id);
    forceNavigate(`/dashboard/orcamentos/${id}/editar`);
  };

  const handleFiltrar = () => {
    console.log('🔥 Botão Filtrar clicado!');
    forceAlert('Funcionalidade de filtros será implementada em breve!');
  };

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

  const filteredOrcamentos = orcamentos.filter(orc =>
    orc?.nome?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '') ||
    orc?.descricao?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '') ||
    false
  );

  const totalOrcamentos = orcamentos?.length || 0;
  const valorTotalGeral = orcamentos?.reduce((sum, orc) => sum + (orc?.valorTotal || 0), 0) || 0;
  const orcamentosFinalizados = orcamentos?.filter(orc => orc?.status === 'FINALIZADO')?.length || 0;

  if (!mounted || status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">OrçaObras</h1>
                <p className="text-sm text-gray-600">Sistema de Orçamentos</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Olá, <span className="font-medium">{session?.user?.name || 'Usuário'}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        {/* Seção de Orçamentos */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Meus Orçamentos</CardTitle>
                <CardDescription>Gerencie todos os seus orçamentos de obras</CardDescription>
              </div>
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2"
                onClick={() => forceNavigate('/dashboard/orcamentos/novo')}
                type="button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Orçamento
              </button>
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
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={() => forceAlert('Funcionalidade de filtros será implementada em breve!')}
                type="button"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </button>
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
                  <button 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2"
                    onClick={() => forceNavigate('/dashboard/orcamentos/novo')}
                    type="button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Orçamento
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredOrcamentos.map((orcamento) => (
                  <Card key={orcamento?.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
                          <button 
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                            onClick={() => forceNavigate(`/dashboard/orcamentos/${orcamento.id}`)}
                            type="button"
                            title="Visualizar orçamento"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                            onClick={() => forceNavigate(`/dashboard/orcamentos/${orcamento.id}/editar`)}
                            type="button"
                            title="Editar orçamento"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                            onClick={() => forceAlert('Menu de opções será implementado em breve!')}
                            type="button"
                            title="Mais opções"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
