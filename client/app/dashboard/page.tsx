import Image from "next/image";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-blue-500/25 p-2 text-blackv flex justify-center">
      <div className="max-w-[1280px] w-full grid grid-col-5 gap-3">
        <div className="col-span-5 h-[10vh] bg-slate-600/10 rounded-lg px-5 py-2 backdrop-blur-[10px]">
          <nav>
            <ul className="p-3 flex items-start justify-end style-none">
              <li className="mr-auto h-[50px]">
                <h1 className="font-black text-2xl text-blue-500">
                  Expenses-tracker.
                </h1>
              </li>
              <li className="w-[45px] h-[45px] rounded-[50%] border border-white p-3 flex items-center justify-center overflow-hidden shadow-md shadow-slate-100/50 cursor-pointer">
                <img src="" width={"100%"} alt="" />
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-span-1 w-full h-[90vh] bg-slate-600/10 rounded-lg px-5 py-3">
          <nav>
            <ul className="style-none flex flex-col items-center justify-start">
              <li>
                <h2 className="font-black text-xl text-blue-500">Category.</h2>
              </li>
            </ul>
          </nav>
          <div className="flex justify-end mt-5">
            <span className="w-full text-lg text-end font-thin text-slate-300 cursor-pointer mr-5">
              +
            </span>
          </div>
          <hr className="border-slate-500 mx-2" />
        </div>

        <div className="col-span-3 w-full h-[90vh] bg-slate-600/10 rounded-lg px-10 py-7">
          <div>
            <h2 className="font-black text-xl text-blue-500">Expenses</h2>
          </div>
          <div className="flex justify-end mt-5">
            <span className="w-full text-lg text-end font-thin text-slate-300 cursor-pointer mr-5">
              +
            </span>
          </div>
          <hr className="border-slate-500 mx-2 mt-2" />
        </div>

        <div className="col-span-1 w-full h-[90vh] bg-slate-600/10 rounded-lg px-5 py-3">
          <h1 className="font-black text-xl text-blue-500">Total Amount</h1>
          <hr className="border-slate-500 mx-2 mt-6" />
          <div className="mt-5">
            <ul className="leading-[25px]">
              <li>
                <h6 className="text-md text-slate-400 font-thin">
                  Total amount:
                </h6>
              </li>
              <li>
                <h6 className="text-md text-slate-400 font-thin">
                  Total expenses:
                </h6>
              </li>
              <li>
                <h6 className="text-md text-slate-400 font-thin">
                  Total income:
                </h6>
              </li>
            </ul>
            <hr className="border-slate-500 mx-2 mt-6" />
            <p className="mt-4 text-md text-slate-400 font-thin">
              Profit/loss:
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
