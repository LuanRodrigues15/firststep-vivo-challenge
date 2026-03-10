// src/data/mockData.ts

export const mockStages = [
  { 
    id: 1, 
    name: 'Onboarding Inicial',
    title: 'Onboarding Inicial',
    subtitle: 'Suas primeiras etapas na empresa',
    order_key: 1 
  },
  { 
    id: 2, 
    name: 'Treinamento',
    title: 'Treinamento',
    subtitle: 'Aprenda o essencial para trabalhar',
    order_key: 2 
  },
  { 
    id: 3, 
    name: 'Integração',
    title: 'Integração',
    subtitle: 'Conheça sua equipe e rotina',
    order_key: 3 
  },
  { 
    id: 4, 
    name: 'Autonomia',
    title: 'Autonomia',
    subtitle: 'Trabalhe de forma independente',
    order_key: 4 
  }
];

export const mockTasks = [
  { id: 1, title: 'Preencher formulários', type: 'form', stage_id: 1 },
  { id: 2, title: 'Assinatura de documentos', type: 'document', stage_id: 1 },
  { id: 3, title: 'Entrega de equipamento', type: 'equipment', stage_id: 1 },
  { id: 4, title: 'Treinamento sistema', type: 'training', stage_id: 2 },
  { id: 5, title: 'Reunião com mentor', type: 'meeting', stage_id: 2 },
  { id: 6, title: 'Apresentação da equipe', type: 'meeting', stage_id: 3 },
  { id: 7, title: 'Primeiros projetos', type: 'project', stage_id: 3 },
  { id: 8, title: 'Avaliação inicial', type: 'evaluation', stage_id: 4 }
];

export const mockCourses = [
  { 
    id: 1, 
    title: 'Introdução à Empresa', 
    description: 'Conheça a história, missão e visão da empresa',
    stage_id: 1, 
    order_key: 1,
    duration_minutes: 45,
    video_url: '#'
  },
  { 
    id: 2, 
    title: 'Políticas e Procedimentos', 
    description: 'Aprenda as políticas internas e procedimentos padrão',
    stage_id: 1, 
    order_key: 2,
    duration_minutes: 60,
    video_url: '#'
  },
  { 
    id: 3, 
    title: 'Ferramentas Principais', 
    description: 'Domine as ferramentas essenciais para o trabalho',
    stage_id: 2, 
    order_key: 1,
    duration_minutes: 90,
    video_url: '#'
  },
  { 
    id: 4, 
    title: 'Processos e Práticas', 
    description: 'Entenda os processos e melhores práticas',
    stage_id: 2, 
    order_key: 2,
    duration_minutes: 75,
    video_url: '#'
  },
  { 
    id: 5, 
    title: 'Segurança da Informação', 
    description: 'Aprenda as políticas de segurança e confidencialidade',
    stage_id: 3, 
    order_key: 1,
    duration_minutes: 60,
    video_url: '#'
  },
  { 
    id: 6, 
    title: 'Comunicação Interna', 
    description: 'Conheça os canais e ferramentas de comunicação',
    stage_id: 3, 
    order_key: 2,
    duration_minutes: 45,
    video_url: '#'
  }
];

export const mockDocuments = [
  { 
    id: 1, 
    title: 'Contrato de Trabalho',
    name: 'Contrato de Trabalho',
    type: 'contract', 
    url: '#',
    file_url: '#',
    description: 'Documento oficial de contrato de trabalho',
    is_mandatory: true
  },
  { 
    id: 2, 
    title: 'Políticas da Empresa',
    name: 'Políticas da Empresa',
    type: 'policy', 
    url: '#',
    file_url: '#',
    description: 'Políticas e regras da empresa',
    is_mandatory: true
  },
  { 
    id: 3, 
    title: 'Guia de Segurança',
    name: 'Guia de Segurança',
    type: 'guide', 
    url: '#',
    file_url: '#',
    description: 'Guia de segurança da informação',
    is_mandatory: false
  },
  { 
    id: 4, 
    title: 'Manual do Funcionário',
    name: 'Manual do Funcionário',
    type: 'manual', 
    url: '#',
    file_url: '#',
    description: 'Manual completo do funcionário',
    is_mandatory: true
  }
];

export const mockOnboardees = [
  { 
    id: 'onboardee-001', 
    name: 'João Silva', 
    email: 'joao.silva@example.com',
    buddy_id: 'buddy-001',
    progress: 45,
    role: 'Onboardee'
  },
  { 
    id: 'onboardee-002', 
    name: 'Maria Santos', 
    email: 'maria.santos@example.com',
    buddy_id: 'buddy-001',
    progress: 60,
    role: 'Onboardee'
  },
  { 
    id: 'onboardee-003', 
    name: 'Pedro Oliveira', 
    email: 'pedro.oliveira@example.com',
    buddy_id: 'buddy-001',
    progress: 25,
    role: 'Onboardee'
  },
  { 
    id: 'onboardee-004', 
    name: 'Ana Costa', 
    email: 'ana.costa@example.com',
    buddy_id: 'buddy-001',
    progress: 85,
    role: 'Onboardee'
  }
];

export const mockOnboardeeProgress = [
  { id: 1, onboardee_id: 'onboardee-001', course_id: 1, task_id: 1, completed: true },
  { id: 2, onboardee_id: 'onboardee-001', course_id: 1, task_id: 2, completed: true },
  { id: 3, onboardee_id: 'onboardee-001', course_id: 2, task_id: 3, completed: false }
];

export const mockAccess = [
  { 
    id: 1, 
    name: 'Sistema Principal', 
    description: 'Sistema ERP principal da empresa',
    status: 'aprovado' 
  },
  { 
    id: 2, 
    name: 'VPN', 
    description: 'Acesso à rede privada virtual',
    status: 'pendente' 
  },
  { 
    id: 3, 
    name: 'Email Corporativo', 
    description: 'Email e calendário corporativo',
    status: 'aprovado' 
  },
  { 
    id: 4, 
    name: 'G Suite', 
    description: 'Acesso a documentos e planilhas colaborativas',
    status: 'pendente' 
  },
  { 
    id: 5, 
    name: 'Slack', 
    description: 'Comunicação interna em tempo real',
    status: 'aprovado' 
  }
];
