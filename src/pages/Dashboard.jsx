import { DollarSign, TrendingUp, TrendingDown, HandCoins } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContexts';
import { doc, getDoc } from 'firebase/firestore';
import DashboardCards from '../components/DashboardCards.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
const Dashboard = () => {

  // Fetch user finance data from Firestore
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  const barData = [
    { name: "Jan", Income: 4800, Expenses: 3200 },
    { name: "Feb", Income: 5200, Expenses: 3800 },
    { name: "Mar", Income: 4900, Expenses: 3500 },
    { name: "Apr", Income: 5400, Expenses: 4200 },
    { name: "May", Income: 5100, Expenses: 3700 },
  ];


  const pieData = [
    { name: "Food & Dining", value: 32 },
    { name: "Transportation", value: 21 },
    { name: "Shopping", value: 16 },
    { name: "Entertainment", value: 11 },
    { name: "Bills", value: 20 },
  ];

  const COLORS = ["#4285F4", "#00C49F", "#FFBB28", "#FF4C4C", "#9C27B0"];

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        const userDocRef = doc(db, "users", currentUser.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("No user found with that ID!");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        } finally {
          setLoading(false); // Stop loading after fetch attempt
        }
      } else {
        setLoading(false); // If no user, stop loading
      }
    };
    fetchUserData();
  }, [currentUser]);

  const currentBalance = userData?.balance ?? 0;
  const monthlyIncome = userData?.income ?? 0;
  const monthlyExpenses = userData?.expenses ?? 0;

  const netSavings = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome !== 0
    ? ((netSavings / monthlyIncome) * 100).toFixed(2)
    : 'N/A';
  const userFinanceData = [
    {
      id: 1,
      title: 'Current Balance',
      value: currentBalance,
      ValueColor: 'text-black',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: DollarSign,
      sign: '₹',
      insight: 'Your spending is within safe limits!',
    },
    {
      id: 2,
      title: 'Monthly Income',
      value: monthlyIncome,
      ValueColor: monthlyIncome < 0 ? 'text-red-500' : 'text-green-500',
      color: 'bg-gradient-to-r from-blue-400 to-blue-600',
      icon: TrendingUp,
      sign: '₹',
      insight: 'Income covers expenses comfortably.',
    },
    {
      id: 3,
      title: 'Monthly Expenses',
      value: monthlyExpenses * -1,
      ValueColor: monthlyExpenses > 0 ? 'text-red-500' : 'text-green-500',
      color: 'bg-gradient-to-r from-red-400 to-red-600',
      icon: TrendingDown,
      sign: '₹',
      insight: 'Expenses under control this month.',
    },
    {
      id: 4,
      title: 'Saving rate',
      value: savingsRate,
      ValueColor: 'text-blue-500',
      color: 'bg-gradient-to-r from-red-400 to-red-600',
      icon: HandCoins,
      sign: '%',
      insight: 'Expenses under control this month.',
    },
  ];


  return (
    <div>
      <div>
        <h1 className='text-4xl font-bold text-foreground'>Dashboard</h1>
        <p className='text-lg text-muted-foreground'>Welcome back! Here's your financial overview.</p>
      </div>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
          {userFinanceData.map(card => (
            <DashboardCards key={card.id} card={card} />
          ))}
        </div>
      </section>
      <section className='flex w-full gap-6 mt-6 flex-col md:flex-row'>
        <div className='w-full mt-6 bg-card p-6 rounded-lg shadow-sm border border-border'>
          <h3 className='text-xl font-bold'>Income vs Expenses</h3>
          <p className='text-sm text-muted-foreground'>Monthly comparison over the last 5 months</p>
          <div style={{ width: "100%", height: 400 }} className='w-full bg-card p-6 rounded-lg'>
            <ResponsiveContainer>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#00C49F" barSize={40} animationDuration={1200} />
                <Bar dataKey="Expenses" fill="#FF4C4C" barSize={40} animationDuration={1200} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='w-full mt-6 bg-card p-6 rounded-lg shadow-sm border border-border'>
          <div style={{ width: "100%", height: 400 }}>
            <h3 className='text-xl font-bold'>Expense Categories</h3>
            <p className='text-sm text-muted-foreground'>Breakdown of your spending this month</p>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  animationDuration={1200}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div >
  )
}

export default Dashboard