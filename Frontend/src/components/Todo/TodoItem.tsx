import { Todo } from '../../types';
import { todoService } from '../../services/todoService';
import { Trash2 } from 'lucide-react';

interface Props {
  todo: Todo;
  onTodoUpdated: () => void;
  onTodoDeleted: () => void;
}

export const TodoItem = ({ todo, onTodoUpdated, onTodoDeleted }: Props) => {
  const toggleComplete = async () => {
    try {
      await todoService.updateTodo(todo._id, {
        completed: !todo.completed,
      });
      onTodoUpdated();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await todoService.deleteTodo(todo._id);
      onTodoDeleted();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="group relative transform transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleComplete}
              className="h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
            {todo.completed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 
              className={`font-medium text-gray-900 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${
                todo.completed 
                  ? 'text-gray-400' 
                  : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="ml-4 rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Delete todo"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;