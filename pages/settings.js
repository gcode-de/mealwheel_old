import useSWR from "swr";
import { useState } from "react";

export default function HomePage({ userId }) {
  const { data: user } = useSWR(`/api/users/${userId}`);
  const [numberOfRandomRecipes, setNumberOfRandomRecipes] = useState(2);

  const handleSliderChange = (event) => {
    setNumberOfRandomRecipes(parseInt(event.target.value, 10));
  };
  return (
    <div>
      👤 {user?.userName}
      <h1>Your settings 🥗</h1>
      <div>
        <input
          type="range"
          min="0"
          max="7"
          value={numberOfRandomRecipes}
          onChange={handleSliderChange}
        />
        <p>Random Recipes: {numberOfRandomRecipes}</p>
      </div>
    </div>
  );
}
