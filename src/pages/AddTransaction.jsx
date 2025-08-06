import React from 'react'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUserData } from "../utils/useUserData";
import { db } from "../firebase";
import { useAuth } from '../contexts/AuthContexts';
import { ArrowLeft } from 'lucide-react';

const AddTransaction = () => {

    const { currentUser } = useAuth();   
    
    const handleAddTransaction = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        if (!currentUser) {
            return console.error("No user is logged in!");
        }
        try {
            // Create the new transaction object
            const newTransaction = {
                type: formData.get('type'),
                category: formData.get('category'),
                description: formData.get('description'),
                amount: Number(formData.get('amount')),
                userId: currentUser.uid, // This is the essential link
                date: formData.get('date') || serverTimestamp(),
                notes: formData.get("note") || "N/A", // Optional field
                createdAt: serverTimestamp()
            };

            // Add the document to the 'transactions' collection
            await addDoc(collection(db, "transactions"), newTransaction);
            console.log("Transaction added successfully!");

        } catch (error) {
            console.error("Error adding transaction: ", error);
        }
    };

    return (
        <div>
            <div>
                <button className='flex text-xl items-center gap-2 mb-4 border border-border p-2 px-3 rounded-lg bg-accent text-accent-foreground' onClick={() => window.history.back()}>
                    <ArrowLeft /> Back
                </button>
            </div>
            <div >
                <h1 className='text-4xl font-bold '>Add Transaction</h1>
                <p className='text-lg text-muted-foreground'>Record a new income or expense transaction</p>
            </div>

            <div className='border border-border bg-white rounded-lg p-4 mt-4 max-w-[40%]'>
                <form onSubmit={handleAddTransaction} className='mt-6 space-y-4'>
                    <div>
                        <label className='block text-sm font-medium'>Type</label>
                        <select name="type" required className='w-full p-2 border border-border rounded-lg'>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label className='block text-sm font-medium'>Category</label>
                        <input type="text" name="category" required className='w-full p-2 border border-border rounded-lg' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium'>Description</label>
                        <input type="text" name="description" required className='w-full p-2 border border-border rounded-lg' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium'>Amount (₹)</label>
                        <input type="number" name="amount" required className='w-full p-2 border border-border rounded-lg' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium'>Date</label>
                        <input type="date" name="date" className='w-full p-2 border border-border rounded-lg' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium'>Notes (optional)</label>
                        <textarea name="note" rows="3" className='w-full p-2 border border-border rounded-lg'></textarea>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <button className='bg-primary-foreground text-primary border px-5 py-2 rounded-lg font-semibold' onClick={()=>navigate()}>Cancel</button>
                        <button type="submit" className='bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold'>Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTransaction
