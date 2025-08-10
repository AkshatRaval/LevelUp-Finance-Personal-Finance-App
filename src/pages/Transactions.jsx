import { ArrowDownRight, ArrowUpRight, History, Plus, Tag } from 'lucide-react';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactionData } from '../utils/useTransactionData';
import DashboardCards from '../components/DashboardCards';
import TransactionFilters from '../components/TransactionsFilter'; // Ensure this path is correct
import AnimatedWrapper from '../components/AnimatedPage';

const Transactions = () => {
    const navigate = useNavigate();

    // --- State and Data Fetching ---
    // 1. Get the master list of transactions from your custom hook
    const { transactionData: allTransactions, loading } = useTransactionData();

    // 2. State to hold the current filter settings
    const [filters, setFilters] = useState({
        search: '',
        category: 'All Categories',
        type: 'All Types',
    });

    // --- Filtering Logic ---
    // 3. The function that receives filter changes from the TransactionFilters component
    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []); // useCallback prevents this function from being recreated on every render

    // 4. Apply the filters to create a new array of transactions to display
    const filteredTransactions = allTransactions.filter(t => {
        // Ensure t.description is a string before calling .toLowerCase()
        const description = t.description || '';
        const searchMatch = description.toLowerCase().includes(filters.search.toLowerCase());
        const categoryMatch = filters.category === 'All Categories' || t.category === filters.category;
        const typeMatch = filters.type === 'All Types' || t.type === filters.type;
        return searchMatch && categoryMatch && typeMatch;
    });

    // --- Calculation Functions (now using the filtered list) ---
    const calculateTotalIncome = (transactions) => {
        return transactions.reduce((total, transaction) => {
            return transaction.type === 'income' ? total + transaction.amount : total;
        }, 0);
    };

    const calculateTotalExpenses = (transactions) => {
        return transactions.reduce((total, transaction) => {
            return transaction.type === 'expense' ? total + transaction.amount : total;
        }, 0);
    };

    // --- Data for Dashboard Cards (calculated from filtered transactions) ---
    const totalTransactions = filteredTransactions.length;
    const totalIncome = calculateTotalIncome(filteredTransactions);
    const totalExpenses = calculateTotalExpenses(filteredTransactions);

    const transactionsData = [
        {
            id: 1,
            title: 'Total Transactions',
            value: totalTransactions,
            icon: Tag,
            ValueColor: 'text-foreground',
            sign: '',
            insight: 'In Selected Period',
        },
        {
            id: 2,
            title: 'Total Income',
            value: totalIncome,
            icon: ArrowUpRight,
            ValueColor: 'text-instructive',
            sign: '₹',
            insight: 'From filtered transactions',
        },
        {
            id: 3,
            title: 'Total Expenses',
            value: totalExpenses * -1, // Display as a positive number
            icon: ArrowDownRight,
            ValueColor: 'text-destructive',
            sign: '₹',
            insight: 'From filtered transactions',
        },
    ];

    if (loading) {
        return <div>Loading transactions...</div>; // Show a loading state
    }

    return (
        <div>
            <div className='w-full text-foreground'>
                <div className='flex items-center justify-between mb-4'>
                    <AnimatedWrapper delay={0}>
                        <div>
                            <h1 className='text-4xl font-bold'>Transactions</h1>
                            <p className='text-lg text-muted-foreground'>Track and manage your financial transactions</p>
                        </div>
                    </AnimatedWrapper>
                    <button className='flex gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold cursor-pointer' onClick={() => navigate('/dashboard/addtransactions')}><Plus size={20} />Add Transaction</button>
                </div>
                <AnimatedWrapper delay={0.3}>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                        {transactionsData.map(card => (
                            <DashboardCards key={card.id} card={card} />
                        ))}
                    </div>
                </AnimatedWrapper>
                <AnimatedWrapper delay={0.5}>
                    {/* --- Add Transactions Filter Here --- */}
                    <div className="mt-6">
                        <TransactionFilters onFilterChange={handleFilterChange} />
                    </div>
                </AnimatedWrapper>

                <AnimatedWrapper delay={0.7}>

                    <div>
                        <div className='border border-border bg-card rounded-lg p-4 mt-4'>
                            <div className='flex items-center gap-2 mb-4'>
                                <History />
                                <div>
                                    <h1 className='text-2xl font-semibold'>Transaction History</h1>
                                    <p className='text-sm text-muted-foreground'>Showing {filteredTransactions.length} of {allTransactions.length} transactions</p>
                                </div>
                            </div>
                            {/* --- Map over the FILTERED transactions --- */}
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <div className='border border-border bg-card rounded-lg p-4 mt-4 shadow' key={transaction.id}>
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <h2 className='text-lg font-semibold'>{transaction.description}</h2>
                                                <p className='text-sm text-muted-foreground'>{transaction.category}</p>
                                            </div>
                                            <div className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-instructive' : 'text-destructive'}`}>
                                                {transaction.type === 'income' ? '+' : '-'} ₹{transaction.amount}
                                            </div>
                                        </div>
                                        <p className='text-sm text-muted-foreground mt-1'>{new Date(transaction.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground mt-6">No transactions match the current filters.</p>
                            )}
                        </div>
                    </div>
                </AnimatedWrapper>
            </div>


        </div>
    )
}

export default Transactions;
