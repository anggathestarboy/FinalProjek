const initialTema = "Gelap";

const temaReducer = (state = initialTema, action) => {
  switch (action.type) {
    case "SET_TEMA":
      return action.payload;
    default:
      return state;
  }
};


export default temaReducer;