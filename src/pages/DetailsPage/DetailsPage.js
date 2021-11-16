import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectArtworkById } from "../../store/artwork/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import { useParams } from "react-router";
import { fetchArtworkById } from "../../store/artwork/actions";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const artwork = useSelector(selectArtworkById(id));
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [amount, setAmount] = useState(0);
  const [errorBidMessage, setErrorBidMessage] = useState("");

  useEffect(() => {
    dispatch(fetchArtworkById(id));
    setAmount(0);
  }, []);

  console.log("My artwork:", artwork);
  if (!artwork) return <h1>Loading...</h1>;
  const highestScore = Math.max(...artwork.bids.map((bid) => bid.amount));
  const minBidValue = highestScore + 1;
  return (
    <Container>
      <Row>
        <Col>
          <h2>
            All what you need to know about:
            <br />"{artwork.title}"{" "}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            style={{
              width: 600,
            }}
            src={artwork.imageUrl}
            alt=""
          />
          ♥{artwork.hearts}{" "}
          <button
            onClick={async () => {
              await axios.patch(`http://localhost:4000/artwork/${id}/like`);
              dispatch(fetchArtworkById(id));
            }}
          >
            Give heart{" "}
          </button>
        </Col>
        <Col>
          <Table>
            <thead>
              <tr>
                <td>Email:</td>
                <td>Offer:</td>
              </tr>
            </thead>
            <tbody>
              {artwork.bids.map((bid) => {
                return (
                  <tr key={bid.id}>
                    <td>{bid.email}</td>
                    <td>{bid.amount}</td>
                  </tr>
                );
              })}
            </tbody>
            {token && user && (
              <div>
                Amount{" "}
                <input
                  type="number"
                  placeholder="Amount"
                  min={minBidValue}
                  //value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  onClick={async () => {
                    try {
                      await axios.post(
                        `http://localhost:4000/artwork/${id}/bid`,
                        {
                          email: user.email,
                          amount: amount,
                        },
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );
                      dispatch(fetchArtworkById(id));
                      setAmount(0);
                      setErrorBidMessage("");
                    } catch (e) {
                      if (e.response) {
                        setErrorBidMessage(e.response.data);
                      } else {
                        setErrorBidMessage("Cannot create an artowork");
                      }
                    }
                  }}
                >
                  Bid
                </button>
                {errorBidMessage && <p>{errorBidMessage}</p>}
              </div>
            )}
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
