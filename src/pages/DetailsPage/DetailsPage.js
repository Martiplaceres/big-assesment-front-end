import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectArtworkById } from "../../store/artwork/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import { useParams } from "react-router";
import { fetchArtworkById } from "../../store/artwork/actions";
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
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>
        All what you need to know about:
        <br />"{artwork.title}"
      </h1>
      <img
        style={{
          width: 600,
        }}
        src={artwork.imageUrl}
        alt=""
      />
      <p>
        {" "}
        ♥{artwork.hearts}{" "}
        <button
          onClick={async () => {
            await axios.patch(`http://localhost:4000/artwork/${id}/like`);
            dispatch(fetchArtworkById(id));
          }}
        >
          Give heart
        </button>
        <br />
        🤑{artwork.bids.length}:
        <br />
      </p>
      <table>
        <thead>
          <tr>
            <td>User</td>
            <td>Offer</td>
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
      </table>
      <br />
      {token && user && (
        <div>
          Amount{" "}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={async () => {
              const highestScore = Math.max(
                ...artwork.bids.map((bid) => bid.amount)
              );

              const minimumBid =
                highestScore > 0 ? highestScore : artwork.minimumBid;

              if (amount <= minimumBid) {
                setErrorBidMessage(
                  `Amount should be more than ${highestScore}`
                );
                return;
              }
              await axios.post(`http://localhost:4000/artwork/${id}/bid`, {
                email: user.email,
                amount: amount,
              });
              dispatch(fetchArtworkById(id));
              setAmount(0);
              setErrorBidMessage("");
            }}
          >
            Bid
          </button>
          {errorBidMessage && <p>{errorBidMessage}</p>}
        </div>
      )}
    </div>
  );
}
