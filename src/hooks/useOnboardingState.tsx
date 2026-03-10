import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockStages, mockTasks, mockCourses } from "@/data/mockData";

// Types (mantidos como estavam)
interface Task {
  id: number;
  title: string;
  type: 'standard' | 'course';
  courseId?: string | null; // Ajustado para aceitar null do banco
}

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'in-progress' | 'blocked';
  period: string;
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
}

interface OnboardingState {
  stages: Stage[];
  currentStageId: number;
  completedTasks: Set<number>; // Usar Set para performance
  completedCourses: Set<string>; // Usar Set para performance
}

interface OnboardingContextType {
  state: OnboardingState;
  loading: boolean;
  getCurrentStage: () => Stage | undefined;
  toggleTask: (stageId: number, task: Task) => Promise<void>;
  navigateToCourse: (courseId: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<OnboardingState>({
    stages: [],
    currentStageId: 1,
    completedTasks: new Set(),
    completedCourses: new Set(),
  });

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Usar dados mock
      const stagesData = mockStages;
      const tasksData = mockTasks;
      const coursesData = mockCourses;

      // Simular progresso do usuário
      const completedTaskIds = new Set<number>([1, 2]);
      const completedCourseIds = new Set<string>();

      // Montar a estrutura final das etapas
      const formattedStages = stagesData.map(stage => {
        const stageTasks: Task[] = tasksData
            .filter(t => t.stage_id === stage.id)
            .map(t => ({ id: t.id, title: t.title, type: 'standard' as const, courseId: null }));
        
        const courseTasks: Task[] = coursesData
            .filter(c => c.stage_id === stage.id)
            .map(c => ({ id: c.id, title: c.title, type: 'course' as const, courseId: c.id.toString() }));
        
        const allTasks = [...stageTasks, ...courseTasks];

        const completedTasksInStage = allTasks.filter(task =>
          task.type === 'standard'
            ? completedTaskIds.has(task.id)
            : (task.courseId && completedCourseIds.has(task.courseId))
        ).length;
        
        return {
          id: stage.id,
          title: stage.name,
          subtitle: '',
          description: '',
          tasks: allTasks,
          totalTasks: allTasks.length,
          completedTasks: completedTasksInStage,
          status: 'blocked' as const,
          period: '',
        };
      });

      // Calcular o status de cada etapa (in-progress, completed, blocked)
      let previousStageCompleted = true;
      for (const stage of formattedStages) {
        if (previousStageCompleted) {
          stage.status = stage.completedTasks === stage.totalTasks ? 'completed' : 'in-progress';
        } else {
          stage.status = 'blocked';
        }
        previousStageCompleted = stage.status === 'completed';
      }

      const firstInProgressStage = formattedStages.find(s => s.status === 'in-progress');
      const currentStageId = firstInProgressStage ? firstInProgressStage.id : stagesData[stagesData.length - 1].id;

      // Atualizar o estado principal
      setState({
        stages: formattedStages,
        currentStageId: currentStageId,
        completedTasks: completedTaskIds,
        completedCourses: completedCourseIds,
      });

    } catch (error) {
      console.error("Erro ao buscar dados do onboarding:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleTask = async (stageId: number, task: Task) => {
    if (!user) return;

    const isStandardTask = task.type === 'standard';
    const isCompleted = isStandardTask
      ? state.completedTasks.has(task.id)
      : (task.courseId && state.completedCourses.has(task.courseId));

    // Atualizar o estado local
    if (isCompleted) {
      // Remover do progresso
      const newCompletedTasks = new Set(state.completedTasks);
      const newCompletedCourses = new Set(state.completedCourses);
      
      if (isStandardTask) {
        newCompletedTasks.delete(task.id);
      } else if (task.courseId) {
        newCompletedCourses.delete(task.courseId);
      }
      
      setState(prev => ({
        ...prev,
        completedTasks: newCompletedTasks,
        completedCourses: newCompletedCourses,
      }));
    } else {
      // Adicionar ao progresso
      const newCompletedTasks = new Set(state.completedTasks);
      const newCompletedCourses = new Set(state.completedCourses);
      
      if (isStandardTask) {
        newCompletedTasks.add(task.id);
      } else if (task.courseId) {
        newCompletedCourses.add(task.courseId);
      }
      
      setState(prev => ({
        ...prev,
        completedTasks: newCompletedTasks,
        completedCourses: newCompletedCourses,
      }));
    }
    
    console.log(`Tarefa ${task.type === 'standard' ? task.id : task.courseId} ${isCompleted ? 'desmarcada' : 'marcada'}`);
  };

  const getCurrentStage = () => {
    return state.stages.find(stage => stage.status === 'in-progress');
  };
  
  const navigateToCourse = (courseId: string) => {
    navigate('/courses');
    setTimeout(() => {
      const courseElement = document.getElementById(`course-${courseId}`);
      if (courseElement) {
        courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const contextValue: OnboardingContextType = {
    state,
    loading,
    getCurrentStage,
    toggleTask,
    navigateToCourse,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {loading ? <div>Carregando sua jornada...</div> : children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}