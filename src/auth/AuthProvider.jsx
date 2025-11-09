import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import app from '../config/firebase/firebase.config';
import { AuthContext } from './AuthContext';
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLoginWithPopUp = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const gitHubLoginWithPopUp = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        };
    }, [user, loading]);

    const authInfo = {
        user,
        setUser,
        loading,
        googleLoginWithPopUp,
        gitHubLoginWithPopUp,
        logOut,
        createUser,
        updateUserProfile,
        signInUser,
        resetPassword,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;