import { useRecipeStore } from "../stores/useRecipeStore";
import { AnimatedHeightContainer } from "./AnimatedHeightContainer";

export const NotWantedIngredientsList = () => {
  const { notWantedIngredients, retrying } = useRecipeStore();
  return (
    <AnimatedHeightContainer show={!!notWantedIngredients.length && retrying}>
      <h3>Try without these</h3>
      <ul className="not-available-list">
        {notWantedIngredients?.map((nwIng, ind) => (
          <li key={`${nwIng}-${ind}`}>
            <span>{nwIng}</span>
          </li>
        ))}
      </ul>
    </AnimatedHeightContainer>
  );
};
