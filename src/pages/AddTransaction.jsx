import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../contexts/AuthContexts';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

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
            // Optionally, you can redirect or reset the form here
            e.target.reset(); // Reset the form after submission
            navigate('/dashboard/transactions'); // Redirect to transactions page

        } catch (error) {
            console.error("Error adding transaction: ", error);
        }
    };

    return (
        <div className="text-foreground">
            <div>
                <button className='flex text-xl items-center gap-2 mb-4 border border-border p-2 px-3 rounded-lg bg-accent text-accent-foreground' onClick={() => window.history.back()}>
                    <ArrowLeft /> Back
                </button>
            </div>
            <div >
                <h1 className='text-4xl font-bold '>Add Transaction</h1>
                <p className='text-lg text-muted-foreground'>Record a new income or expense transaction</p>
            </div>

            <div className='border border-border bg-card rounded-lg p-4 mt-4 lg:max-w-[40%]'>
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
                        <select
                            name="category"
                            required
                            defaultValue=""
                            className='w-full p-2 border border-border rounded-lg bg-card'>
                            <option value="" disabled>Select a category</option>
                            <option value="Food & Dining">Food & Dining</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Income">Income</option>
                            <option value="Investment">Investment</option>
                        </select>
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
                        <button className='bg-card text-primary border px-5 py-2 rounded-lg font-semibold' onClick={() => navigate()}>Cancel</button>
                        <button type="submit" className='bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold'>Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTransaction
