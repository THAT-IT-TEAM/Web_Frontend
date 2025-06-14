import { SlideTabs } from "./SlideTabs";
import { TbLogout } from "react-icons/tb";
import { logout } from "../auth";

const NavBar = () => {

    const handleLogOut = async ()=>{
        await logout();

    }

  return (
    <>
      <div className="h-[10vh] bg-black w-full flex items-center  z-20">
        <h1 className="text-white font-ortland text-5xl px-5">Expensync</h1>
        <SlideTabs />
          <TbLogout onClick={()=>handleLogOut()} className="text-white absolute right-5 h-12 w-12"/>
      </div>
    </>
  );
};

export default NavBar;
