import { useState } from 'react';
import { Login } from './components/User/Login';
import { Register } from './components/User/Register';
import { TodoList } from './components/Todo/TodoList';
import { userService } from './services/userService';
import { LogOut } from 'lucide-react';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await userService.logout();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            {/* Logo or App Name */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Task Master
              </h1>
              <p className="mt-2 text-gray-600">
                {showRegister ? 'Create your account' : 'Welcome back'}
              </p>
            </div>

            {/* Auth Forms */}
            <div className="overflow-hidden">
              <div className="transition-all duration-300 ease-in-out">
                {showRegister ? (
                  <div>
                    <Register onRegister={() => setIsAuthenticated(true)} />
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowRegister(false)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Already have an account?{' '}
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Sign in
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Login onLogin={() => setIsAuthenticated(true)} />
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowRegister(true)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Don't have an account?{' '}
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Sign up
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Task Master</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md 
                         border border-transparent bg-red-100 px-4 py-2 
                         text-sm font-medium text-red-700 
                         hover:bg-red-200 focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoading ? 'Logging out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900">
            Welcome back! Here are your tasks.
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your daily tasks and stay organized.
          </p>
        </div>

        <TodoList />
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Task Master. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;