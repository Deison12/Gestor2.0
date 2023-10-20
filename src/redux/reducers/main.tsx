import {combineReducers} from "redux";
import { cartreducer } from "./reducer";
import { authReducer } from "./authReducer";


const rootred = combineReducers({
    cartreducer,
    user: authReducer
});


export default rootred
