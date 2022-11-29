const APP_URL: any = process.env.NEXT_PUBLIC_APP_URL;

export const getUser = async (userId: any) => {
  const response = await fetch(`${APP_URL}/api/users/${userId}`);
  const json = await response.json();

  if (json) return json;

  return {};
};

export const updateUser = async (userId: any, formData: any) => {
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