const FilesUpload = () => {
  return (
    <>
      <div className="h-auto w-36 absolute top-5 right-5">
        <div className="relative  shadow-neumorphic border  bg-blue-500  border-blue-800 rounded-lg flex justify-center items-center ">
          <div className="absolute flex flex-col items-center">
            <span className="block text-white font-eudoxussans">Add Files</span>
          </div>

          <input
            name=""
            className="h-full w-full opacity-0 cursor-pointer"
            type="file"
          />
        </div>
      </div>
    </>
  );
};

export default FilesUpload;
