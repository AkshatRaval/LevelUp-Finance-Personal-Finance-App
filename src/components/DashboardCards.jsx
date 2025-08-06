import React from 'react'


//id: 1,
//title: 'Current Balance',
//value: userData?.balance,
//color: 'bg-gradient-to-r from-green-400 to-green-600',
//icon: DollarSign,
//insight: 'Your spending is within safe limits!',

const DashboardCards = ({ card }) => {
    return (
        <div className='bg-white border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
            <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
                <h2>{card.title}</h2>
                <card.icon size={14} color={card.value < 0 ? 'red' : 'green'} />
            </div>
            <div>
                <p className={`text-3xl font-bold ${card.ValueColor}`}>{card.value}{card.sign}</p>
                <p className='text-sm text-muted-foreground mt-1'>{card.insight}</p>
            </div>
        </div>
    )
}

export default DashboardCards