import { useContext } from 'react';
import { TasksContext } from '../context/TaskContext';

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error('useTasksContext must be used within a TasksContextProvider');
  }

  return context;
};
