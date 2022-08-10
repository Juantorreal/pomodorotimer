import { HandPalm, Play } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./Components/NewCycleForm";




interface Cycle {
  id: string;  
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date
  finishedDate?: Date
  
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string|null>(null)

   
  

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  

 
  
  function handleCreateNewCycle(data:any) {
       const newCycle:Cycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),

       }

       setCycles((state) => [...state, newCycle]);
       setActiveCycleId(newCycle.id)
       setAmountSecondsPassed(0)

       reset();
      
  } 


  function handleinterruptCycle() {
    

    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return  {...cycle, interruptedDate: new Date()}

      } else {
         return cycle

      }
    } ))

    setActiveCycleId(null)

  }

 



  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60 

  const minutes = String(minutesAmount).padStart(2, '0')
  
  const seconds = String(secondsAmount).padStart(2, '0')


  useEffect(() => {

    if (activeCycle) {
     document.title = `${minutes}:${seconds}`

    }
    

  }, [minutes, seconds, activeCycle])


 const task = watch('task')

 const isSubmitDisabled = !task

 


 
    return (
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm/>
          <CountDown/>
          
        

       
        
      { activeCycle ? (
        <StopCountdownButton onClick={handleinterruptCycle} type="button"  >
        <HandPalm size={24}/>
        Interromper</StopCountdownButton>

      ) : (

        <StartCountdownButton type="submit"  disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar</StartCountdownButton>

      )}


        </form>


      </HomeContainer>
    )
}