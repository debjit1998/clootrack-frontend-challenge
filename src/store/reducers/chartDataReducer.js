const chartDataReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_DATA:
      return action.payload;
    case actions.CHANGE_DATA: {
      if (action.payload.type === "Bar") {
        const { itemIndex, elIndex, value } = action.payload;
        let newState = [];
        state.forEach((item, index) => {
          if (index === itemIndex) {
            let el = [...item.elements];
            el[elIndex] = value;
            newState.push({ ...item, elements: el });
          } else {
            newState.push({ ...item, elements: [...item.elements] });
          }
        });
        return newState;
      } else {
        const { itemIndex, elIndex, value } = action.payload;
        let newState = [];
        state.forEach((item, index) => {
          if (index === itemIndex) {
            let el = [...item.elements].map((_, index) => {
              if (index === elIndex) return value;
              return (100 - value) / (item.elements.length - 1);
            });

            newState.push({ ...item, elements: el });
          } else {
            newState.push({ ...item, elements: [...item.elements] });
          }
        });
        return newState;
      }
    }

    default:
      return state;
  }
};

export const actions = {
  ADD_DATA: "ADD_DATA",
  CHANGE_DATA: "CHANGE_DATA",
};

export default chartDataReducer;
