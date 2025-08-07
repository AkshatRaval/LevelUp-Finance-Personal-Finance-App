import React from 'react'
import DashboardCards from '../components/DashboardCards'
import { DollarSign, TrendingDown, TriangleAlert } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const Budget = () => {

  const totalBudget = 50000; // Placeholder, replace with actual logic if needed
  const totalSpent = 30000; // Placeholder, replace with actual logic if needed
  const progress = (totalSpent / totalBudget) * 100; // Calculate progress percentage
  const budgetAlerts = 0; // Calculate progress percentage

  return (
    <div className='w-full'>
      <div>
        <h1 className='text-4xl font-bold'>Budget Management</h1>
        <p className='text-lg text-muted-foreground'>Track your spending against your budget goals</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        {/* <DashboardCards /> */}
      </div>
    </div>
  )
}

export default Budget