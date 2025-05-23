import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";
import { AnimatedButton } from "./AnimatedButton";

export const RetryActions = () => {
  const { generateRecipe } = useSauce();
  const { recipe } = useRecipeStore();
  const { setVeryDifferent, veryDifferent, fetching } = useRecipeStore();

  if (!recipe.title) return;

  return (
    <div className="retry-actions">
      <AnimatedButton
        disabled={fetching}
        animate={veryDifferent}
        onClick={() => generateRecipe(true)}
        classes="retry-button"
      >
        Try again
      </AnimatedButton>
   
      <button
        disabled={fetching}
        title="toggle trying a very different recipe"
        onClick={() => setVeryDifferent(!veryDifferent)}
        className={`very-different ghost-button ${veryDifferent ? "active" : ""}`}
      >
        <i className="fa fa-wand-magic-sparkles" />
        Make it very different
      </button>
    </div>
  );
};
