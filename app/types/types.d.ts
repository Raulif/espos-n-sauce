export type PromptPayload = {
  wantedIngredients: string[];
  notWantedIngredients: string[];
  lastRecipes: string[];
  veryDifferent: boolean;
  additionalCharacteristics: string[];
  difficulty: string;
};
