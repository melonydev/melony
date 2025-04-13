export const loginAction = async (payload: {
  username: string;
  password: string;
}) => {
  const data = await fetch("https://api.mentalconnect.app/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await data.json();

  if (data.status !== 200) {
    throw new Error("Failed to login");
  }

  localStorage.setItem("token", json.token);

  return json;
};

export const getProfileAction = async () => {
  const token = localStorage.getItem("token");

  const data = await fetch(
    "https://api.mentalconnect.app/api/profiles/get_profile",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data.status !== 200) {
    throw new Error("Failed to get profile");
  }

  const json = await data.json();

  return json;
};
