import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
const Graph = () => {
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
      <h1 className=" text-white font-impact text-5xl mb-8">
        Expenditure Graph
      </h1>
      <div className=" w-[160vh]  flex justify-center items-center  shadow-neumorphic rounded-xl  boton-elegante relative px-6 py-3 border-[1px] border-[#1c1c1c] bg-[#141414] text-white text-[1.2rem] font-bold  overflow-hidden transition-all duration-400 ease-in-out">
        <div className="w-[150vh] h-[30vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={1000}
              height={400}
              data={data}
              margin={{ right: 30 }}
            >
              <XAxis dataKey="name" />

              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Line
                dataKey="plot"
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
          <span className="ml-2 text-green-500">${payload[0].value}</span>
        </p>
      </div>
    );
  }
};
