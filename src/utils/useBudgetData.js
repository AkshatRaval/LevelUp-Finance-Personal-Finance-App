import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContexts';

export const useBudgetData = () => {
    const { currentUser } = useAuth();
    const [budgetData, setBudgetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser?.uid) {
            setLoading(false);
            return;
        }

        const budgetsRef = collection(db, "budgets");
        const q = query(budgetsRef, where("userId", "==", currentUser.uid));

        // Listen for real-time updates
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const budgets = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setBudgetData(budgets);
                } else {
                    setBudgetData([]);
                }
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching budgets:", err);
                setError("Failed to fetch budgets.");
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount or user change
        return () => unsubscribe();
    }, [currentUser]);

    return { budgetData, loading, error };
};
