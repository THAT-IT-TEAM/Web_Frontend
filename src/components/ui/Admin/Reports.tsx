import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Reports = () => {
    const navigate = useNavigate();
  return (
    <div className="p-6 m-6 rounded-2xl  bg-[#141414] border border-gray-50 relative">
        <IoIosClose className="h-[60px] w-[60px] text-white" onClick={()=>{navigate("/admin")}}/>
<button className="bg-blue-500 text-white font-eudoxussans font-bold p-5 m-5 rounded-xl absolute right-10">Create Report</button>
      <h1 className=" text-white font-impact text-6xl mb-6 ml-3 text-center">Reports</h1>
      <div className="h-auto ">
        <div className="flex flex-col justify-center items-center">
          <div className="h-auto w-auto flex flex-col   font-impact font-3xl my-16 shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem]  overflow-hidden transition-all duration-400 ease-in-out  ">
        <div className="font-eudoxussans text-3xl text-white">
        <p className="font-bold p-2 m-2">ID: <span className="text-gray-50 font-normal">bd5195d3-8db6-4asdf4asdfg-b68d-f485942e044a</span></p>
        <p className="font-bold p-2 m-2">Amount: <span className="text-gray-50 font-normal">2,00,000</span></p>
                <p className="font-bold p-2 m-2">Currency: <span className="text-gray-50 font-normal px-2">₹</span></p>
                <p className="font-bold p-2 m-2">Transaction Date: <span className="text-gray-50 font-normal">21-10-2025</span></p>
                      <p className="font-bold p-2 m-2">Vendor Name: <span className="text-gray-50 font-normal"> Pizza Hut</span></p>
                      <p className="font-bold p-2 m-2">Category: <span className="text-gray-50 font-normal">Food</span></p>
                      <p className="font-bold p-2 m-2">Description: <span className="text-gray-50 font-normal">Had Dinner is Dominos with my teammates..</span></p>
                       <p className="font-bold p-2 m-2">Status: <span className="text-gray-50 font-bold bg-yellow-600 p-2 m-2 rounded-xl">Completed</span> <span className="text-gray-50 font-bold bg-blue-600 p-2 m-2 rounded-xl">Edit</span></p>
        </div>
</div>

          <div className="h-auto w-auto flex flex-col   font-impact font-3xl  my-16 shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem]  overflow-hidden transition-all duration-400 ease-in-out ">
        <div className="font-eudoxussans text-3xl text-white">
        <p className="font-bold p-2 m-2">ID: <span className="text-gray-50 font-normal">bd5195d3-8db6-41f6-b68d-f485942e044a</span></p>
        <p className="font-bold p-2 m-2">Amount: <span className="text-gray-50 font-normal">1,00,000</span></p>
                <p className="font-bold p-2 m-2">Currency: <span className="text-gray-50 font-normal px-2">₹</span></p>
                <p className="font-bold p-2 m-2">Transaction Date: <span className="text-gray-50 font-normal">02-10-2025</span></p>
                      <p className="font-bold p-2 m-2">Vendor Name: <span className="text-gray-50 font-normal">Dominos Pizza</span></p>
                      <p className="font-bold p-2 m-2">Category: <span className="text-gray-50 font-normal">Food</span></p>
                      <p className="font-bold p-2 m-2">Description: <span className="text-gray-50 font-normal">Had lunch is Dominos with my teammates..</span></p>
                       <p className="font-bold p-2 m-2">Status: <span className="text-gray-50 font-bold bg-green-600 p-2 m-2 rounded-xl">Active</span><span className="text-gray-50 font-bold bg-blue-600 p-2 m-2 rounded-xl">Edit</span></p>
        </div>
</div>

 <div className="h-auto w-auto flex flex-col   font-impact font-3xl my-16 shadow-neumorphic rounded-3xl   boton-elegante relative px-6 py-3 border-2 border-[#2c2c2c] bg-[#141414] text-white text-[1.2rem]  overflow-hidden transition-all duration-400 ease-in-out ">
        <div className="font-eudoxussans text-3xl text-white">
        <p className="font-bold p-2 m-2">ID: <span className="text-gray-50 font-normal">ac5195d3-8db6-41f6-b68d-f485942e457a</span></p>
        <p className="font-bold p-2 m-2">Amount: <span className="text-gray-50 font-normal">28,000</span></p>
                <p className="font-bold p-2 m-2">Currency: <span className="text-gray-50 font-normal px-2">$</span></p>
                <p className="font-bold p-2 m-2">Transaction Date: <span className="text-gray-50 font-normal">01-11-2025</span></p>
                      <p className="font-bold p-2 m-2">Vendor Name: <span className="text-gray-50 font-normal">La Pinoz</span></p>
                      <p className="font-bold p-2 m-2">Category: <span className="text-gray-50 font-normal">Food</span></p>
                      <p className="font-bold p-2 m-2">Description: <span className="text-gray-50 font-normal">Had Brunch is La Pinoz with my teammates..</span></p>
                       <p className="font-bold p-2 m-2">Status: <span className="text-gray-50 font-bold bg-green-600 p-2 m-2 rounded-xl">Active</span><span className="text-gray-50 font-bold bg-blue-600 p-2 m-2 rounded-xl">Edit</span></p>
        </div>
</div>

</div>
      </div>
    </div>
  );
};

export default Reports;
