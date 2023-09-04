export enum MealType {
  VEGETARIAN = "Vegetarian",
  NOFISH = "No Fish",
  NOMEAT = "No Meat",
}

// Create a reverse mapping object
const mealTypeReverseMapping: { [key: string]: MealType } = {
  [MealType.VEGETARIAN]: MealType.VEGETARIAN,
  [MealType.NOFISH]: MealType.NOFISH,
  [MealType.NOMEAT]: MealType.NOMEAT,
};

export function getMealTypeFromString(str: string): MealType {
  return mealTypeReverseMapping[str];
}
