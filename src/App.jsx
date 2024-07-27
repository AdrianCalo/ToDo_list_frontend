import { useEffect, useState } from 'react';
import './App.css'
import TaskCard from './component/taskCard';
import TaskContainer from './component/taskContainer';

function App() {
  
  const [tasks, setTasks]=useState([]);
  const [title,setTitle]=useState('');
  const [description, setDescription]= useState('');

  useEffect(()=>{
    const fetchTasks= async()=>{
      try{
        const response= await fetch('http://localhost:3070/task/');
        if(!response.ok){
          throw new Error('Error fetch task');
        }
        const data= await response.json();
        setTasks(data);
      }catch (error) {
        console.error('error fetch task', error);
      }
    };
    
    fetchTasks();
  },[]);

  const handleSubmit= async(e) => {
    e.preventDefault();
    const newTask ={
      title,
      description,
    };

    try{
      const response = await fetch('http://localhost:3070/task',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(newTask),
      });

      if(!response.ok){
        throw new Error('Error creating task');
      }

      const createdTask = await response.json();
      setTasks([...tasks,createdTask]);
      setTitle('');
      setDescription('');
    }catch(error){
      console.error('error creating task', error)
    }
  };


  const handleDelete = async (taskTitle)=>{
    try{
      const response = await fetch(`http://localhost:3070/task/${taskTitle}`,{
        method:'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error deleting task');
      }

      setTasks(tasks.filter((task)=> task.title !== taskTitle));
    }catch(error){
      console.error('Error deleting task',error)
    }
  };


  return (
  <>

    <h1>Tareas</h1>
  <div className='formulario'>
  
    <form onSubmit={handleSubmit}>
      
      <input type="text"
      placeholder='Titulo'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      required 
      />

      <textarea 
      placeholder='Descripcion'
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      required>
      </textarea>

      <button type="submit">Crear tarea</button>

    </form>
  </div>
  
    <div className='ContainerCard'>
      <TaskContainer title="Por Hacer">
        {tasks.filter(task=> task.status==='Sin Realizar').map(task=> (
          <TaskCard
            key={task.title}
            task={task}
            onDelete={()=>handleDelete(task.title)}
            buttonLabel="Eliminar"></TaskCard>
        ))}
      </TaskContainer>

      
    </div>
  
  
  
   
  </>
  );
}

export default App
