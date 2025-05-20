import { create } from "zustand";

interface IngredientStore {
  wantedIngredients: Array<string>;
  notWantedIngredients: Array<string>;
}

interface IngredientStoreActions {
  addWantedIngredient: (ingredient: string) => void;
  addNotWantedIngredient: (ingredient: string) => void;
  removeWantedIngredient: (ingredient: string) => void;
  removeNotWantedIngredient: (ingredient: string) => void;
}

export const useIngredientStore = create<
  IngredientStore & IngredientStoreActions
>()((set) => ({
  wantedIngredients: [],
  notWantedIngredients: [],
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
}));
