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
}

interface Actions {
  setRecipe: (recipe: Recipe) => void;
  setRetrying: (retrying: boolean) => void;
  addWantedIngredient: (ingredient: string) => void;
  addNotWantedIngredient: (ingredient: string) => void;
  removeWantedIngredient: (ingredient: string) => void;
  removeNotWantedIngredient: (ingredient: string) => void;
  setVeryDifferent: (veryDifferent: boolean) => void;
}

export const useRecipeStore = create<Store & Actions>()((set) => ({
  recipe: emptyRecipe,
  retrying: false,
  wantedIngredients: [],
  notWantedIngredients: [],
  veryDifferent: false,
  setRecipe: (recipe: Recipe) => set({ recipe }),
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
}));
