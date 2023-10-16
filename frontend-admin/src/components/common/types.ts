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

// Create a reverse mapping object
const neighbourhoodReverseMapping: { [key: string]: Neighbourhood } = {
  [Neighbourhood.COTEDENEIGES]: Neighbourhood.COTEDENEIGES,
  [Neighbourhood.COTESTLUC]: Neighbourhood.COTESTLUC,
  [Neighbourhood.DOWNTOWN]: Neighbourhood.DOWNTOWN,
  [Neighbourhood.LACHINE]: Neighbourhood.LACHINE,
  [Neighbourhood.LAVAL]: Neighbourhood.LAVAL,
  [Neighbourhood.MONTREAL]: Neighbourhood.MONTREAL,
  [Neighbourhood.MONTREALWEST]: Neighbourhood.MONTREALWEST,
  [Neighbourhood.TMR]: Neighbourhood.TMR,
  [Neighbourhood.VERDUN]: Neighbourhood.VERDUN,
  [Neighbourhood.VILLESTLAURENT]: Neighbourhood.VILLESTLAURENT,
  [Neighbourhood.WESTISLAND]: Neighbourhood.WESTISLAND,
};

export function getNeighborhoodFromString(str: string): Neighbourhood {
  return neighbourhoodReverseMapping[str];
}