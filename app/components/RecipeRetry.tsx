import { useSauce } from "../hooks/useGetSauce";
import { useRecipeStore } from "../stores/useRecipeStore";

export const RecipeRetry = () => {
  const { generateRecipe } = useSauce();
  const { notWantedIngredients, setVeryDifferent, veryDifferent } = useRecipeStore();
  
  if (!notWantedIngredients?.length) return;
  return (
    <>
      <h4>Ingredients not available</h4>
      <ul>
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
