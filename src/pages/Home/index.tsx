import { Play } from "phosphor-react";
import React from "react";
import { Header } from "../../components/Header";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
export function Home() {
    return (
      <HomeContainer>
        <form>
          <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="De um nome ao seu projeto" list="task-suggestions"/>

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
        <StartCountdownButton type="submit">
          <Play size={24}/>
          Começar</StartCountdownButton>

        </form>


      </HomeContainer>
    )
}