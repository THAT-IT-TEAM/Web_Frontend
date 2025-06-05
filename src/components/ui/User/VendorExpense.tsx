import ExpenseTable from "./Table";

const VendorExpense = () => {
  return (
    <div className="bg-transparent h-auto p-11 w-full mt-[100px] flex flex-col items-center">
      <h1 className="font-impact text-5xl text-white p-6 px-[170px] mb-4 mt-4  ">
        Vendor Expenses
      </h1>
      <div>
        <ExpenseTable />
      </div>
    </div>
  );
};

export default VendorExpense;
