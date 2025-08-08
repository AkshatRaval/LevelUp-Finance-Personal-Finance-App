import React from 'react'

const DashboardCards = ({ card }) => {
    return (
        <div className='bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow text-foreground'>
            <div className='text-lg font-semibold mb-9 flex items-center justify-between'>
                <h2>{card.title}</h2>
                <card.icon size={14} color={card.value < 0 ? 'red' : 'green'} />
            </div>
            <div>
                <div className={`text-3xl font-bold ${card.ValueColor}`}>{card.value}{card.sign}</div>
                <div className='text-sm text-muted-foreground mt-1'>{card.insight}</div>
            </div>
        </div>
    )
}

export default DashboardCards