const initialState = {
  loading: true,
  artworks: [],
};
export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case "ARTWORKS/startLoading": {
      return {
        ...state,
        loading: false,
      };
    }
    case "ARTWORKSWITHBIDS/get": {
      return {
        ...state,
        artworks: action.payload,
      };
    }
    case "ARTWORKBYID/get": {
      return {
        ...state,
        artworkDetails: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
