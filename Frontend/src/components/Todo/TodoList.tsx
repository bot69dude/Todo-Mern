import { useEffect, useState } from 'react';
import { Todo } from '../../types';
import { todoService } from '../../services/todoService';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">My Tasks</h1>
        
        <TodoForm onTodoCreated={fetchTodos} />

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : todos.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new task above
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onTodoUpdated={fetchTodos}
                  onTodoDeleted={fetchTodos}
                />
              ))}
              <div className="mt-4 text-sm text-gray-500">
                {`${todos.length} ${todos.length === 1 ? 'task' : 'tasks'}`} •{' '}
                {todos.filter(t => t.completed).length} completed
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;