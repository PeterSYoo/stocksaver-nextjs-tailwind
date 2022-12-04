const APP_URL: any = process.env.NEXT_PUBLIC_APP_URL;

// POST a new search
export const addSearch = async (formData: any) => {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${APP_URL}/api/tickers/`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
};
