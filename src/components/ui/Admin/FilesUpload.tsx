import { useNavigate } from "react-router-dom";

const FilesUpload = () => {
    const navigate = useNavigate()
    const handleAddTrip=()=>{
        navigate("/newTrip")
    }
  return (
    <>
      <div className="h-20 w-40 fixed bottom-5 translate-x-[870px] z-50">
        <div className="relative shadow-neumorphic border bg-blue-500 border-blue-800 rounded-lg flex justify-center items-center h-10">
          <div className="absolute flex flex-col items-center">
            <button onClick={()=>handleAddTrip()} className="font-eudoxussans text-white">Add Trip</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilesUpload;
