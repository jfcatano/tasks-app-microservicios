import { TaskApiInstance } from './api'; 

const TaskService = {
  getAllTasks: async () => {
    const response = await TaskApiInstance.get('/tasks');
    return response.data.data;
    
  },

  createTask: async (title: string, description: string) => {
    const response = await TaskApiInstance.post('/tasks', {
      title,
      description,
      completed: false,
    });
    return response.data.data;
  },

  updateTask: async (id: string, title: string, description: string, completed: boolean) => {
    const response = await TaskApiInstance.put(`/tasks/${id}`, {
      title,
      description,
      completed
    });
    return response.data.data;
  },

  deleteTask: async (id: string) => {
    const response = await TaskApiInstance.delete(`/tasks/${id}`);
    return response.data.data;
  },
};

export default TaskService;
