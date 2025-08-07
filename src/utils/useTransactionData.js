// src/hooks/useTransactionData.js

import { useState, useEffect } from 'react';
// Import the correct Firestore functions: collection, query, where, getDocs
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContexts';

export const useTransactionData = () => {
    const { currentUser } = useAuth();
    const [transactionData, setTransactionData] = useState([]); // Default to an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser?.uid) {
            setLoading(false);
            return;
        }

        const fetchTransactionsData = async () => {
            try {
                // 1. Reference the main 'transactions' collection
                const transactionsRef = collection(db, "transactions");

                // 2. Create a query to get documents where 'userId' matches the current user's UID
                const q = query(transactionsRef, where("userId", "==", currentUser.uid));

                // 3. Execute the query with getDocs
                const querySnapshot = await getDocs(q);

                // 4. Check if the query returned any documents
                if (!querySnapshot.empty) {
                    // Map over the results and create an array of transaction objects
                    const transactions = querySnapshot.docs.map(doc => ({
                        id: doc.id, // Include the document ID
                        ...doc.data()
                    }));
                    setTransactionData(transactions);
                } else {
                    console.log("No transactions found for this user.");
                    setTransactionData([]); // Set to empty array if no transactions
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to fetch transactions.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionsData();
    }, [currentUser]);

    // Return the array of data, loading state, and error state
    return { transactionData, loading, error };
};
