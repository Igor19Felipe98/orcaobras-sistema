
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, ArrowLeft, Edit, Plus, Trash2, FileText, Download } from 'lucide-react';

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

export default function OrcamentoDetalhes() {
  const router = useRouter();
  const params = useParams();
  const [orcamento, setOrcamento] = useState<Orcamento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchOrcamento();
    }
  }, [params.id]);

  const fetchOrcamento = async () => {
    try {
      const response = await fetch(`/api/orcamentos/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrcamento(data);
      } else {
        alert('Orçamento não encontrado');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao carregar orçamento:', error);
      alert('Erro ao carregar orçamento');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    router.push('/dashboard');
  };

  const handleEditar = () => {
    router.push(`/dashboard/orcamentos/${params.id}/editar`);
  };

  const handleAdicionarItem = () => {
    // Por enquanto, mostrar alert - será implementado depois
    alert('Funcionalidade de adicionar itens será implementada em breve!');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Carregando orçamento...</h1>
        </div>
      </div>
    );
  }

  if (!orcamento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orçamento não encontrado</h1>
          <Button onClick={handleVoltar}>Voltar ao Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">OrçaObras</h1>
                <p className="text-sm text-gray-600">Detalhes do Orçamento</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleVoltar}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleEditar}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Informações do Orçamento */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{orcamento.nome}</CardTitle>
                <CardDescription className="mt-2">
                  {orcamento.descricao || 'Sem descrição'}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(orcamento.status)}>
                  {orcamento.status}
                </Badge>
                <span className="text-sm text-gray-500">v{orcamento.versao}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Valor Total</h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(orcamento.valorTotal)}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Criado em</h4>
                <p className="text-gray-600">{formatDate(orcamento.createdAt)}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Atualizado em</h4>
                <p className="text-gray-600">{formatDate(orcamento.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Itens do Orçamento */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Itens do Orçamento</CardTitle>
                <CardDescription>Composições, produtos e insumos utilizados</CardDescription>
              </div>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAdicionarItem}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum item adicionado
              </h3>
              <p className="text-gray-600 mb-6">
                Comece adicionando composições, produtos ou insumos ao seu orçamento
              </p>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAdicionarItem}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Item
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
