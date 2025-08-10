import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContexts.jsx'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useToast } from '../utils/toastContext.jsx'


const PreUserInfoForm = () => {
    const { showToast } = useToast()

    const { currentUser } = useAuth();
    if (!currentUser) {
        return <p>You are not logged in</p>
    }


    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        setIsDark(darkMode);
        document.documentElement.classList.toggle('dark', darkMode); // Apply dark mode class based on localStorage
    }, [])


    // console.log(currentUser)
    // console.log(currentUser.uid)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const userData = {
            name: formData.get("username"),
            email: formData.get("email"),
            income: Number(formData.get("income")),
            expenses: Number(formData.get("expenses")),
            savingsGoal: Number(formData.get("savingsGoal")),
            age: Number(formData.get("age")),
            occupation: formData.get("occupation"),
            riskTolerance: formData.get("riskTolerance"),
            phone: formData.get("phone"),
            updatedAt: serverTimestamp()
        };
        try {
            await setDoc(doc(db, "users", currentUser.uid), userData, { merge: true })
            showToast("User Profile Updated")
            window.location.href = "/"
        } catch (error) {
            console.log(error)
            showToast("User Profile failed to update")

        }
    }


    return (
        <div className='flex items-center justify-center min-h-screen bg-background text-foreground'>
            <form
                onSubmit={handleSubmit}
                className="lg:min-w-3xl mx-auto my-5 p-6 bg-card rounded-lg shadow space-y-6">
                <h2 className="text-2xl font-bold text-center  mb-4">User Profile Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block mb-1 font-medium">User Name:</label>
                        <input type="text" id="username" name="username" required
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
                        <input type="email" id="email" name="email" required
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="balance" className="block mb-1 font-medium">Current Balance:</label>
                        <input type="number" id="balance" name="balance" min="0" required
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="income" className="block mb-1 font-medium">Monthly Income:</label>
                        <input type="number" id="income" name="income" min="0" required
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="expenses" className="block mb-1 font-medium">Monthly Expenses:</label>
                        <input type="number" id="expenses" name="expenses" min="0" required
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="savingsGoal" className="block mb-1 font-medium">Savings Goal:</label>
                        <input type="number" id="savingsGoal" name="savingsGoal" min="0"
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="age" className="block mb-1 font-medium">Age:</label>
                        <input type="number" id="age" name="age" min="0"
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="occupation" className="block mb-1 font-medium">Occupation:</label>
                        <input type="text" id="occupation" name="occupation"
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                        <label htmlFor="riskTolerance" className="block mb-1 font-medium">Risk Tolerance:</label>
                        <select id="riskTolerance" name="riskTolerance"
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-accent text-accent-foreground">
                            <option value="">Select risk level</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-1 font-medium">Phone Number:</label>
                        <input type="tel" id="phone" name="phone"
                            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>

                <button type="submit"
                    className="w-full bg-primary hover:bg-blue-700 text-card-foreground font-semibold py-2 rounded transition ">
                    Submit
                </button>
            </form>
        </div>
    )

}
export default PreUserInfoForm