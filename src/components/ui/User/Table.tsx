import { useState, ReactElement } from "react";
import { Search, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import api from "../api";


// Type definitions
interface Expense {
  id: number;
  vendorName: string;
  expenseType: ExpenseType;
  submissionDate: string;
  amount: number;
  status: ExpenseStatus;
  onChainHash: string;
}

type ExpenseStatus = "Verified" | "Pending" | "Flagged";
type ExpenseType =
  | "Software"
  | "Supplies"
  | "Marketing"
  | "Consulting"
  | "Travel";
type AmountFilter = "low" | "medium" | "high" | "";
type FilterType = "status" | "type" | "date" | "amount";

export default function ExpenseTable(): ReactElement {
  // State management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [statusFilter, setStatusFilter] = useState<ExpenseStatus | "">("");
  const [typeFilter, setTypeFilter] = useState<ExpenseType | "">("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [amountFilter, setAmountFilter] = useState<AmountFilter>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Sample data - expanded for better pagination demonstration
  const expenses: Expense[] = [
    {
      id: 1,
      vendorName: "Tech Solutions Inc.",
      expenseType: "Software",
      submissionDate: "2024-07-20",
      amount: 12500,
      status: "Verified",
      onChainHash: "0xabc123",
    },
    {
      id: 2,
      vendorName: "Office Supplies Co.",
      expenseType: "Supplies",
      submissionDate: "2024-07-18",
      amount: 3200,
      status: "Pending",
      onChainHash: "0xdef456",
    },
    {
      id: 3,
      vendorName: "Marketing Pros LLC",
      expenseType: "Marketing",
      submissionDate: "2024-07-15",
      amount: 8750,
      status: "Verified",
      onChainHash: "0xghi789",
    },
    {
      id: 4,
      vendorName: "Consulting Experts Ltd.",
      expenseType: "Consulting",
      submissionDate: "2024-07-12",
      amount: 15000,
      status: "Flagged",
      onChainHash: "0xjkl012",
    },
    {
      id: 5,
      vendorName: "Travel Agency Group",
      expenseType: "Travel",
      submissionDate: "2024-07-10",
      amount: 5400,
      status: "Verified",
      onChainHash: "0xmno345",
    },
    {
      id: 6,
      vendorName: "Cloud Services Inc.",
      expenseType: "Software",
      submissionDate: "2024-07-08",
      amount: 7800,
      status: "Pending",
      onChainHash: "0xpqr678",
    },
    {
      id: 7,
      vendorName: "Design Studio Pro",
      expenseType: "Marketing",
      submissionDate: "2024-07-05",
      amount: 4200,
      status: "Verified",
      onChainHash: "0xstu901",
    },
    {
      id: 8,
      vendorName: "Legal Advisors LLC",
      expenseType: "Consulting",
      submissionDate: "2024-07-03",
      amount: 9500,
      status: "Flagged",
      onChainHash: "0xvwx234",
    },
    {
      id: 9,
      vendorName: "Equipment Rental Co.",
      expenseType: "Supplies",
      submissionDate: "2024-07-01",
      amount: 6300,
      status: "Verified",
      onChainHash: "0xyza567",
    },
    {
      id: 10,
      vendorName: "Conference Hotels",
      expenseType: "Travel",
      submissionDate: "2024-06-28",
      amount: 3800,
      status: "Pending",
      onChainHash: "0xbcd890",
    },
    {
      id: 11,
      vendorName: "Analytics Platform",
      expenseType: "Software",
      submissionDate: "2024-06-25",
      amount: 11200,
      status: "Verified",
      onChainHash: "0xefg123",
    },
    {
      id: 12,
      vendorName: "Print Shop Express",
      expenseType: "Supplies",
      submissionDate: "2024-06-22",
      amount: 890,
      status: "Verified",
      onChainHash: "0xhij456",
    },
  ];

  // Get unique values for filter options
  const uniqueStatuses: ExpenseStatus[] = [
    ...new Set(expenses.map((e) => e.status)),
  ];
  const uniqueTypes: ExpenseType[] = [
    ...new Set(expenses.map((e) => e.expenseType)),
  ];

  // Apply all filters
  const filteredExpenses: Expense[] = expenses.filter(
    (expense: Expense): boolean => {
      const matchesSearch: boolean =
        expense.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.expenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.status.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus: boolean =
        !statusFilter || expense.status === statusFilter;
      const matchesType: boolean =
        !typeFilter || expense.expenseType === typeFilter;

      const matchesDate: boolean =
        !dateFilter || expense.submissionDate >= dateFilter;

      const matchesAmount: boolean =
        !amountFilter ||
        (() => {
          switch (amountFilter) {
            case "low":
              return expense.amount < 5000;
            case "medium":
              return expense.amount >= 5000 && expense.amount < 10000;
            case "high":
              return expense.amount >= 10000;
            default:
              return true;
          }
        })();

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesDate &&
        matchesAmount
      );
    }
  );

  // Pagination calculations
  const totalPages: number = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const paginatedExpenses: Expense[] = filteredExpenses.slice(
    startIndex,
    endIndex
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: FilterType, value: string): void => {
    setCurrentPage(1);
    switch (filterType) {
      case "status":
        setStatusFilter(value as ExpenseStatus | "");
        break;
      case "type":
        setTypeFilter(value as ExpenseType | "");
        break;
      case "date":
        setDateFilter(value);
        break;
      case "amount":
        setAmountFilter(value as AmountFilter);
        break;
    }
  };

  const clearAllFilters = (): void => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
    setDateFilter("");
    setAmountFilter("");
    setCurrentPage(1);
  };

  const hasActiveFilters: boolean = !!(
    searchTerm ||
    statusFilter ||
    typeFilter ||
    dateFilter ||
    amountFilter
  );

  const getStatusBadge = (status: ExpenseStatus): string => {
    const baseClasses: string = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "Verified":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      case "Flagged":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = (): ReactElement[] => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      let pageNumber: number;
      if (totalPages <= 5) {
        pageNumber = i + 1;
      } else if (currentPage <= 3) {
        pageNumber = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageNumber = totalPages - 4 + i;
      } else {
        pageNumber = currentPage - 2 + i;
      }

      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`w-10 h-10 rounded-lg border transition-colors ${
            currentPage === pageNumber
              ? "bg-blue-500 border-gray-50 text-white"
              : "bg-[#161616] border-gray-50 text-gray-300 hover:bg-gray-400"
          }`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="bg-[#141414] text-white h-auto rounded-2xl p-6  w-[162vh] border border-gray-50 shadow-neumorphic">
      <div className=" w-auto mx-auto">
        {/* Header with Search and Filter Toggle */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-[#161616] border border-gray-50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-[#161616] border border-gray-50 rounded-lg hover:bg-gray-500 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-[#161616] border border-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-50 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full bg-[#161616] border border-gray-50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-gray-50"
                  >
                    <option value="">All Statuses</option>
                    {uniqueStatuses.map((status: ExpenseStatus) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-50 mb-2">
                    Expense Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleFilterChange("type", e.target.value)
                    }
                    className="w-full bg-[#161616] border border-gray-50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
                  >
                    <option value="">All Types</option>
                    {uniqueTypes.map((type: ExpenseType) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-50 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFilterChange("date", e.target.value)
                    }
                    className="w-full bg-[#161616] border border-gray-50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
                  />
                </div>

                {/* Amount Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-50 mb-2">
                    Amount Range
                  </label>
                  <select
                    value={amountFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleFilterChange("amount", e.target.value)
                    }
                    className="w-full bg-[#161616] border border-gray-50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
                  >
                    <option value="">All Amounts</option>
                    <option value="low">Under $5,000</option>
                    <option value="medium">$5,000 - $10,000</option>
                    <option value="high">Over $10,000</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-gray-400 text-sm">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredExpenses.length)} of{" "}
            {filteredExpenses.length} expenses
          </div>

          {/* Items per page selector */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Show:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-[#161616] border border-gray-50 rounded px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-gray-400">per page</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-lg border border-gray-50">
          <table className="w-full bg-[#161616]">
            <thead className="bg-[#212121]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Vendor Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Expense Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedExpenses.map((expense: Expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-gray-750 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {expense.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {expense.expenseType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(expense.submissionDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(expense.status)}>
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {paginatedExpenses.map((expense: Expense) => (
            <div
              key={expense.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {expense.vendorName}
                </h3>
                <span className={getStatusBadge(expense.status)}>
                  {expense.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-gray-300">{expense.expenseType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-gray-300">
                    {formatDate(expense.submissionDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hash:</span>
                  <span className="text-gray-400 font-mono text-xs">
                    {expense.onChainHash}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 bg-[#161616] border border-gray-50 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">{renderPaginationButtons()}</div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 bg-[#161616] border border-gray-50 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No expenses found matching your search.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
