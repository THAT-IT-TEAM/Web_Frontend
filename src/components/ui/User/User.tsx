import FilesUpload from "./FilesUpload";
import Graph from "./Graph";
import NavBar from "./NavBar";
import OverView from "./OverView";
import VendorExpense from "./VendorExpense";

const User = () => {
  return (
    <div className="h-auto bg-[#161616] ">
      <NavBar />
      <div className="border border-gray-50 rounded-2xl py-4 px-10 m-4 flex flex-col justify-center items-center shadow-neumorphic scale-90">
        <OverView />
        <Graph />
        <VendorExpense />
        <FilesUpload />
      </div>
    </div>
  );
};

export default User;
