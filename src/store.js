import { createStore, combineReducers } from "redux";
import temaReducer from "./reducer/temaReducer";
import BahasaReducer from "./reducer/bahasaReducer";



const rootReducer = combineReducers({
  temaTotal: temaReducer,
  bahasaTotal: BahasaReducer
});


const store = createStore(rootReducer);

export default store;



