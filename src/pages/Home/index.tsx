import { HandPalm, Play } from "phosphor-react";
import React, { useState } from "react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from "./Components/NewCycleForm";
import { CountDown } from "./Components/CountDown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";




const newCycleFormValidationSchema = zod.object({
  task:zod.string().min(1, 'Informea tarefa'),
  minutesAmount: zod.number().min(1).max(60),

})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {

    const {activeCycle,createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

  
  
    const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
        
      }
  
    });

    const { handleSubmit, watch, reset} = newCycleForm

  
function handleCreateNewCycle(data: NewCycleFormData) {
  
    createNewCycle(data)
    reset()
}
  
  
  
 const task = watch('task')

 const isSubmitDisabled = !task

 


 
    return (
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
         
         <FormProvider {...newCycleForm}>
         <NewCycleForm/>
         </FormProvider>
          <CountDown/>
          
        

       
        
      { activeCycle ? (
        <StopCountdownButton onClick={interruptCurrentCycle} type="button"  >
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