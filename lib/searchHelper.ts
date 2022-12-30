const APP_URL: string = process.env.NEXT_PUBLIC_APP_URL || '';

type FormData = {
  tickers: string;
  user: string;
};

// POST a new search
export const addSearch = async (formData: FormData) => {
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
