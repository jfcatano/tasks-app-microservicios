import React, { useEffect, useState } from 'react';
import TaskService from '../services/task.service';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import Confetti from 'react-confetti';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Comment as CommentIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';


interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface FormErrors {
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    description: '',
  });
  const [editErrors, setEditErrors] = useState<FormErrors>({
    title: '',
    description: '',
  });

  const validateForm = (title: string, description: string): boolean => {
    const newErrors: FormErrors = {
      title: '',
      description: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters.';
    }

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    return !hasErrors;
  };

   // Charge all task when the component is rendered
   useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await TaskService.getAllTasks();
        setTasks(fetchedTasks.task);
      } catch (error) {
        console.error("Error getting tasks", error);
      }
    };

    fetchTasks();
  }, []);


  const handleAddTask = async () => {
    const isValid = validateForm(newTask.title, newTask.description);
    
    if (!isValid) {
      setErrors({
        title: !newTask.title.trim() || newTask.title.length < 3 ? 
          'Title must be at least 3 characters.' : '',
        description: !newTask.description.trim() || newTask.description.length < 5 ? 
          'Description must be at least 5 characters.' : '',
      });
      return;
    }
  
    try {
      const createdTask = await TaskService.createTask(newTask.title.trim(), newTask.description.trim());
      setTasks((prevTasks) => [...prevTasks, createdTask]); // Update the task state (add the new task to the UI)
      setNewTask({ title: '', description: '' });
      setErrors({ title: '', description: '' });
      setOpenNewTask(false);
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };
  

  const handleEditTask = async () => {
    if (selectedTask) {
      const isValid = validateForm(selectedTask.title, selectedTask.description);
      
      if (!isValid) {
        setEditErrors({
          title: !selectedTask.title.trim() || selectedTask.title.length < 3 ? 
            'Title must be at least 3 characters.' : '',
          description: !selectedTask.description.trim() || selectedTask.description.length < 5 ? 
            'Description must be at least 5 characters.' : '',
        });
        return;
      }
  
      try {
        const updatedTask = await TaskService.updateTask(
          selectedTask.id,
          selectedTask.title.trim(), 
          selectedTask.description.trim(), 
          selectedTask.completed
        );
        setTasks((prevTasks) => 
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        ); // Update the task state (update the task in the UI)
        setSelectedTask(null);
        setEditErrors({ title: '', description: '' });
        setOpenEditTask(false);
      } catch (error) {
        console.error("Error editing a task:", error);
      }
    }
  };
  

  const handleDeleteTask = async () => {
    if (selectedTask) {
      try {
        await TaskService.deleteTask(selectedTask.id); 
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id)); // Update the task state (remove the task from the UI)
        setSelectedTask(null);
        setOpenDeleteTask(false);
      } catch (error) {
        console.error("Error deleting a task:", error);
      }
    }
  };
  
  const handleCloseNewTask = () => {
    setOpenNewTask(false);
    setNewTask({ title: '', description: '' });
    setErrors({ title: '', description: '' });
  };

  const handleCloseEditTask = () => {
    setOpenEditTask(false);
    setEditErrors({ title: '', description: '' });
  };

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Useffect to hide the confetti after 5 seconds
useEffect(() => {
  if (showConfetti) {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [showConfetti]);

const handleToggleComplete = async (task_id: string) => { 
  const updatedTasks = tasks.map((task) => {
    if (task.id === task_id) {
      const newCompleted = !task.completed;
      // Show confetti if the task is completed
      if (newCompleted) {
        setShowConfetti(true);
      }
      return { ...task, completed: newCompleted };
    }
    return task;
  });
  setTasks(updatedTasks);

  // Update the task in the database
  try {
    const taskToUpdate = updatedTasks.find((task) => task.id === task_id);
    if (taskToUpdate) {
      await TaskService.updateTask(
        task_id,
        taskToUpdate.title, 
        taskToUpdate.description, 
        taskToUpdate.completed
      );
    }
  } catch (error) {
    console.error("Error uptading the task state:", error);
  }
};


  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Header with Add Button */}
      {/* Confetti component */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          p: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          To Do Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewTask(true)}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            px: 3,
          }}
        >
          Create new task
        </Button>
      </Box>

      {/* Tasks Grid */}
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                background: 'white',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ pr: 8 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Box
                    sx={{
                      height: 6,
                      width: 40,
                      borderRadius: 3,
                      bgcolor: task.completed ? '#4CAF50' : '#FF9800',
                    }}
                  />
                  <Box
                    sx={{
                      height: 6,
                      width: 40,
                      borderRadius: 3,
                      bgcolor: '#E0E0E0',
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1,
                    color: '#1a1a1a',
                    fontWeight: 500,
                  }}
                >
                  {task.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {task.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CommentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    2
                  </Typography>
                </Box>
              </CardContent>

              {/* Vertical Actions */}
              <Stack
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  gap: 1,
                }}
              >
                <Tooltip title={task.completed ? "Task completed!" : "Mark as completed"} arrow>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleComplete(task.id)}
                    sx={{
                      color: task.completed ? '#4CAF50' : '#FF9800',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    {task.completed ? <TrophyIcon /> : <UncheckedIcon />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Edit task" arrow>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedTask(task);
                      setOpenEditTask(true);
                    }}
                    sx={{
                      color: '#2196F3',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete task" arrow>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedTask(task);
                      setOpenDeleteTask(true);
                    }}
                    sx={{
                      color: '#F44336',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* New task Modal */}
      <Dialog 
        open={openNewTask} 
        onClose={handleCloseNewTask}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 500,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Create a new task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mt: 2 }}
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            sx={{ mt: 2 }}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseNewTask}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddTask} 
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog 
        open={openEditTask} 
        onClose={handleCloseEditTask}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 500,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Editing task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título"
            value={selectedTask?.title || ''}
            onChange={(e) =>
              setSelectedTask(
                selectedTask
                  ? { ...selectedTask, title: e.target.value }
                  : null
              )
            }
            sx={{ mt: 2 }}
            variant="outlined"
            error={!!editErrors.title}
            helperText={editErrors.title}
          />
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={4}
            value={selectedTask?.description || ''}
            onChange={(e) =>
              setSelectedTask(
                selectedTask
                  ? { ...selectedTask, description: e.target.value }
                  : null
              )
            }
            sx={{ mt: 2 }}
            variant="outlined"
            error={!!editErrors.description}
            helperText={editErrors.description}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseEditTask}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditTask} 
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Task Modal */}
      <Dialog 
        open={openDeleteTask} 
        onClose={() => setOpenDeleteTask(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 500,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpenDeleteTask(false)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteTask} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;