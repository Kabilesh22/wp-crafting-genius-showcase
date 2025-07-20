import { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { storage } from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const allTasks = storage.getTasks();
      const userTasks = allTasks.filter(task => task.userId === user.id);
      setTasks(userTasks);
    } else {
      setTasks([]);
    }
  }, [user]);

  const createTask = (
    title: string,
    description: string,
    priority: TaskPriority,
    dueDate: string
  ) => {
    if (!user) return;

    const newTask: Task = {
      id: storage.generateId(),
      title,
      description,
      status: 'todo',
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
    };

    storage.addTask(newTask);
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    storage.updateTask(taskId, updates);
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    storage.deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    updateTask(taskId, { status });
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      completed: tasks.filter(task => task.status === 'completed').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      todo: tasks.filter(task => task.status === 'todo').length,
    };
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTasksByStatus,
    getTaskStats,
  };
};