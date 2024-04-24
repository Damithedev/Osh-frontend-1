const initialState = {
  data: "",
};

const activeFacetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ACTIVE_FACET":
      return {
        data: action.data,
      };
    default:
      return {
        data: "",
      };
  }
};

export default activeFacetReducer;
