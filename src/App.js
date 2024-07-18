import { useReducer } from "react";
import  "./styles.css"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { prettyFormat } from "@testing-library/react";
export const ACTIONS = {
  ADD_DIGIT : "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR : "clear",
  DELETE_DIGIT : "delete-digit",
  EVALUATE : "evaluate"
}
function reducer(state,{type, payload}){

    switch(type){
      case ACTIONS.ADD_DIGIT:

        if( state.overwrite){
          return {
            ...state, currentOperand : payload.digit,
            overwrite: false
          }
        }
      if (payload.digit == "0" && state.currentOperand === "0") return state
      if (payload.digit == "." && state.currentOperand.includes(".") ) return state  
      return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`
        };
      
      case ACTIONS.CHOOSE_OPERATION:
   
      if (state.currentOperand == null && state.previousOperand == null) { 
        return state;
      }
        
      if (state.currentOperand == null){
        return {...state, operation: payload.operation}
      }
      if (state.previousOperand == null){ 
        return {
            ...state, 
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null 
        }
      }
        
      return {...state, previousOperand: evaluate(state), currentOperand: null, operation: payload.operation};
      
      case ACTIONS.DELETE_DIGIT:

        if (state.overwrite){
          return {
            ...state, overwrite: false,currentOperand: null
          }
        };
        if (state.currentOperand == null){
          return state
        };

        if ( state.currentOperand.length == 1){
          return {...state, currentOperand: null}
        };

        return {
          ...state, currentOperand: state.currentOperand.slice(0,-1)
         };
        
      case ACTIONS.EVALUATE:
        if (state.previousOperand == null || state.currentOperand == null || state.operation == null) {
          return state;
        };

      return {...state, overwrite : true, currentOperand: evaluate(state), previousOperand: null, operation: null};
        
      case ACTIONS.CLEAR:
          return {};

      default:
        return state
    }
}

function evaluate({currentOperand, previousOperand, operation}){
  switch(operation){
    case("+"):
    return `${Number(previousOperand) + Number(currentOperand)}`
    case("-"):
     return `${Number(previousOperand) - Number(currentOperand)}`
     console.log(Number(currentOperand))
    case("×"):
     return `${Number(previousOperand) * Number(currentOperand)}`
    case("÷"):
     return `${Number(previousOperand) / Number(currentOperand)}`
     default:
      
  }
}
function App() {
  const[{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  
  return (
 
<div className="calculator-grid">

  <div className="output">
    <div className="previous-operand">{previousOperand} {operation}</div>
    <div className="current-operand">{currentOperand}</div>
  </div>
  <button className="empty"></button>
  <button onClick={ ()=> dispatch( { type: ACTIONS.CLEAR})} >AC</button>
  <button onClick ={ () => dispatch({type: ACTIONS.DELETE_DIGIT})}> DEL</button>
  <OperationButton operation ="÷" dispatch={dispatch}  />
  <DigitButton digit ="1" dispatch={dispatch} />
  <DigitButton digit ="2" dispatch={dispatch} />
  <DigitButton digit ="3" dispatch={dispatch} />
  <OperationButton operation = "×" dispatch={dispatch} />
  <DigitButton digit ="4" dispatch={dispatch} />
  <DigitButton digit ="5" dispatch={dispatch} />
  <DigitButton digit ="6" dispatch={dispatch} />
  <OperationButton operation ="+" dispatch={dispatch} />
  <DigitButton digit ="7" dispatch={dispatch} />
  <DigitButton digit ="8" dispatch={dispatch} />
  <DigitButton digit ="9" dispatch={dispatch} />
  <OperationButton operation ="-" dispatch={dispatch} />
  
  <DigitButton digit ="." dispatch={dispatch} />
  <DigitButton digit ="0" dispatch={dispatch}  />
  <button onClick={ ()=> dispatch( { type : ACTIONS.EVALUATE})}>=</button>
  <button className="empty"></button>
</div>

  )
}

export default App;
