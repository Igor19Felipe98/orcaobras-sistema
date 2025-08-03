
'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Calculator, 
  Home, 
  Package, 
  Layers, 
  ShoppingCart, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Database,
  Import,
  Download,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Orçamentos',
    href: '/dashboard/orcamentos',
    icon: FileText,
    children: [
      { title: 'Todos os Orçamentos', href: '/dashboard/orcamentos', icon: FileText },
      { title: 'Novo Orçamento', href: '/dashboard/orcamentos/novo', icon: FileText },
    ],
  },
  {
    title: 'Insumos',
    href: '/dashboard/insumos',
    icon: Package,
    children: [
      { title: 'Lista de Insumos', href: '/dashboard/insumos', icon: Package },
      { title: 'Novo Insumo', href: '/dashboard/insumos/novo', icon: Package },
      { title: 'Importar Insumos', href: '/dashboard/insumos/importar', icon: Import },
    ],
  },
  {
    title: 'Composições',
    href: '/dashboard/composicoes',
    icon: Layers,
    children: [
      { title: 'Lista de Composições', href: '/dashboard/composicoes', icon: Layers },
      { title: 'Nova Composição', href: '/dashboard/composicoes/novo', icon: Layers },
      { title: 'Importar Composições', href: '/dashboard/composicoes/importar', icon: Import },
    ],
  },
  {
    title: 'Produtos',
    href: '/dashboard/produtos',
    icon: ShoppingCart,
    children: [
      { title: 'Lista de Produtos', href: '/dashboard/produtos', icon: ShoppingCart },
      { title: 'Novo Produto', href: '/dashboard/produtos/novo', icon: ShoppingCart },
      { title: 'Importar Produtos', href: '/dashboard/produtos/importar', icon: Import },
    ],
  },
  {
    title: 'Bancos de Dados',
    href: '/dashboard/bancos',
    icon: Database,
    children: [
      { title: 'Gerenciar Bancos', href: '/dashboard/bancos', icon: Database },
      { title: 'Importar/Exportar', href: '/dashboard/bancos/sync', icon: Download },
    ],
  },
  {
    title: 'Configurações',
    href: '/dashboard/configuracoes',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleNavigation = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-gray-900">OrçaObras</h1>
            <p className="text-xs text-gray-600">Sistema de Orçamentos</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <div key={item.title}>
            <Button
              variant={isActive(item.href) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10 px-3",
                isActive(item.href) && "bg-blue-50 text-blue-700 border-blue-200",
                collapsed && "px-2"
              )}
              onClick={() => {
                if (item.children) {
                  toggleExpanded(item.title);
                } else {
                  handleNavigation(item.href);
                }
              }}
            >
              <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.children && (
                    <ChevronRight 
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedItems.includes(item.title) && "transform rotate-90"
                      )} 
                    />
                  )}
                </>
              )}
            </Button>
            
            {/* Submenu */}
            {item.children && !collapsed && expandedItems.includes(item.title) && (
              <div className="ml-4 mt-2 space-y-1">
                {item.children.map((child) => (
                  <Button
                    key={child.title}
                    variant={isActive(child.href) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-9 px-3 text-sm",
                      isActive(child.href) && "bg-blue-50 text-blue-700"
                    )}
                    onClick={() => handleNavigation(child.href)}
                  >
                    <child.icon className="w-3 h-3 mr-2" />
                    {child.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}>
        <SidebarContent />
      </div>
    </>
  );
}
