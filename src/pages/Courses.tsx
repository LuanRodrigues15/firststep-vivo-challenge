// src/pages/Courses.tsx

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { mockCourses, mockStages } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [completedItems, setCompletedItems] = useState<any[]>([]);
  const [currentStage, setCurrentStage] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user?.id) {
      toast({ title: "Erro", description: "Usuário não autenticado.", variant: "destructive" });
      return;
    }
    determineCurrentStage();
  }, [user?.id]);

  const determineCurrentStage = async () => {
    try {
      // Usar mock data
      const completedCourseIds = new Set<string>();
      const allCourses = mockCourses;

      const firstIncompleteCourse = allCourses.find(
        (course) => !completedCourseIds.has(String(course.id))
      );

      if (!firstIncompleteCourse) {
        toast({ title: "Parabéns!", description: "Você concluiu todos os cursos!", variant: "success" });
        setCourses([]);
        setCurrentStage(null);
        return;
      }

      setCurrentStage(firstIncompleteCourse.stage_id);
      await loadCourses(firstIncompleteCourse.stage_id);
    } catch (error: any) {
      console.error("Erro ao determinar o estágio atual:", error);
      toast({ title: "Erro", description: "Não foi possível determinar o estágio atual.", variant: "destructive" });
    }
  };

  const loadCourses = async (stageId: number) => {
    try {
      const stageCourses = mockCourses.filter((c) => c.stage_id === stageId);
      setCourses(stageCourses as any[]);
    } catch (error: any) {
      console.error("Erro ao carregar cursos:", error);
      toast({ title: "Erro ao carregar cursos", description: error.message, variant: "destructive" });
    }
  };

  const loadCompletedItems = async () => {
    try {
      setCompletedItems([]);
    } catch (error: any) {
      console.error("Erro ao carregar progresso:", error);
      toast({ title: "Erro ao carregar progresso", description: error.message, variant: "destructive" });
    }
  };

  const handleCompleteCourse = async (courseId: string) => {
    try {
      toast({ title: "Curso concluído com sucesso!" });
    } catch (error: any) {
      console.error("Erro ao completar curso:", error);
      toast({ title: "Erro ao completar curso", description: error.message, variant: "destructive" });
    }
  };

  if (!user?.id) {
    return <div className="text-center text-red-500">Usuário não autenticado.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meus Cursos</h1>
      {currentStage && <p className="text-center text-muted-foreground mb-4">Estágio Atual: {currentStage}</p>}
      {courses.length === 0 ? (
        <p className="text-center text-muted-foreground">Nenhum curso disponível para o seu estágio.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const isCompleted = completedItems.some((item) => String(item.course_id) === String(course.id));
            return (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                  <Progress value={isCompleted ? 100 : 0} className="w-full" />
                  <p className="text-sm text-center mt-2">{isCompleted ? "100% concluído" : "0% concluído"}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleCompleteCourse(String(course.id))} disabled={isCompleted}>
                    {isCompleted ? "Concluído" : "Acessar Curso"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Courses;
