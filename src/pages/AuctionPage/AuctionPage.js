export default function AuctionPage() {
  return (
    <div>
      <h1>hello from auction page</h1>
      <div>
        <form>
          <label for="title">Title:</label>
          <br />
          <input type="text" id="title" name="title" />

          <br />
          <label for="minimun bid">Minimun Bid:</label>
          <br />
          <input type="text" id="minimun bid" name="minimun bid" />
        </form>
      </div>
    </div>
  );
}
