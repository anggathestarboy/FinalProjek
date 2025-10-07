const initialBahasa = "Indonesia";

const BahasaReducer = (state = initialBahasa, action) => {
  switch (action.type) {
    case "SET_BAHASA":
      return action.payload;
    default:
      return state;
  }
};


export default BahasaReducer;