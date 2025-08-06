import { ArrowDownRight, ArrowUpRight, Plus, Tag } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContexts';
import DashboardCards from '../components/DashboardCards';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {

  
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  const totalTeansactions = 0; // Placeholder, replace with actual logic if needed
  const totalIncome = 0; // Placeholder, replace with actual logic if needed
  const totalExpenses = 0; // Placeholder, replace with actual logic if needed
  const transactionsData = [
    {
      id: 1,
      title: 'Total Transactions',
      value: totalTeansactions,
      ValueColor: 'text-black',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: Tag,
      sign: '',
      insight: 'In Selected Period',
    },
    {
      id: 2,
      title: 'Total Income',
      value: totalIncome,
      ValueColor: 'text-black',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: ArrowUpRight,
      sign: '₹',
      insight: 'From filtered transactions',
    },
    {
      id: 3,
      title: 'Total Expenses',
      value: totalExpenses,
      ValueColor: 'text-black',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: ArrowDownRight,
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
        <div className='border border-border bg-white rounded-lg p-4 mt-4 '>
          
        </div>
      </div>
    </>
  )
}

export default Transactions