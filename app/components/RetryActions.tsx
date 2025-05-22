import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const RetryActions = () => {
  const { generateRecipe } = useSauce();
  const { recipe } = useRecipeStore();
  const { setVeryDifferent, veryDifferent, fetching } = useRecipeStore();

  if (!recipe.title) return;

  return (
    <div className="recipe-retry">
      <button
        className="button retry-button"
        onClick={() => generateRecipe(true)}
        disabled={fetching}
      >
        Try again
      </button>
      <button
        disabled={fetching}
        title="toggle trying a very different recipe"
        onClick={() => setVeryDifferent(!veryDifferent)}
        className={`very-different ghost-button ${veryDifferent ? "active" : ""}`}
      >
        <i className="fa fa-wand-magic-sparkles" />
      </button>
      {veryDifferent && (
        <span className="very-different-label">Surprise me!</span>
      )}
    </div>
  );
};
