import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/Task';
import { loadTasks, saveTasks } from './utils/localStorage';
import { CheckCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [task, ...prevTasks]);
  };

  const toggleComplete = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-6">
      <header className="w-full max-w-4xl text-center mb-8 mt-4">
        <div className="flex items-center justify-center mb-2">
          <CheckCircle className="text-blue-500 h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">taskmaster</h1>
        </div>
        <p className="text-gray-600">A simple and elegant way to manage your tasks</p>
      </header>

      <main className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-1/3">
          <TaskForm addTask={addTask} />
        </div>
        
        <div className="w-full lg:w-2/3">
          <TaskList 
            tasks={tasks} 
            toggleComplete={toggleComplete} 
            deleteTask={deleteTask} 
          />
        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>TaskMaster &copy; {new Date().getFullYear()} - Keep your tasks organized</p>
      </footer>
    </div>
  );
}

export default App;
