import { ArrowDownRight, ArrowUpRight, History, Plus, Tag } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContexts';
import DashboardCards from '../components/DashboardCards';
import { useNavigate } from 'react-router-dom';
import { useTransactionData } from '../utils/useTransactionData';

const Transactions = () => {

  const calculaeTotalIncome = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'income' ? total + transaction.amount : total;
    }, 0);
  }
  const calculaeTotalExpenses = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'expense' ? total + transaction.amount : total;
    }, 0);
  }

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const transactions = useTransactionData().transactionData
  const totalTeansactions = transactions.length; // Placeholder, replace with actual logic if needed
  const totalIncome = calculaeTotalIncome(transactions); // Placeholder, replace with actual logic if needed
  const totalExpenses = calculaeTotalExpenses(transactions) * -1; // Placeholder, replace with actual logic if needed

  const transactionsData = [
    {
      id: 1,
      title: 'Total Transactions',
      value: totalTeansactions,
      ValueColor: 'text-black',
      icon: Tag,
      ValueColor: 'text-black',
      sign: '',
      insight: 'In Selected Period',
    },
    {
      id: 2,
      title: 'Total Income',
      value: totalIncome,
      ValueColor: 'text-black',
      icon: ArrowUpRight,
      ValueColor: 'text-green-600',
      sign: '₹',
      insight: 'From filtered transactions',
    },
    {
      id: 3,
      title: 'Total Expenses',
      value: totalExpenses,
      ValueColor: 'text-black',
      icon: ArrowDownRight,
      ValueColor: 'text-red-600',
      sign: '₹',
      insight: 'From filtered transactions',
    },
  ]

  return (
    <>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-4'>
          <div >
            <h1 className='text-4xl font-bold'>Transactions</h1>
            <p className='text-lg text-muted-foreground'>Track and manage your financial transactions</p>
          </div>
          <button className='flex gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold' onClick={() => navigate('/dashboard/addtransactions')}><Plus size={20} />Add Transaction</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {transactionsData.map(card => (
            <DashboardCards key={card.id} card={card} />
          ))}
        </div>
        <div>
          <div className='border border-border bg-white rounded-lg p-4 mt-4'>
            <div className='flex items-center gap-2 mb-4'>
              <History />
              <div>
                <h1 className='text-2xl font-semibold'>Recent Transactions</h1>
                <p className='text-sm text-muted-foreground'>Here are your latest transactions</p>
              </div>
            </div>
            {transactions.map((transaction) => (
              <div className='border border-border bg-white rounded-lg p-4 mt-4 shadow' key={transaction.id}>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='text-lg font-semibold'>{transaction.description}</h2>
                    <p className='text-sm text-muted-foreground'>{transaction.category}</p>
                  </div>
                  <div className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} ₹{transaction.amount}
                  </div>
                </div>
                <p className='text-sm text-muted-foreground mt-1'>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Transactions