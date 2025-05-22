import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const GenerateButton = () => {
  const { recipe, fetching, wantedIngredients } = useRecipeStore();
  const { generateRecipe } = useSauce();
  return (
    !recipe?.title && (
      <button
        disabled={!wantedIngredients.length || fetching}
        className="generate-recipe button"
        onClick={() => generateRecipe()}
      >
        {fetching ? (
          <>
            Generating... <i className="fa fa-arrows-rotate" />
          </>
        ) : (
          <>
            Generate Sauce
            {wantedIngredients.length ? <i className="fa fa-rocket" /> : ""}
          </>
        )}
      </button>
    )
  );
};
