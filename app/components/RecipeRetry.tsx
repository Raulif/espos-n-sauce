import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const RecipeRetry = () => {
  const { generateRecipe } = useSauce();
  const { notWantedIngredients, setVeryDifferent, veryDifferent } = useRecipeStore();
  
  if (!notWantedIngredients?.length) return;
  return (
    <>
      <h3>Ingredients not available</h3>
      <ul className="not-available-list">
        {notWantedIngredients?.map((nwIng, ind) => (
          <li key={`${nwIng}-${ind}`}>
            <span>{nwIng}</span>
          </li>
        ))}
      </ul>
      <button onClick={generateRecipe}>
        {`Try again ${veryDifferent ? 'something very different' : ''}`}
      </button>
      <button onClick={() => setVeryDifferent(!veryDifferent)}>{veryDifferent ? 'Not so different' : 'Very Different'}</button>
    </>
  );
};
