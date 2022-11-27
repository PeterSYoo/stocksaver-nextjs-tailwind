export const TickerCard = () => {
  return (
    <>
      <div className="bg-[#F1F6FA] flex flex-col justify-between rounded-3xl shadow-md shadow-gray-500 px-3 py-2 h-28">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-sm">AAPL</span>
            <span className="text-xs">Apple Inc</span>
          </div>
          <div className="text-sm font-bold">$148.28</div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-end text-xs">Daily</div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-green-800">$1.50</span>
            <span className="text-xs font-bold bg-green-300 text-green-800 px-2 py-1 rounded-full">
              +2.25%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
