import { fetchAllArtworks } from "../../store/artwork/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectArtworks } from "../../store/artwork/selectors";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
export default function HomePage() {
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);
  // console.log("artworkssss:", artworks);

  useEffect(() => {
    dispatch(fetchAllArtworks());
  }, [dispatch]);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
      }}
    >
      {artworks.map((artwork) => {
        return (
          <div style={{ width: "18rem", padding: "5px" }}>
            <Card style={{ width: "18rem" }} key={artwork.id}>
              <Card.Img
                variant="top"
                src={artwork.imageUrl}
                width={100}
                height={200}
              />
              <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Text>
                  ♥{artwork.hearts} - 🤑{artwork.bids.length}
                </Card.Text>
                <Link to={`details/${artwork.id}`}>Details</Link>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
