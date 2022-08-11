import { HandPalm, Play } from "phosphor-react";
import React, { useState } from "react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from "./Components/NewCycleForm";
import { createContext } from "react";
import { CountDown } from "./Components/CountDown";




interface Cycle {
  id: string;  
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date
  finishedDate?: Date
  
}

 export interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds:number) => void
}

const newCycleFormValidationSchema = zod.object({
  task:zod.string().min(1, 'Informea tarefa'),
  minutesAmount: zod.number().min(1).max(60),

})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string|null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


  
    const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
        
      }
  
    });

    const { handleSubmit, watch, reset} = newCycleForm

  

  function markCurrentCycleAsFinished() {

    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return  {...cycle, finishedDate: new Date()}



      }else {
         return cycle

      }

    } ),)

  }
  function setSecondsPassed(seconds:number) {
    setAmountSecondsPassed(seconds)

  }
  
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

 const task = watch('task')

 const isSubmitDisabled = !task

 


 
    return (
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <CyclesContext.Provider value={{activeCycle, activeCycleId,markCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed}}>
         <FormProvider {...newCycleForm}>
         <NewCycleForm/>
         </FormProvider>
          <CountDown/>
          </CyclesContext.Provider>
          
        

       
        
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