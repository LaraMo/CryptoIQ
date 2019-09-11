/**
 2 games --> easy, 
 3 games --> medium,
 4 games --> advanced
 **/
export const difficultyEnum = {
    EASY: {
      VALUE: "2",
      LABEL: "Easy, 2 Games"
    },
    MEDIUM: {
      VALUE: "3",
      LABEL: "Medium, 3 games"
    },
    ADVANCED: {
      VALUE: "4",
      LABEL: "Advanced, 4 games"
    }
  };
  
export function getEnumFrom(value) {
  return Object.keys(difficultyEnum).filter((val) => difficultyEnum[val]['VALUE'] === value);
}