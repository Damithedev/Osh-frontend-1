export const getActiveFacet = (activeFacet) => {
  console.log("active facet from func", activeFacet);
  return (dispatch) => {
    dispatch({
      type: "GET_ACTIVE_FACET",
      data: activeFacet,
    });
  };
};
