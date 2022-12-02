const APP_URL: any = process.env.NEXT_PUBLIC_APP_URL;

export const getUserTickers = async (userId: string) => {
  const response = await fetch(`${APP_URL}/api/find-tickers/${userId}`);
  const json = await response.json();

  if (json) return json;

  return {};
};
