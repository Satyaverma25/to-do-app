export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  name: string;
  title: string;
  priority: Priority;
  description: string;
  completed: boolean;
  createdAt: Date;
}