const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;
const APP_URL: any = process.env.NEXT_PUBLIC_APP_URL;

// Get ticker price object from API
export const getPrice = async (ticker: any) => {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`
    );
    const json = await response.json();

    if (json) return json;

    return {};
  } catch (error) {
    return error;
  }
};

// Get ticker company information object from API
export const getCompany = async (ticker: any) => {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`
    );
    const json = await response.json();

    if (json) return json;

    return {};
  } catch (error) {
    return error;
  }
};

// Get tickers associated with user from mongo
const getUserTickers = async (userId: string) => {
  try {
    const response = await fetch(`${APP_URL}/api/find-tickers/${userId}`);
    const json = await response.json();

    if (json) return json;

    return {};
  } catch (error) {
    return error;
  }
};

// Delete ticker based on ticker symbol
export const deleteTicker = async (ticker: string) => {
  try {
    const Options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`${APP_URL}/api/tickers/${ticker}`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
};
