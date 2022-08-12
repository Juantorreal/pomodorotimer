import { createContext, ReactNode, useState, useReducer } from "react";
import { cyclesReducer } from "../reducers/cycles";


interface CreateCycleData {
    task: string;
    minutesAmount:  number;

}

export interface Cycle {
    id: string;  
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date
    finishedDate?: Date
    
  }
  
  



interface CyclesContextProviderProps {
    children: ReactNode;
}


export const CyclesContext = createContext({} as CyclesContextType)


export function CyclesContextProvider({children}:CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer( cyclesReducer,
              {
                cycles:[],
                activeCycleId: null,
              },
    )
      

    const {cycles, activeCycleId} = cyclesState;
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {

        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
               activeCycleId,
        },
    })
 


      }
      function setSecondsPassed(seconds:number) {
        setAmountSecondsPassed(seconds)
    
      }

     function createNewCycle(data:CreateCycleData) {
         
        const newCycle:Cycle = {
           id: String(new Date().getTime()),
           task: data.task,
           minutesAmount: data.minutesAmount,
           startDate: new Date(),
 
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                 newCycle,
            }
        })
 
        
        setAmountSecondsPassed(0)
 
       // reset();
       
   } 
 
 
   function interruptCurrentCycle() {
    dispatch({
        type: 'INTERRUPT_CURRENT_CYCLE',
        payload: {
             activeCycleId ,
        }
    })

 
    
     
 
   }
 
    
    return (
        <CyclesContext.Provider
        value={{
          cycles,
          activeCycle,
          activeCycleId,
          markCurrentCycleAsFinished,
          amountSecondsPassed,
          setSecondsPassed,
          createNewCycle,
          interruptCurrentCycle,
        }}
      >
        {children}
      </CyclesContext.Provider>
    )
    
}
