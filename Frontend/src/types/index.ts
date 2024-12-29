// src/types/index.ts
export interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Todo {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string;
  }