import axios from "axios";

export const useWakeUpSheriff = () => {
  const wakeUpSheriff = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4200/api/game/1/wake-up-sheriff`
      );
    } catch (error) {
      console.error("There was an error with starting the game:", error);
    }
  };

  return wakeUpSheriff;
};
