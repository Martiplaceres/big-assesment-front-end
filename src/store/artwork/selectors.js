export const selectArtworks = (reduxState) =>
  reduxState.artworkReducer.artworks;

export const selectArtworkById = () => {
  return (reduxState) => {
    return reduxState.artworkReducer.artworkDetails;
  };
};
