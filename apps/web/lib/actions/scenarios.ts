export const getCurrentScenarioSession = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const data = await fetch(
    "https://api.mentalconnect.app/api/scenarios/get_scenario_session",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await data.json();

  return json;
};
