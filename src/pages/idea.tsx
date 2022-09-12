import { useState } from "react";
import TinderCard from "react-tinder-card";

export default function Software() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);

    const prompt = dataObj.topic;
    setLoading(true);

    const response = await fetch("/api/code/idea", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    let formatted = result.replace(/(\r\n|\n|\\n|\r)/gm, ` \n `);

    setData(formatted);
    setLoading(false);
  };

  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
    if (direction === "right") {
      console.log("You liked it");
    } else if (direction === "left") {
      console.log("You disliked it");
    }
  };

  return (
    <>
      <div>
        {loading ? <p>Loading...</p> : null}
        <form onSubmit={handleSubmit}>
          <select
            name="topic"
            id=""
            className="md:text-xl text-base resize rounded-md my-5 mx-5 py-3 md:py-5 px-3 md:px-5 text-third border-2 border-third"
          >
            <option value="software">Software</option>
            <option value=" new business">Business</option>
          </select>
          <button
            type="submit"
            className="bg-third text-base md:text-xl text-secondary mt-10 rounded  px-8 md:px-10 py-2 md:my-4 my-2 hover:bg-secondary hover:text-third border-2 border-third"
          >
            Generate
          </button>
        </form>
        <div className="cardContainer">
          <TinderCard
            className="swipe"
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
            onSwipeRequirementFulfilled={onSwipe}
          >
            <h3>{data}</h3>
          </TinderCard>
        </div>
      </div>
    </>
  );
}
