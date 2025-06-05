const FilesUpload = () => {
  return (
    <>
      <h1 className="font-impact text-5xl text-white p-6 text-center mb-4 mt-4">
        Upload
      </h1>
      <div className="h-auto mb-20">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full p-3">
              <div className="relative h-48 shadow-neumorphic border-2 border-[#1c1c1c] bg-[#141414] rounded-2xl flex justify-center items-center  hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="absolute flex flex-col items-center">
                  <img
                    alt="File Icon"
                    className="mb-3"
                    src="https://img.icons8.com/dusk/64/000000/file.png"
                  />
                  <span className="block text-white font-semibold">
                    Drag &amp; drop your files here
                  </span>
                  <span className="block text-gray-200 font-normal mt-1">
                    or click to upload
                  </span>
                </div>

                <input
                  name=""
                  className="h-full w-full opacity-0 cursor-pointer"
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilesUpload;
