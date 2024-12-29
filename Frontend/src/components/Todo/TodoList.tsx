import { useEffect, useState } from 'react';
import { Todo } from '../../types';
import { todoService } from '../../services/todoService';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { Loader2 } from 'lucide-react';
import { Alert } from '../ui/alert';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setError('');
      const fetchedTodos = await todoService.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAlertConfirm = () => {
    setError('');
    fetchTodos();
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">My Tasks</h1>

        {/* Todo Form Section */}
        <TodoForm onTodoCreated={fetchTodos} />

        {/* Error Alert */}
        {error && (
          <Alert
            title="Error Loading Tasks"
            description={error}
            onConfirm={handleAlertConfirm}
          />
        )}

        {/* Main Todo List Section */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
            </div>
          ) : todos.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new task above</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onTodoUpdated={fetchTodos}
                  onTodoDeleted={fetchTodos}
                />
              ))}
              <div className="mt-4 text-sm text-gray-500 text-center">
                {`${todos.length} ${todos.length === 1 ? 'task' : 'tasks'}`} •{' '}
                {todos.filter((t) => t.completed).length} completed
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;