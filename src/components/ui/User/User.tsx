import FilesUpload from "./FilesUpload";
import Graph from "./Graph";
import NavBar from "./NavBar";
import OverView from "./OverView";
import VendorExpense from "./VendorExpense";

const User = () => {
  return (
     <>
      <FilesUpload />
      <div className="h-auto relative flex flex-col justify-center items-center bg-[#161616]">
        <NavBar />
        <h1 className="font-impact text-5xl text-white p-6 mt-6">Dashboard</h1>
        <div className="border border-gray-50 rounded-2xl p-6 mb-6 flex flex-col justify-center items-center shadow-neumorphic scale-100">
          <OverView />
          <Graph />
          <VendorExpense />
        </div>
      </div>
    </>
  );
};

export default User;
