import axios from "axios";

export function startLoadingArtworks() {
  return {
    type: "ARTWORKS/startloading",
  };
}

export function fetchedAllArtworks(data) {
  return {
    type: "ARTWORKSWITHBIDS/get",
    payload: data,
  };
}

export function fetchedArtworkById(data) {
  return {
    type: "ARTWORKBYID/get",
    payload: data,
  };
}

export function fetchAllArtworks() {
  return async function thunk(dispatch, getState) {
    dispatch(startLoadingArtworks());

    const response = await axios.get("http://localhost:4000/artwork");
    // console.log("artworks:", response);
    dispatch(fetchedAllArtworks(response.data));
  };
}

export function fetchArtworkById(id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoadingArtworks());
    const response = await axios.get(`http://localhost:4000/artwork/${id}`);
    dispatch(fetchedArtworkById(response.data));
  };
}
