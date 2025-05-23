import { create } from "zustand";

const emptyRecipe = {
  title: "",
  ingredients: [],
  steps: [],
  rawText: "",
};

export type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
  rawText: string;
};

interface Store {
  recipe: Recipe;
  retrying: boolean;
  wantedIngredients: Array<string>;
  notWantedIngredients: Array<string>;
  veryDifferent: boolean;
  fetching: boolean;
  recipeCollection: Array<Recipe>;
  additionalCharacteristics: Array<string>;
  difficulty: string;
}

interface Actions {
  setRecipe: (recipe: Recipe) => void;
  setRetrying: (retrying: boolean) => void;
  addWantedIngredient: (ingredient: string) => void;
  addNotWantedIngredient: (ingredient: string) => void;
  removeWantedIngredient: (ingredient: string) => void;
  removeNotWantedIngredient: (ingredient: string) => void;
  setVeryDifferent: (veryDifferent: boolean) => void;
  setFetching: (fetching: boolean) => void;
  clearRecipe: () => void;
  addAdditionalCharacteristic: (characteristic: string) => void;
  removeAdditionalCharacteristic: (characteristic: string) => void;
  setDifficulty: (diffulty: string) => void;
}

export const useRecipeStore = create<Store & Actions>()((set) => ({
  recipe: emptyRecipe,
  recipeCollection: [],
  retrying: false,
  wantedIngredients: [],
  notWantedIngredients: [],
  veryDifferent: false,
  fetching: false,
  additionalCharacteristics: [],
  difficulty: '',
  setRecipe: (recipe: Recipe) =>
    set((state) => {
      const collection = [...state.recipeCollection];
      collection.push(recipe);
      return { recipe, recipeCollection: collection };
    }),
  setRetrying: (retrying) => set({ retrying }),
  addWantedIngredient: (ingredient) =>
    set((state) => {
      if (state.wantedIngredients.includes(ingredient)) return state;
      return {
        wantedIngredients: [...state.wantedIngredients, ingredient],
      };
    }),
  addNotWantedIngredient: (ingredient) =>
    set((state) => {
      if (state.notWantedIngredients.includes(ingredient)) return state;
      return {
        notWantedIngredients: [...state.notWantedIngredients, ingredient],
      };
    }),
  removeWantedIngredient: (ingredient) =>
    set((state) => {
      if (!state.wantedIngredients.includes(ingredient)) return state;
      return {
        wantedIngredients: state.wantedIngredients.filter(
          (wi) => wi !== ingredient
        ),
      };
    }),
  removeNotWantedIngredient: (ingredient) =>
    set((state) => {
      if (!state.notWantedIngredients.includes(ingredient)) return state;
      return {
        notWantedIngredients: state.notWantedIngredients.filter(
          (nwi) => nwi !== ingredient
        ),
      };
    }),
  setVeryDifferent: (veryDifferent) => set({ veryDifferent }),
  setFetching: (fetching) => set({ fetching }),
  clearRecipe: () =>
    set((state) => {
      if (state.recipe.title) {
        return { recipe: emptyRecipe };
      } else {
        return state;
      }
    }),
  addAdditionalCharacteristic: (characteristic) =>
    set((state) => {
      if (state.additionalCharacteristics.includes(characteristic))
        return state;
      return {
        additionalCharacteristics: [
          ...state.additionalCharacteristics,
          characteristic,
        ],
      };
    }),
  removeAdditionalCharacteristic: (characteristic) =>
    set((state) => {
      if (!state.additionalCharacteristics.includes(characteristic))
        return state;
      return {
        additionalCharacteristics: state.additionalCharacteristics.filter(
          (addCh) => addCh !== characteristic
        ),
      };
    }),
    setDifficulty: (difficulty) => set({difficulty})
}));
