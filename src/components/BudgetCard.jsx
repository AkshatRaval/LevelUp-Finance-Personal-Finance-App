import { Calendar, Edit } from "lucide-react";
import { useState, useMemo } from "react";
import { useTransactionData } from "../utils/useTransactionData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useToast } from "../utils/toastContext";

const BudgetCard = ({ card, onUpdate }) => {
    const { showToast } = useToast()
    const { transactionData } = useTransactionData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({ ...card });

    // Filter transactions for this category
    const filteredTransactionData = useMemo(() => {
        return transactionData.filter(
            (transaction) => transaction.category === card.category
        );
    }, [transactionData, card.category]);

    // Calculate totals
    const totalSpent = useMemo(() => {
        return filteredTransactionData.reduce(
            (sum, transaction) => sum + (transaction.amount || 0),
            0
        );
    }, [filteredTransactionData]);

    const remainingBudget = card.amount - totalSpent;
    const percentUsed = Math.min((totalSpent / card.amount) * 100, 100);
    const isOverBudget = totalSpent > card.amount;

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const handleDelete = async (budgetId) => {
        try {
            console.log('Deleting ID:', budgetId);
            const docRef = doc(db, "budgets", budgetId);
            await deleteDoc(docRef);
            setIsModalOpen(!isModalOpen)
            showToast("Budget deleted successfully!");

            // Optionally, refresh your budget data here or update state
        } catch (error) {
            console.error("Error deleting budget:", error);
            showToast("Failed to delete budget.");
        }
    };

    // Handle save
    const handleSave = () => {
        if (onUpdate) {
            onUpdate(editData);
        }
        setIsModalOpen(false);
    };

    if (!card) {
        return (
            <div className="bg-red-100 text-red-700 p-3 rounded">
                No data available
            </div>
        );
    }

    return (
        <>
            <div className="bg-card border border-border p-6 rounded-lg m-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-2">
                        <h2 className="text-xl font-bold text-foreground">
                            {card.category}
                        </h2>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-accent text-xs text-accent-foreground capitalize">
                            {card.type}
                        </span>
                        {isOverBudget && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-red-500 text-white text-xs">
                                Over Budget
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setEditData(card);
                            setIsModalOpen(true);
                        }}
                        className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                        <Edit size={18} />
                        Edit
                    </button>
                </div>

                {/* Calendar & Amount */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={18} /> {card.type}
                    </div>
                    <div className="text-lg font-bold text-success">
                        ₹{totalSpent.toLocaleString()} of ₹{card.amount.toLocaleString()}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-3 rounded-full ${isOverBudget ? "bg-destructive" : "bg-primary"
                            }`}
                        style={{ width: `${percentUsed}%` }}
                    />
                </div>

                {/* Remaining amount */}
                <div
                    className={`mt-2 text-sm font-medium ${isOverBudget ? "text-destructive" : "text-instructive0"
                        }`}
                >
                    {isOverBudget
                        ? `Over by ₹${Math.abs(remainingBudget).toLocaleString()}`
                        : `₹${remainingBudget.toLocaleString()} remaining`}
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-card p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Edit Budget</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={editData.category}
                                onChange={handleChange}
                                className="border rounded w-full px-2 py-1 mt-1"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Type</label>
                            <input
                                type="text"
                                name="type"
                                value={editData.type}
                                onChange={handleChange}
                                className="border rounded w-full px-2 py-1 mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={editData.amount}
                                onChange={handleChange}
                                className="border rounded w-full px-2 py-1 mt-1"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-3 py-1 rounded border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="px-3 py-1 rounded bg-primary text-white"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-3 py-1 rounded bg-primary text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BudgetCard;
