import React from 'react';
import { CheckCircle, Trash2, Circle } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask }) => {
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string): React.ReactNode => {
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(priority)}`}>
        {priority}
      </span>
    );
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow p-4 mb-3 transition-all duration-300 hover:shadow-md ${
        task.completed ? 'opacity-75' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <button 
              onClick={() => toggleComplete(task.id)}
              className="text-blue-500 mr-2 focus:outline-none"
              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed ? 
                <CheckCircle className="h-5 w-5 text-green-500" /> : 
                <Circle className="h-5 w-5" />
              }
            </button>
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
          </div>
          
          <div className="mt-1 text-sm text-gray-600">
            Added by: {task.name}
          </div>
          
          <div className="mt-2">
            {getPriorityBadge(task.priority)}
          </div>
          
          {task.description && (
            <p className={`mt-3 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
        </div>
        
        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none"
          aria-label="Delete task"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;