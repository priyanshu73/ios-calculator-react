import { ACTIONS } from "./App";
import  "./styles.css"
const OperationButton = ( {dispatch, operation}) => {
    return (
    <button onClick = {() => dispatch( { type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}
    className="operationBttn"> 
    {operation}
    </button>
    )
}
 
export default OperationButton;