import FilesUpload from "./FilesUpload";
const OverView = () => {
  return (
    <div className="p-6 m-6 rounded-2xl  bg-[#141414] border border-gray-50 relative">
      {/* <FilesUpload /> */}
      <h1 className=" text-white font-impact text-4xl mb-6 ml-3 ">Overview</h1>
      <div className="h-auto ">
        <div className="flex gap-14 justify-center">
          <div className="h-[25vh] w-[35vh]  font-impact font-3xl  shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem] font-bold  overflow-hidden transition-all duration-400 ease-in-out ">
            <div className="flex flex-col m-3">
              <div className="font-eudoxussans text-white text-2xl  m-3">
                Total Revenue
              </div>
              <div className="font-eudoxussans text-white text-5xl m-3">
                ₹2,68,419
              </div>
              <div className="font-eudoxussans text-green-500 text-2xl m-3">
                +18%
              </div>
            </div>
          </div>
          <div className="h-[25vh] w-[35vh]  font-impact font-3xl  shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem] font-bold  overflow-hidden transition-all duration-400 ease-in-out ">
            <div className="flex flex-col m-3">
              <div className="font-eudoxussans text-white text-2xl  m-3">
                New Vendors
              </div>
              <div className="font-eudoxussans text-white text-5xl m-3">32</div>
              <div className="font-eudoxussans text-green-500 text-2xl m-3">
                +8%
              </div>
            </div>
          </div>
          <div className="h-[25vh] w-[35vh]  font-impact font-3xl  shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem] font-bold  overflow-hidden transition-all duration-400 ease-in-out">
            <div className="flex flex-col m-3">
              <div className="font-eudoxussans text-white text-2xl  m-3">
                Active Projects
              </div>
              <div className="font-eudoxussans text-white text-5xl m-3">15</div>
              <div className="font-eudoxussans text-green-500 text-2xl m-3">
                +5%
              </div>
            </div>
          </div>
          <div className="h-[25vh] w-[35vh]  font-impact font-3xl  shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem] font-bold  overflow-hidden transition-all duration-400 ease-in-out">
            <div className="flex flex-col m-3">
              <div className="font-eudoxussans text-white text-2xl  m-3">
                Audit sync rate
              </div>
              <div className="font-eudoxussans text-white text-5xl m-3">
                98%
              </div>
              <div className="font-eudoxussans text-green-500 text-2xl m-3">
                +2%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
