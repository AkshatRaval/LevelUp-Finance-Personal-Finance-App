// src/hooks/useUserData.js

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContexts';

export const useTransactionData = () => {
    const { currentUser } = useAuth();
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // We don't want to run the fetch if there's no user.
        if (!currentUser?.uid) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            const userDocRef = doc(db, "users", currentUser.uid);
            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                } else {
                    console.log("No such user document!");
                    setError("User profile not found.");
                }
            } catch (err) {
                console.error("Error fetching user document:", err);
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false); // This runs regardless of success or failure
            }
        };

        fetchUserData();
    }, [currentUser]); // Re-run the effect if the currentUser changes

    // Return the data, loading state, and error state for the component to use
    return { transactionData, loading, error };
};