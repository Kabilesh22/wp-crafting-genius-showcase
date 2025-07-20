import { Task, User } from '@/types/task';

const TASKS_KEY = 'taskmanager_tasks';
const USER_KEY = 'taskmanager_user';

export const storage = {
  // Task operations
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  addTask: (task: Task): void => {
    const tasks = storage.getTasks();
    tasks.push(task);
    storage.saveTasks(tasks);
  },

  updateTask: (taskId: string, updates: Partial<Task>): void => {
    const tasks = storage.getTasks();
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
      storage.saveTasks(tasks);
    }
  },

  deleteTask: (taskId: string): void => {
    const tasks = storage.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    storage.saveTasks(filteredTasks);
  },

  // User operations
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  saveUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Generate ID utility
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};