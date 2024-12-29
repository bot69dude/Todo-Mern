// src/components/Todo/TodoForm.tsx
import { useState } from 'react';
import { todoService } from '../../services/todoService';
import { toast } from 'react-hot-toast';

interface Props {
  onTodoCreated: () => void;
}

export const TodoForm = ({ onTodoCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await todoService.createTodo(title, description);
      setTitle('');
      setDescription('');
      onTodoCreated();
      toast.success('Todo created successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      toast.error('Failed to create todo');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     placeholder-gray-400 transition duration-150"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter todo description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     placeholder-gray-400 resize-none transition duration-150"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center items-center px-6 py-3 
                     bg-indigo-600 hover:bg-indigo-700 
                     text-white font-medium rounded-md shadow-sm
                     transform transition duration-150 hover:scale-[1.02]
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
                clipRule="evenodd" 
              />
            </svg>
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};