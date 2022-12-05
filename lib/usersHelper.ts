const APP_URL: any = process.env.NEXT_PUBLIC_APP_URL;

// GET all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${APP_URL}/api/users`);
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
};

// GET single user
export const getUser = async (userId: string) => {
  try {
    const response = await fetch(`${APP_URL}/api/users/${userId}`);
    const json = await response.json();

    if (json) return json;

    return {};
  } catch (error) {
    return error;
  }
};

// Update single user
export const updateUser = async (userId: string, formData: string) => {
  try {
    const Options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${APP_URL}/api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};
