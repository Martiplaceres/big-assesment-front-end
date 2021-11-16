import axios from "axios";

import { selectToken } from "../user/selectors";

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

export function updateAuctionErrorMessage(message) {
  return {
    type: "AUCTIONERROS/set",
    payload: message,
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

export const startAuction = (title, minimumBid, imageUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.post(
        `http://localhost:4000/artwork/auction`,
        {
          title,
          minimumBid,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      dispatch(fetchAllArtworks());
      // dispatch(auctionCreatedSuccesfully("Message"));
    } catch (e) {
      console.error(e);
      // dispatch(auctionCreatedSuccesfully(false))
    }
  };
};
