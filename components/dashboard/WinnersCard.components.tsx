export const WinnersCard = () => {
  return (
    <>
      <div className="bg-green-200 grid grid-cols-12 h-40 rounded-3xl px-4 py-4 shadow-md shadow-gray-500">
        {/* Column 1 */}
        <div className="col-start-1 col-span-9 ">
          <div className="flex flex-col items-center justify-between h-full">
            <div className="text-center">
              <span className="mt-4 text-green-800">Top Winner of the Day</span>
              <h1 className="text-xl font-bold">Apple Inc</h1>
            </div>
            <div className="flex justify-between w-full items-center">
              <span className="font-bold text-green-800">$1.50</span>
              <span className="font-bold bg-green-300 px-4 py-1 rounded-full text-green-800">
                +2.25%
              </span>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="col-start-10 col-span-3">
          <div className="flex justify-center items-center h-full">
            <div className="bg-green-300 aspect-square flex justify-center items-center p-4 rounded-full font-bold text-green-800">
              AAPL
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
