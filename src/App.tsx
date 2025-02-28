import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Filter, PieChart, Calendar, IndianRupee } from 'lucide-react';

// Define types
interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

// Categories with colors
const categories = [
  { name: 'Food', color: 'bg-amber-500' },
  { name: 'Transport', color: 'bg-blue-500' },
  { name: 'Entertainment', color: 'bg-purple-500' },
  { name: 'Shopping', color: 'bg-pink-500' },
  { name: 'Bills', color: 'bg-red-500' },
  { name: 'Other', color: 'bg-gray-500' }
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load expenses from localStorage on initial render
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Add new expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !amount || parseFloat(amount) <= 0) return;
    
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0]
    };
    
    setExpenses([...expenses, newExpense]);
    setName('');
    setAmount('');
  };

  // Delete expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Filter expenses by category
  const filteredExpenses = filter === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === filter);

  // Get category color
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IndianRupee className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-indigo-600">₹{calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Expense Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-indigo-600" />
                Add Expense
              </h2>
              <form onSubmit={handleAddExpense}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Expense Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Coffee, Groceries, etc."
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  Add Expense
                </button>
              </form>
            </div>
          </div>

          {/* Expenses List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-indigo-600" />
                  Expenses
                </h2>
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <Filter className="h-4 w-4" />
                    {filter}
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 py-1">
                      <button
                        onClick={() => {
                          setFilter('All');
                          setIsFilterOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => {
                            setFilter(cat.name);
                            setIsFilterOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {filteredExpenses.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No expenses found. Add some!</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[500px] pr-2">
                  <ul className="space-y-3">
                    {filteredExpenses.map((expense) => (
                      <li
                        key={expense.id}
                        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-start gap-3">
                            <div className={`${getCategoryColor(expense.category)} w-3 h-3 rounded-full mt-1.5`}></div>
                            <div>
                              <h3 className="font-medium text-gray-800">{expense.name}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{expense.category}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {expense.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">₹{expense.amount.toFixed(2)}</span>
                            <button
                              onClick={() => handleDeleteExpense(expense.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Delete expense"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;