import React, { useState ,useEffect} from 'react'
import '../components/task.css'
import Add from '../images/add.png'
import { db } from '../firebase/config'
import {addDoc,collection,getDocs,updateDoc,doc,deleteDoc, limitToLast} from 'firebase/firestore'


function Task() {
  const [task,setTask] = useState([])
  const [list,setList] = useState([])
  const taskCollectionRef = collection(db,"tasks");


  useEffect(()=>{
    const getTasks = async () => {
      const data = await getDocs(taskCollectionRef); 
      setList(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
    }
    getTasks();
  },[])
  
  const addTask= async () =>{
    await addDoc(taskCollectionRef,task).then((response)=>{
      document.getElementById('input').value = "";
      console.log(response.id);
      task.id = response.id;
      setList([...list,task]);
    }
      )
  }
  const update = async (id,sts) =>{
    console.log(id,sts);
    const stus = !sts;
    const currentRef = doc(db,"tasks",id);
    await updateDoc(currentRef,{status:stus}).then(()=>{
      console.log("updateDoc success");
      setList(list.filter((obj)=>{
        
        if(obj.id === id){
          console.log(obj.task,obj.status)
          obj.status = stus;
          console.log(obj.task,obj.status)
        }
        return obj;
      }))

    })
    
  }
  const deleteTask = async (id) => {
    const currentRef = doc(db,"tasks",id);
    await deleteDoc(currentRef).then(()=>{
      setList(list.filter((obj)=>{
        if(obj.id != id){
          return obj;
        }
      }))
    });
  }
  return (
    
    <div class="body">
        <h1>To Dos ....</h1>
        <div className="task-container">
            <div className="input-container">
                <input type="text" id='input' onChange={(e)=>{setTask({task : e.target.value , status : false});console.log(task)}}  placeholder='enter your tasks here...' />
                <img src={Add} onClick={addTask} alt="hello" />
            </div>
            <div class="tasks">
              {list.map((obj)=>{
                if(!obj.status){
                return (
                  <div className='true'>
                    
                    <p onClick={ () => {update(obj.id,obj.status)}}>{obj.task}</p>
                    <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" alt="" onClick={()=>{deleteTask(obj.id)}} />
                  
                  </div>
                  )
                }
              })},</div>
              <di className="tasks">
              
              {list.map((obj)=>{
                if(obj.status){
                  return (
                    <div className='false'>
                     <strike onClick={ () => {update(obj.id,obj.status)}}>{obj.task}</strike>
                     <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" alt="" onClick={()=>{deleteTask(obj.id)}} />
                    </div>
              )}
              })}
              

            </di>
        </div>
        </div>
  )
}

export default Task;