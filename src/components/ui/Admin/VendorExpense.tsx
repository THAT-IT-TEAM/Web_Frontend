import ErrorBoundary from "./ErrorBoundary";
import ExpenseTable from "./Table";

const VendorExpense = () => {
  return (
    <div className="bg-transparent h-auto  w-full p-6 m-6 flex flex-col items-center">
      <div>
        <ErrorBoundary>
        <ExpenseTable />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default VendorExpense;
