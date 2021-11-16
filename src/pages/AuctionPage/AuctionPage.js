import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectToken } from "../../store/user/selectors";
import { fetchAllArtworks } from "../../store/artwork/actions";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function AuctionPage() {
  const [title, setTitle] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  async function submitForm(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/artwork/auction`,
        {
          title,
          minimumBid,
          imageUrl: image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      dispatch(fetchAllArtworks());
      setMessage(`Artwork ${title} created succesfully`);
      setMinimumBid(0);
      setImage("");
      setTitle("");
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data);
      } else {
        setMessage("Cannot create an artwwork");
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Create a new auction with for artwork!</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                name="title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Minimum Bid</Form.Label>
              <Form.Control
                value={minimumBid}
                placeholder="Enter minimum bid"
                onChange={(e) => setMinimumBid(e.target.value)}
                type="number"
                id="minimum bid"
                name="minimum bid"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Artwork image</Form.Label>
              <Form.Control
                value={image}
                placeholder="Enter image url"
                onChange={(e) => setImage(e.target.value)}
                type="text"
                id="image"
                name="image"
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitForm}>
              Submit
            </Button>
            <p>{message}</p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
