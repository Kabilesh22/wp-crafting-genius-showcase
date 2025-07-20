import React, { useState } from 'react';
import { Header } from './Header';
import { StatsCards } from './StatsCards';
import { TaskBoard } from './TaskBoard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

export const Dashboard: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { 
    tasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    updateTaskStatus, 
    getTaskStats 
  } = useTasks();
  const { toast } = useToast();

  const handleCreateTask = (title: string, description: string, priority: any, dueDate: string) => {
    createTask(title, description, priority, dueDate);
    toast({
      title: "Task created",
      description: "Your new task has been added successfully.",
    });
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    setEditingTask(null);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateTask={() => setIsFormOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <StatsCards stats={stats} />
          <TaskBoard
            tasks={tasks}
            onStatusChange={updateTaskStatus}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleCreateTask}
        onUpdate={handleUpdateTask}
        editingTask={editingTask}
      />
    </div>
  );
};