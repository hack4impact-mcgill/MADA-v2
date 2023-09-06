export enum MealType {
  VEGETARIAN = "Vegetarian",
  NOFISH = "No Fish",
  NOMEAT = "No Meat",
  REGULAR = "Regular",
}

// Create a reverse mapping object
const mealTypeReverseMapping: { [key: string]: MealType } = {
  [MealType.VEGETARIAN]: MealType.VEGETARIAN,
  [MealType.NOFISH]: MealType.NOFISH,
  [MealType.NOMEAT]: MealType.NOMEAT,
  [MealType.REGULAR]: MealType.REGULAR,
};

export function getMealTypeFromString(str: string): MealType {
  return mealTypeReverseMapping[str];
}

export enum Neighbourhood {
  COTEDENEIGES = "Côte De Neiges",
  COTESTLUC = "Côte St-Luc",
  DOWNTOWN = "Downtown",
  LACHINE = "Lachine",
  LAVAL = "Laval",
  MONTREAL = "Montreal",
  MONTREALWEST = "Montreal West",
  TMR = "Town of Mount Royal",
  VERDUN = "Verdun",
  VILLESTLAURENT = "Ville St-Laurent",
  WESTISLAND = "West Island",
}
