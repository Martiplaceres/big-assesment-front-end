import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectToken } from "../../store/user/selectors";
import { fetchAllArtworks } from "../../store/artwork/actions";
import axios from "axios";

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
        setMessage("Cannot create an artowork");
      }
    }
  }

  return (
    <div>
      <h1>Create a new auction with your artwork!</h1>
      <div>
        <form>
          <label for="title">Title:</label>
          <br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
          />

          <br />
          <label for="minimum bid">Minimum Bid:</label>
          <br />
          <input
            value={minimumBid}
            onChange={(e) => setMinimumBid(e.target.value)}
            type="number"
            id="minimum bid"
            name="minimum bid"
          />
          <br />
          <label for="image">Your artwork image:</label>
          <br />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            id="image"
            name="image"
          />
        </form>
        <button type="submit" onClick={submitForm}>
          Submit
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}
