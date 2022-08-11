import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";



export function NewCycleForm() {
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()



    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="De um nome ao seu projeto" list="task-suggestions"
          {...register('task')}
          disabled={!!activeCycle}
          
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
           step={1}
           min={1}
           max={60}
           {...register('minutesAmount', {valueAsNumber: true})}
           disabled={!!activeCycle}
           />
          <span>minutos.</span>
          </FormContainer>
    )

}