import { Task } from '../types/Task';

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]): void => {
  try {
    const serializedTasks = JSON.stringify(tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString()
    })));
    localStorage.setItem('tasks', serializedTasks);
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

// Load tasks from localStorage
export const loadTasks = (): Task[] => {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    if (!serializedTasks) return [];
    
    return JSON.parse(serializedTasks).map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};