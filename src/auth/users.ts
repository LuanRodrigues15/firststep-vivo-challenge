// src/auth/users.ts

export interface AuthUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'RH' | 'Buddy' | 'Onboardee';
}

// Usuários padrão com senhas padrão para cada tipo de perfil
export const DEFAULT_USERS: AuthUser[] = [
  // RH User
  {
    id: 'rh-001',
    email: 'rh@example.com',
    password: 'rh123456',
    name: 'Administrador RH',
    role: 'RH'
  },
  // Buddy User
  {
    id: 'buddy-001',
    email: 'buddy@example.com',
    password: 'buddy123456',
    name: 'Buddy Mentor',
    role: 'Buddy'
  },
  // Onboardee User
  {
    id: 'onboardee-001',
    email: 'onboardee@example.com',
    password: 'onboardee123456',
    name: 'Novo Colaborador',
    role: 'Onboardee'
  }
];

// Função para buscar usuário por email
export const getUserByEmail = (email: string): AuthUser | undefined => {
  return DEFAULT_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Função para validar credenciais
export const validateCredentials = (email: string, password: string): AuthUser | null => {
  const user = getUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  if (user.password === password) {
    return user;
  }
  
  return null;
};
