import { Play } from "phosphor-react";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'



const newCycleFormValidationSchema = zod.object({
   task:zod.string().min(1, 'Informea tarefa'),
   minutesAmount: zod.number().min(5).max(60),

})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;  
  task: string;
  minutesAmount: number;
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string|null>(null)
   
  const {register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }

    

  });
  
  function handleCreateNewCycle(data:any) {
       const newCycle:Cycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesAmount: data.minutesAmount,
       }

       setCycles((state) => [...state, newCycle]);
       setActiveCycleId(newCycle.id)

       reset();
      
  } 

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

 const task = watch('task')

 const isSubmitDisabled = !task


 console.log(activeCycle)
    return (
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="De um nome ao seu projeto" list="task-suggestions"
          {...register('task')}
          
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
            <option value="Projeto 3"/>
            <option value="manna"/>



          </datalist>
          <label>durante</label>
          <MinutesAmountInput type="number"
           id="minutesAmount" 
           placeholder="00" 
           step={5}
           min={5}
           max={60}
           {...register('minutesAmount', {valueAsNumber: true})}
           />
          <span>minutos.</span>
          </FormContainer>
        

        <CountdownContainer>
         <span>0</span>
         <span>0</span>
         <Separator>:</Separator>
         <span>0</span>
         <span>0</span>

        </CountdownContainer>
        <StartCountdownButton type="submit"  disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar</StartCountdownButton>

        </form>


      </HomeContainer>
    )
}