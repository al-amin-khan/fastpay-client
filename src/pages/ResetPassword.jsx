import React, { useState } from 'react';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const ResetPassword = () => {
    const { resetPassword } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const location = useLocation();

    const emailRef = location.state?.email;



    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        setIsSubmitting(true);
        resetPassword(email)
            .then(() => {
                toast.success(`Please check your email to reset your password.`, {
                    duration: 3000,
                    position: 'bottom-left',
                })
                toast.success(`Redirecting to your inbox`, {
                    duration: 3000,
                    position: 'bottom-left',
                })
                setTimeout(() => {
                    window.location.href = 'https://mail.google.com'
                }, 3500);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`Error: ${errorCode}-${errorMessage}`, {
                    duration: 4000,
                    position: 'bottom-left',
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }



    return (
        <div className="hero bg-base-200 min-h-[90vh]">
            <div className="hero-content w-full md:w-3/4 lg:w-3/4">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <div className='text-center text-3xl font-bold text-gray-800'>Reset Password</div>
                        <form onSubmit={handleResetPassword}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input defaultValue={emailRef} type="email" name='email' className="input w-full" placeholder="Email" required />
                                <button className={`btn mt-4 ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'btn-neutral'}`} disabled={isSubmitting}>Reset</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;