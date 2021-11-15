import { fetchAllArtworks } from "../../store/artwork/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectArtworks } from "../../store/artwork/selectors";
import { Link } from "react-router-dom";
export default function HomePage() {
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);
  // console.log("artworkssss:", artworks);

  useEffect(() => {
    dispatch(fetchAllArtworks());
  }, [dispatch]);
  return (
    <div>
      {artworks.map((artwork) => {
        return (
          <div
            key={artwork.id}
            style={{
              textAlign: "center",
              marginTop: 30,
            }}
          >
            <h3>{artwork.title}</h3>
            <img
              style={{
                width: 300,
              }}
              src={artwork.imageUrl}
              alt="image"
            />
            <br />
            <Link to={`details/${artwork.id}`}>Details</Link>
            <p>
              {" "}
              ♥{artwork.hearts} - 🤑{artwork.bids.length}
            </p>
          </div>
        );
      })}
    </div>
  );
}
