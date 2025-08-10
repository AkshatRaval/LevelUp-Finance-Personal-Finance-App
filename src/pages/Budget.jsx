import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { DollarSign, Plus, Target, TrendingDown, TriangleAlert, X } from 'lucide-react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useBudgetData } from '../utils/useBudgetData';
import BudgetCard from '../components/BudgetCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../utils/toastContext';
import { useTransactionData } from '../utils/useTransactionData';
import AnimatedWrapper from '../components/AnimatedPage';

// TODO: You need to implement or import this hook to fetch transactions
// For example:
// import { useTransactionData } from '../utils/useTransactionData';

const Budget = () => {
  const { currentUser } = useAuth();
  const { budgetData: allbudgets = [], loading } = useBudgetData(); // budgets from Firestore
  // Placeholder: Replace this with your real transaction data hook or source
  const { transactionData } = useTransactionData(); // <-- IMPORTANT: Replace this with real transactions data array

  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("monthly");

  const navigate = useNavigate();

  const handleUpdateCard = async (updatedCard) => {
    try {
      const docRef = doc(db, "budgets", updatedCard.id);
      await updateDoc(docRef, {
        category: updatedCard.category,
        amount: updatedCard.amount,
        type: updatedCard.type
      });
      showToast("Budget updated successfully!");
    } catch (error) {
      console.error("Error updating budget:", error);
      showToast("Failed to update budget.");
    }
  };
  const unavailableCategories = [];

  const availableCategories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Bills",
    "Entertainment",
    "Healthcare",
    "Other"
  ];
  const totalCategories = availableCategories.filter(element => !unavailableCategories.includes(element));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const budgetData = {
        userId: currentUser.uid,
        category: selectedCategory,
        amount: parseFloat(amount),
        type: period,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "budgets"), budgetData);
      showToast("Budget Profile Updated");
      setIsOpen(false);
      navigate('/dashboard/budget');
    } catch (error) {
      console.error(error);
      showToast("User Budget failed to update");
    }
  };

  if (loading) {
    return <div className="p-6">Loading budget data...</div>;
  }

  // Use a safe fallback for transactionData to prevent crashes on reload or if null
  const safeTransactionData = transactionData || [];

  // Calculate total budget amount
  const totalBudget = allbudgets.reduce((sum, budget) => sum + (budget.amount || 0), 0);

  // Calculate total spent by summing transactions matching budget categories
  const totalSpent = allbudgets.reduce((sum, budget) => {
    const categorySpent = safeTransactionData
      .filter(tx => tx.category === budget.category)
      .reduce((catSum, tx) => catSum + (tx.amount || 0), 0);
    return sum + categorySpent;
  }, 0);

  // Calculate spending progress percentage safely
  const progress = totalBudget > 0 ? Math.min(100, (totalSpent / totalBudget) * 100) : 0;

  // Count how many categories are over budget
  const budgetAlerts = allbudgets.filter(budget => {
    const spent = safeTransactionData
      .filter(tx => tx.category === budget.category)
      .reduce((catSum, tx) => catSum + (tx.amount || 0), 0);
    return spent > budget.amount;
  }).length;

  return (
    <div className='relative w-full h-full p-6 bg-background transition-all duration-300'>

      <div className={`w-full text-foreground ${isOpen ? 'blur-sm' : ''}`}>
        <AnimatedWrapper >
          <div className='flex items-center justify-between mb-4'>

            <div>
              <h1 className='text-4xl font-bold'>Budget Management</h1>
              <p className='text-lg text-muted-foreground'>Track your spending against your budget goals</p>
            </div>
            <button
              className='flex gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold cursor-pointer'
              onClick={() => { setIsOpen(true) }}
            >
              <Plus size={20} />Add Budget
            </button>
          </div>
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.3}>
          {/* Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
            <div className='bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
              <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
                <h2>Total Budget</h2>
                <DollarSign size={14} color={'black'} />
              </div>
              <div>
                <div className='text-3xl font-bold'>{totalBudget}₹</div>
                <div className='text-sm text-muted-foreground mt-1'>Monthly budget allocation</div>
              </div>
            </div>

            <div className='bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full'>
              <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
                <h2>Total Spent</h2>
                <TrendingDown size={15} className='text-destructive' />
              </div>
              <div>
                <div className='text-3xl font-bold'>{totalSpent}₹</div>
              </div>
              <div className="w-full bg-background rounded-full h-3 mt-5">
                <div className='bg-primary h-3 rounded-full' style={{ width: `${progress}%` }} />
              </div>
              <div className="text-xs text-muted-foreground text-end">{progress.toFixed(1)}%</div>
            </div>

            <div className='bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
              <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
                <h2>Budget Alerts</h2>
                <TriangleAlert size={15} className='text-destructive' />
              </div>
              <div>
                <div className={`text-3xl font-bold ${budgetAlerts > 0 ? 'text-destructive' : ''}`}>{budgetAlerts}</div>
                <div className='text-sm text-muted-foreground mt-1'>Categories over budget</div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
        {/* Budget Overview */}
        <AnimatedWrapper delay={0.5}>

          <div className='mt-6 bg-card p-6 rounded-lg shadow-sm border border-border'>
            <div className='flex items-center gap-2'>
              <Target size={18} />
              <h2 className='text-xl font-semibold'>Budget Overview</h2>
            </div>
            <p className='text-muted-foreground'>Here you can add charts or tables to visualize your budget and spending trends.</p>

            <div className='mt-6'>
              {allbudgets.length === 0 ? (
                <div className="text-muted-foreground">No budgets found. Add one to get started.</div>
              ) : (
                allbudgets.map(budget => (
                  <BudgetCard
                    key={budget.id}
                    card={budget}
                    onUpdate={handleUpdateCard} // Pass Firestore update method
                  />
                ))
              )}
            </div>
          </div>
        </AnimatedWrapper>
      </div>

      {/* Add Budget Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center text-foreground'>
          <div className='absolute top-[50%] right-[50%] translate-y-[-50%] translate-x-[50%] bg-card border border-border p-5 rounded-lg min-h-[50%] min-w-[30%] shadow-lg mt-4'>
            <button
              className='absolute top-5 right-5 text-muted-foreground hover:text-foreground'
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <h2 className='text-xl font-semibold'>Add New Budget</h2>
            <p className='text-muted-foreground'>Set a spending limit for a category</p>

            <form className='mt-4' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="budgetCategory" className='block mb-2 font-medium'>Category</label>
                <select
                  id="budgetCategory"
                  required
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className='w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-card'>
                  <option value="" disabled>Select category</option>
                  {totalCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budgetAmount" className='block mt-4 mb-2 font-medium'>Budget Amount</label>
                <input
                  type="number"
                  id="budgetAmount"
                  required
                  min="0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className='w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>

              <div>
                <label htmlFor="type" className='block mt-4 mb-2 font-medium'>Period</label>
                <select
                  id="type"
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                  className='w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-card'
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <button
                className='bg-primary w-full p-2 my-2 text-primary-foreground rounded-lg text-sm font-semibold cursor-pointer mt-5'
                type='submit'
              >
                Add Budget
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
