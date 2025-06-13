import { SlideTabs } from "./SlideTabs";

const NavBar = () => {
  return (
    <>
      <div className="h-[10vh] bg-black w-full flex items-center  z-20">
        <h1 className="text-white font-ortland text-5xl px-5">Expensync</h1>
        <SlideTabs />
        <div className="absolute rounded-full border border-gray-50 right-5">
          <img
            src="src\assets\images\profile.jpeg"
            alt="profile photo"
            className="object-contain rounded-full"
            height={50}
            width={50}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
