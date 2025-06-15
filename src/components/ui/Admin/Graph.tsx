import { useEffect, useState } from "react";
import api from "../api";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import Loader from "../SquareLoader";
const Graph = () => {
    const [expense , setExpense] = useState([])
    const [loading,setLoading] = useState(false)
        useEffect(()=>{
            setLoading(true)
        const fetchData = async()=>{
        const response = await api.getExpenses();
        console.log(response)
            setExpense(response)
            setLoading(false)
        }
        fetchData()
    },[])


    if(loading){
        return <Loader/>
    }

  const data = [
    {
      name: "1",
      plot: 100,
    },
    {
      name: "3",
      plot: 300,
    },
    {
      name: "6",
      plot: 900,
    },
    {
      name: "9",
      plot: 750,
    },
    {
      name: "12",
      plot: 450,
    },
    {
      name: "15",
      plot: 250,
    },
    {
      name: "18",
      plot: 1800,
    },
    {
      name: "21",
      plot: 1540,
    },
    {
      name: "24",
      plot: 600,
    },
    {
      name: "27",
      plot: 490,
    },
    {
      name: "30",
      plot: 500,
    },
  ];

  return (
    <>
      <div className=" w-[162vh]  flex flex-col justify-center items-center  shadow-neumorphic rounded-xl  p-6 border border-gray-50">
        <h1 className=" text-white font-impact text-4xl mb-8 -translate-x-[600px]">
          Expenditure Graph
        </h1>
        <div className="w-[150vh] h-[35vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={1000}
              height={500}
              data={expense}
              margin={{ right: 30, top: 30, left: 30 }}
            >
              <XAxis dataKey="transaction_date" />

              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Line
                dataKey="amount"
                stroke="#ffffff"
                fill="#161616"
                type="monotone"
                activeDot={{ r: 8 }}
                strokeWidth="2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Graph;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-[#090909] flex flex-col gap-4 rounded-xl">
        <p className="text-md text-gray-50">
          Expense:
          <span className="ml-2 text-green-500">₹{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
