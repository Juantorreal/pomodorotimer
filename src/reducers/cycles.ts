import { Cycle } from "../contexts/CyclesContext"





interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null


}

export interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds:number) => void
    createNewCycle: (data:CreateCycleData) =>  void
    interruptCurrentCycle:() => void
  }

export function cyclesReducer(state:CyclesState,action:any) {
    switch(action.type) {
        case 'ADD_NEW_CYCLE':
          return {
              ...state, 
              cycles: [...state.cycles, action.payload.newCycle],
              activeCycleId: action.payload.newCycle.id,
      
              }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
              ...state,
              cycles: state.cycles.map((cycle) => {
                     if (cycle.id === state.activeCycleId) {
                      return  {...cycle, interruptedDate: new Date()}
               
                    } else {
                       return cycle
               
                     }
                   } ),
              activeCycleId: null,
            }
        case  'MARK_CURRENT_CYCLE_AS_FINISHED':

          return {
              ...state,
              cycles: state.cycles.map((cycle) => {
                     if (cycle.id === state.activeCycleId) {
                      return  {...cycle, finishedDate: new Date()}
               
                    } else {
                       return cycle
               
                     }
                   } ),
              activeCycleId: null,
            }
            default:
          return state
      }
        
      }
