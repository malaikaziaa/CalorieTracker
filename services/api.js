const API_URL = "http://192.168.10.2:3000/api";

export const getMealsByDate = async (date, user) => {
  try {
    const response = await fetch(
      `${API_URL}/meals/${user}/${date.toISOString().split("T")[0]}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching meals: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getMealsByDate:", error);
    throw error;
  }
};

export const addMeal = async (meal) => {
  try {
    const response = await fetch(`${API_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error adding meal: ${response.statusText} - ${errorMessage}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in addMeal:", error);
    throw error;
  }
};
