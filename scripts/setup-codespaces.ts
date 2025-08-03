
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function setupCodespaces() {
  console.log('🚀 Configurando OrçaObras para Codespaces...');

  try {
    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const user = await prisma.user.upsert({
      where: { email: 'admin@orcaobras.com' },
      update: {},
      create: {
        nome: 'Administrador',
        email: 'admin@orcaobras.com',
        senha: hashedPassword,
      },
    });

    console.log('✅ Usuário admin criado:', user.email);

    // Criar alguns insumos básicos
    const insumos = await Promise.all([
      prisma.insumo.upsert({
        where: { id: 'insumo-1' },
        update: {},
        create: {
          id: 'insumo-1',
          codigo: 'MAT001',
          nome: 'Tijolo Cerâmico',
          tipo: 'MATERIAL',
          unidade: 'un',
          precoUnitario: 2.85,
          user: { connect: { id: user.id } }
        }
      }),
      prisma.insumo.upsert({
        where: { id: 'insumo-2' },
        update: {},
        create: {
          id: 'insumo-2',
          codigo: 'MO001',
          nome: 'Pedreiro',
          tipo: 'MAO_OBRA',
          unidade: 'h',
          precoUnitario: 25.00,
          user: { connect: { id: user.id } }
        }
      })
    ]);

    console.log('✅ Insumos básicos criados:', insumos.length);

    // Criar um orçamento exemplo
    const orcamento = await prisma.orcamento.upsert({
      where: { id: 'orcamento-exemplo' },
      update: {},
      create: {
        id: 'orcamento-exemplo',
        codigo: 'ORC001',
        nome: 'Casa Exemplo - 120m²',
        descricao: 'Orçamento exemplo para demonstração',
        dataOrcamento: new Date(),
        valorTotal: 150000.00,
        user: { connect: { id: user.id } }
      }
    });

    console.log('✅ Orçamento exemplo criado:', orcamento.nome);

    console.log('\n🎉 Setup concluído! Você pode fazer login com:');
    console.log('📧 Email: admin@orcaobras.com');
    console.log('🔑 Senha: 123456');

  } catch (error) {
    console.error('❌ Erro durante o setup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupCodespaces();
