'use client'

import { useState, useEffect } from "react"

import { Flex, Spinner } from "@chakra-ui/react"
import Header from "@/components/Header"
import AddTask from "@components/AddTask"
import { ITask } from "@types"
import NoTask from "@components/NoTask"
import Task from "@components/Task"
import Loading from "@components/loading"


export default function Home() {

  const [task, setTask] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [allTasks, setAllTasks] = useState([])

//Fonction de Création d'une nouvelle tâche
  const handleCreateTask = async() => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          task: task,
        }),
      })
      if(response.ok) {
        setTask('')
        fetchTasks()
      }
      else {
        console.log('error')
      }
     
    }
    catch(error) {
      console.log(error)
    }
     setIsLoading(false)
  }

  //Fonction de Récupération de toutes les tâches
  const fetchTasks = async() => {
    try{
      const response = await fetch("api/task/all")
      const data = await response.json()
      setAllTasks(data)
      setIsLoading(false)

    }catch(error){
      console.log('error')
    }
  }
//fonction du bouton "complété"
  const handleCompleteTask = async(id: string) => {
    try{
      const response = await fetch(`/api/task/complete/${id}`,{
        method: "PATCH"
      })
      if(response.ok){
        await fetchTasks()
      }
      else{
        console.log("Erreur dans la complétion de la tâche");
      }
    }
    catch(error){
      console.log("Erreur dans la complétion de la tâche", error);
      
    }

  }
//fonction du bouton "supprimer"
  const handleDeleteTask = async(id: string) => {
    try{
      const response = await fetch(`/api/task/delete/${id}`, {
        method: "DELETE"
      })
      if(response.ok) {
        setAllTasks((prevTasks) => prevTasks.filter((task: ITask) => task._id !== id))
      }else{
          console.log('error');
      }
    }
    catch(error){
      console.log(error)
    }
      
  }

  useEffect(() => {
    fetchTasks()
  }, [])
  return (
    <>
      <Header />
      <AddTask task={task} setTask={setTask} handleCreateTask={handleCreateTask} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex direction="column" p="2rem">
            {allTasks.length>0 ?
              allTasks.map((individualTask: ITask) => (
                <Task key={individualTask._id} individualTask={individualTask} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} />
              )) : (
                <NoTask />             )
            }
          </Flex>
        </>
      )}
     
    </>
  )
  }




