
'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function TestButtons() {
  const [clickCount, setClickCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('🟢 Componente TestButtons montado!');
  }, []);

  const handleClick = () => {
    console.log('✅ Botão clicado!', new Date().toISOString());
    setClickCount(prev => prev + 1);
    alert(`Botão clicado ${clickCount + 1} vezes!`);
  };

  const handleSimpleClick = () => {
    console.log('✅ Botão simples clicado!');
    alert('Botão simples funcionando!');
  };

  const handleDirectAlert = () => {
    alert('Alert direto funcionando!');
  };

  if (!mounted) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8" style={{ pointerEvents: 'auto' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Botões - Montado: {mounted ? 'SIM' : 'NÃO'}</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-xl mb-4">Botão com alert direto:</h2>
            <button 
              onClick={handleDirectAlert}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              Alert Direto
            </button>
          </div>

          <div>
            <h2 className="text-xl mb-4">Botão com onMouseDown:</h2>
            <button 
              onMouseDown={() => alert('onMouseDown funcionando!')}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              MouseDown Test
            </button>
          </div>

          <div>
            <h2 className="text-xl mb-4">Link test:</h2>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert('Link funcionando!'); }}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer inline-block"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              Link Test
            </a>
          </div>

          <div>
            <h2 className="text-xl mb-4">Botão com componente UI:</h2>
            <Button 
              onClick={handleClick} 
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              Clique Aqui (Clicado {clickCount} vezes)
            </Button>
          </div>

          <div>
            <h2 className="text-xl mb-4">Botão HTML simples:</h2>
            <button 
              onClick={handleSimpleClick}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              Botão Simples
            </button>
          </div>

          <div>
            <h2 className="text-xl mb-4">Teste inline:</h2>
            <button 
              onClick={() => alert('Inline funcionando!')}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              Teste Inline
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Status:</h3>
          <p>Componente montado: <strong>{mounted ? 'SIM' : 'NÃO'}</strong></p>
          <p>Cliques registrados: <strong>{clickCount}</strong></p>
          
          <h3 className="text-lg font-semibold mb-2 mt-4">Diagnóstico:</h3>
          <div className="text-sm space-y-2">
            <p>✓ Componente React montado corretamente</p>
            <p>✓ Event handlers definidos</p>
            <p>✓ CSS cursor: pointer aplicado</p>
            <p>✓ z-index 1000 aplicado</p>
            <p>✓ pointer-events: auto explícito</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 mt-4">Instruções:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Teste todos os botões de cima para baixo</li>
            <li>Abra o console (F12) para ver mensagens</li>
            <li>Se NENHUM funcionar: problema de hydration/JavaScript</li>
            <li>Se ALGUNS funcionarem: problema específico do componente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
