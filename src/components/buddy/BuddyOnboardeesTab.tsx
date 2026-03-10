// src/components/buddy/BuddyOnboardeesTab.tsx
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, BookOpen } from "lucide-react";
import { OnboardeeCard, EnrichedOnboardee } from './OnboardeeCard';
import { mockOnboardees, mockTasks, mockCourses } from '@/data/mockData';

export function BuddyOnboardeesTab() {
  const [onboardees, setOnboardees] = useState<EnrichedOnboardee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOnboardee, setSelectedOnboardee] = useState<EnrichedOnboardee | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const totalTasksCount = mockTasks.length;
      const totalCoursesCount = mockCourses.length;

      const enrichedData = mockOnboardees.map(o => {
        const completed_tasks = 0;
        const total_tasks = totalTasksCount;
        const completed_courses = 0;
        const total_courses = totalCoursesCount;

        const totalItems = total_tasks + total_courses;
        const completedItemsCount = completed_tasks + completed_courses;
        const progress = totalItems > 0 ? Math.round((completedItemsCount / totalItems) * 100) : 0;

        return {
          ...o,
          completed_tasks,
          total_tasks,
          completed_courses,
          total_courses,
          completed_items: { tasks: [], courses: [] },
          progress,
        };
      });
      setOnboardees(enrichedData as EnrichedOnboardee[]);
      setLoading(false);
    };
    fetchData();
  }, [toast]);
  
  return (
    <div>
      <Toaster />
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Acompanhamento dos Onboardees</h2>
        <p className="text-muted-foreground">Clique em um card para ver os detalhes do progresso.</p>
      </div>

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      )}

      {!loading && onboardees.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {onboardees.map((onboardee) => (
            <OnboardeeCard 
              key={onboardee.id} 
              onboardee={onboardee} 
              onClick={() => setSelectedOnboardee(onboardee)}
            />
          ))}
        </div>
      )}

      {!loading && onboardees.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Nenhum Onboardee Encontrado</h3>
          <p className="text-muted-foreground">Você ainda não foi designado como Buddy de ninguém.</p>
        </div>
      )}
      
      <Dialog open={!!selectedOnboardee} onOpenChange={(isOpen) => !isOpen && setSelectedOnboardee(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedOnboardee?.name}</DialogTitle>
            <DialogDescription>
              Lista detalhada de todos os itens já concluídos durante o onboarding.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center"><BookOpen className="mr-2 h-4 w-4" /> Cursos Concluídos</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {selectedOnboardee?.completed_items.courses.length > 0 ? (
                  selectedOnboardee.completed_items.courses.map(course => <li key={course.title}>{course.title}</li>)
                ) : (
                  <li className="list-none text-muted-foreground">Nenhum curso concluído ainda.</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Tarefas Concluídas</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {selectedOnboardee?.completed_items.tasks.length > 0 ? (
                  selectedOnboardee.completed_items.tasks.map(task => <li key={task.title}>{task.title}</li>)
                ) : (
                  <li className="list-none text-muted-foreground">Nenhuma tarefa concluída ainda.</li>
                )}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}