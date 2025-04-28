import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { Priority, Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, deleteTask }) => {
  const [filter, setFilter] = useState<Priority | 'All'>('All');
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.priority === filter;
  });

  const taskCount = filteredTasks.length;
  const completedCount = filteredTasks.filter(task => task.completed).length;

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Tasks</h2>
        <div className="text-sm text-gray-500">
          {completedCount} of {taskCount} completed
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === 'All' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('High')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === 'High' 
                ? 'bg-red-500 text-white' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setFilter('Medium')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === 'Medium' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('Low')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === 'Low' 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Low
          </button>
        </div>
      </div>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {filteredTasks.map(task => (
          <div 
            key={task.id}
            className="transform transition-transform duration-300 hover:-translate-y-1"
          >
            <TaskItem 
              task={task} 
              toggleComplete={toggleComplete} 
              deleteTask={deleteTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;