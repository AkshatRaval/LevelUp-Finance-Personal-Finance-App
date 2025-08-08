import React, { useEffect, useState } from 'react'
import { DollarSign, TrendingDown, TriangleAlert } from 'lucide-react';

const Budget = () => {


  const totalBudget = 50000; // Placeholder, replace with actual logic if needed
  const totalSpent = 30000; // Placeholder, replace with actual logic if needed
  const progress = (totalSpent / totalBudget) * 100; // Calculate progress percentage
  const budgetAlerts = 0; // Calculate progress percentage
  const progressWidth = progress + "%" // Ensure width does not exceed 100%
  return (
    <div className='w-full text-foreground'>
      <div className='w-full'>
        <h1 className='text-4xl font-bold'>Budget Management</h1>
        <p className='text-lg text-muted-foreground'>Track your spending against your budget goals</p>
      </div>
      <div className='grid grid-cols-1 text-card-foreground md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        <div className='bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
            <h2>Total Budget</h2>
            <DollarSign size={14} color={'black'} />
          </div>
          <div>
            <div className={`text-3xl font-bold `}>{totalBudget}₹</div>
            <div className='text-sm text-muted-foreground mt-1'>sdfhk sancfkxv</div>
          </div>
        </div>
        <div className='bg-card border text-card-foreground border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full'>
          <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
            <h2>Total Spent</h2>
            <TrendingDown size={15} className='text-destructive'  />
          </div>
          <div>
            <div className={`text-3xl font-bold `}>{totalSpent}₹</div>
          </div>
          <div className="w-[100%] bg-background rounded-full h-3 mt-5">
            <div className={`bg-primary h-3 rounded-full`} />
          </div>
          <div className="text-xs text-muted-foreground text-end ">{progress}%</div>
        </div>
        <div className='bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
          <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
            <h2>Budget Alerts</h2>
            <TriangleAlert size={15} className='text-destructive' />
          </div>
          <div>
            <div className={`text-3xl font-bold ${budgetAlerts > 0 ? 'text-destructive' : ''}`}>{budgetAlerts}</div>
            <div className='text-sm text-muted-foreground mt-1'>sdfhk sancfkxv</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget