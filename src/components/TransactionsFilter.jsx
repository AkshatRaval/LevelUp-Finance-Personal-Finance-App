import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react'; // Removed unused 'ChevronDown' import

// Define the filter options outside the component so they don't get recreated on every render
const categoryOptions = [
    'All Categories',
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Bills',
    'Entertainment',
    'Income',
    'Investment'
];

const typeOptions = [
    'All Types',
    'Expense',
    'Income'
];

// Added a default prop for onFilterChange to prevent crashes if it's not provided.
const TransactionFilters = ({ onFilterChange = () => {} }) => {
    // State to manage the user's selections
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedType, setSelectedType] = useState('All Types');

    // This `useEffect` hook calls the onFilterChange function whenever a filter value changes.
    useEffect(() => {
        // This check prevents sending an initial empty filter state on mount if not desired.
        // The main purpose is to react to user changes.
        onFilterChange({
            search: searchTerm,
            category: selectedCategory,
            type: selectedType,
        });
    }, [searchTerm, selectedCategory, selectedType, onFilterChange]);

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filters & Search
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Search Input */}
                <div className="relative col-span-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="col-span-1">
                     <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Type Dropdown */}
                <div className="col-span-1">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        {typeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

// --- Example of how to use this component ---
// This ParentComponent demonstrates the correct way to use the TransactionFilters
const ParentComponent = () => {
    // This is your master list of transactions, likely fetched from a hook or API
    const allTransactions = [
        { description: 'Grocery Store', category: 'Food & Dining', type: 'Expense' },
        { description: 'Salary Deposit', category: 'Income', type: 'Income' },
        { description: 'Gas Bill', category: 'Bills', type: 'Expense' },
    ];

    const [filters, setFilters] = useState({
        search: '',
        category: 'All Categories',
        type: 'All Types',
    });

    // **IMPORTANT FIX**: Use `useCallback` here.
    // This prevents the handleFilterChange function from being recreated on every render,
    // which would cause an infinite loop in the child component's useEffect.
    const handleFilterChange = useCallback((newFilters) => {
        console.log('Filters updated in parent:', newFilters);
        setFilters(newFilters);
    }, []); // Empty dependency array means the function is created only once.

    // The filtering logic is now applied here in the parent component
    const filteredTransactions = allTransactions.filter(t => {
      const searchMatch = t.description.toLowerCase().includes(filters.search.toLowerCase());
      const categoryMatch = filters.category === 'All Categories' || t.category === filters.category;
      const typeMatch = filters.type === 'All Types' || t.type === filters.type;
      return searchMatch && categoryMatch && typeMatch;
    });

    return (
        <div className="p-6 space-y-4">
            <TransactionFilters onFilterChange={handleFilterChange} />
            
            <div className="mt-4">
                <h2 className="text-xl font-bold">Filtered Transactions</h2>
                <ul>
                    {filteredTransactions.map((t, index) => (
                        <li key={index} className="p-2 border-b">{t.description} - {t.category} ({t.type})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TransactionFilters;
