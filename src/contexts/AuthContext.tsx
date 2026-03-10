import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateCredentials, AuthUser } from '@/auth/users';

interface UserProfile {
  id: string;
  role: 'RH' | 'Buddy' | 'Onboardee';
  name: string;
  email: string;
}

interface AuthError {
  message: string;
  name: string;
  status?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  profile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      console.log("Verificando sessão existente...");
      const sessionData = localStorage.getItem('auth_session');
      
      if (sessionData) {
        try {
          const sessionUser = JSON.parse(sessionData);
          console.log("Sessão encontrada. Carregando perfil...");
          setUser(sessionUser);
          setProfile(sessionUser);
        } catch (error) {
          console.error("Erro ao carregar sessão:", error);
          localStorage.removeItem('auth_session');
        }
      } else {
        console.log("Nenhuma sessão ativa encontrada.");
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Tentando autenticar localmente...");
    
    const authUser = validateCredentials(email, password);
    
    if (!authUser) {
      const error: AuthError = {
        message: "Email ou senha inválidos.",
        name: "InvalidCredentials",
        status: 401
      };
      console.error("Erro na autenticação:", error);
      return { error };
    }
    
    const userProfile: UserProfile = {
      id: authUser.id,
      role: authUser.role,
      name: authUser.name,
      email: authUser.email
    };
    
    console.log("Autenticação bem-sucedida! Perfil carregado:", userProfile);
    setUser(userProfile);
    setProfile(userProfile);
    
    // Salvar sessão no localStorage
    localStorage.setItem('auth_session', JSON.stringify(userProfile));
    
    console.log("Redirecionando para o dashboard...");
    switch (userProfile.role) {
      case 'RH':
        navigate('/rh/dashboard');
        break;
      case 'Buddy':
        navigate('/buddy/dashboard');
        break;
      case 'Onboardee':
        navigate('/dashboard');
        break;
      default:
        navigate('/');
    }

    return { error: null };
  };

  const signOut = async () => {
    console.log("Realizando logout...");
    setUser(null);
    setProfile(null);
    localStorage.removeItem('auth_session');
    navigate('/');
  };

  const value = { user, profile, signIn, signOut, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};