export const LosersCard = () => {
  return (
    <>
      <div className="bg-red-200 grid grid-cols-12 h-40 rounded-3xl px-4 py-4 shadow-md shadow-gray-500 dark:shadow-none">
        {/* Column 1 */}
        <div className="col-start-1 col-span-9 ">
          <div className="flex flex-col items-center justify-between h-full">
            <div className="text-center">
              <span className="mt-4 text-red-600">Top Loser of the Day</span>
              <h1 className="text-xl font-bold dark:text-black">Apple Inc</h1>
            </div>
            <div className="flex justify-between w-full items-center">
              <span className="font-bold text-red-600">$1.50</span>
              <span className="font-bold bg-red-300 px-4 py-1 rounded-full text-red-600">
                -2.25%
              </span>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="col-start-10 col-span-3">
          <div className="flex justify-center items-center h-full">
            <div className="bg-red-300 aspect-square flex justify-center items-center p-4 rounded-full font-bold text-red-600">
              AAPL 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
