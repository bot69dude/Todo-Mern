// src/services/todoService.ts
import { Todo } from '../types';

const API_URL = 'http://localhost:3000/api';

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async createTodo(title: string, description?: string): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
  },
};