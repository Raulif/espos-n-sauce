import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const RecipeRetry = () => {
  const { generateRecipe } = useSauce();
  const { notWantedIngredients, setVeryDifferent, veryDifferent } =
    useRecipeStore();

  return (
    <div className="recipe-retry">
      <h3>Ingredients not available</h3>
      <ul className="not-available-list">
        {notWantedIngredients?.map((nwIng, ind) => (
          <li key={`${nwIng}-${ind}`}>
            <span>{nwIng}</span>
          </li>
        ))}
      </ul>
      <div className="recipe-retry-actions">
        <button className="button" onClick={() => generateRecipe(true)}>
          Try again
        </button>
        <button
          title="toggle trying a very different recipe"
          onClick={() => setVeryDifferent(!veryDifferent)}
          className={`very-different ghost-button ${veryDifferent ? "active" : ""}`}
        >
          <i className="fa fa-wand-magic-sparkles" />
        </button>
        {veryDifferent && (
          <span className="very-different-label">
            Make the next very different!
          </span>
        )}
      </div>
    </div>
  );
};
