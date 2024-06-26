import axios from "axios";

export const useWakeUpSheriff = () => {
  const wakeUpSheriff = async (roomId) => {
    try {
      const response = await axios.post(
        `https://showtimeserver-production.up.railway.app/api/game/${roomId}/wake-up-sheriff`
      );
    } catch (error) {
      console.error("There was an error with starting the game:", error);
    }
  };

  return wakeUpSheriff;
};
