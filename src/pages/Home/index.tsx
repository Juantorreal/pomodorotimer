import { Play } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'



const newCycleFormValidationSchema = zod.object({
   task:zod.string().min(1, 'Informea tarefa'),
   minutesAmount: zod.number().min(5).max(60),

})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;  
  task: string;
  minutesAmount: number;
  startDate: Date;
  
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string|null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   
  const {register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
      
    }

  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
   if (activeCycle) {
     setInterval(() => {
      setAmountSecondsPassed(differenceInSeconds(new Date(),  activeCycle.startDate ))
     }, 1000);
   }

  }, [activeCycle] )
  
  function handleCreateNewCycle(data:any) {
       const newCycle:Cycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),

       }

       setCycles((state) => [...state, newCycle]);
       setActiveCycleId(newCycle.id)

       reset();
      
  } 

 

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60 

  const minutes = String(minutesAmount).padStart(2, '0')
  
  const seconds = String(secondsAmount).padStart(2, '0')


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
         <span>{minutes[0]}</span>
         <span>{minutes[1]}</span>
         <Separator>:</Separator>
         <span>{seconds[0]}</span>
         <span>{seconds[1]}</span>

        </CountdownContainer>
        <StartCountdownButton type="submit"  disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar</StartCountdownButton>

        </form>


      </HomeContainer>
    )
}