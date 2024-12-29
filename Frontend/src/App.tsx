import { useState } from 'react';
import { Login } from './components/User/Login';
import { Register } from './components/User/Register';
import { TodoList } from './components/Todo/TodoList';
import { userService } from './services/userService';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = async () => {
    await userService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-600 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-3xl sm:p-10">
            {showRegister ? (
              <div>
                <Register onRegister={() => setIsAuthenticated(true)} />
                <button
                  onClick={() => setShowRegister(false)}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  Already have an account? Login
                </button>
              </div>
            ) : (
              <div>
                <Login onLogin={() => setIsAuthenticated(true)} />
                <button
                  onClick={() => setShowRegister(true)}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  Don't have an account? Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
