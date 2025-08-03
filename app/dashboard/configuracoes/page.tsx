
'use client';

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Bell, Shield, Database, Download } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie as configurações do sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Perfil do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" placeholder="Seu nome" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div>
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" placeholder="Nome da empresa" />
              </div>
              <Button className="w-full">Salvar Alterações</Button>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por e-mail</Label>
                  <p className="text-sm text-gray-600">Receber updates por e-mail</p>
                </div>
                <Switch 
                  checked={notificacoes} 
                  onCheckedChange={setNotificacoes}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-salvar</Label>
                  <p className="text-sm text-gray-600">Salvar automaticamente</p>
                </div>
                <Switch 
                  checked={autoSave} 
                  onCheckedChange={setAutoSave}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Modo escuro</Label>
                  <p className="text-sm text-gray-600">Interface escura</p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Configurações de segurança da conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full">
                Autenticação 2FA
              </Button>
              <Button variant="outline" className="w-full">
                Histórico de Login
              </Button>
              <Separator />
              <Button variant="destructive" className="w-full">
                Excluir Conta
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Configurações do Sistema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Banco de Dados
              </CardTitle>
              <CardDescription>
                Gerencie os dados do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Backup
                </Button>
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Restaurar
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <Label>Backup automático</Label>
                <p className="text-sm text-gray-600 mb-2">
                  Últhimo backup: Hoje às 14:30
                </p>
                <Button variant="outline" size="sm">
                  Configurar Frequência
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Sistema
              </CardTitle>
              <CardDescription>
                Configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="moeda">Moeda padrão</Label>
                <Input id="moeda" value="BRL - Real Brasileiro" disabled />
              </div>
              
              <div>
                <Label htmlFor="precisao">Precisão decimal</Label>
                <Input id="precisao" type="number" value="2" />
              </div>
              
              <div>
                <Label htmlFor="timezone">Fuso horário</Label>
                <Input id="timezone" value="America/Sao_Paulo" disabled />
              </div>
              
              <Button className="w-full">Salvar Configurações</Button>
            </CardContent>
          </Card>
        </div>

        {/* Informações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
            <CardDescription>
              Detalhes técnicos e versão do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-600">Versão</Label>
                <p className="text-lg font-semibold">v1.0.0</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Última atualização</Label>
                <p className="text-lg font-semibold">03/08/2025</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Licença</Label>
                <p className="text-lg font-semibold">Professional</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
