import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import useHelmet from "../hooks/useHelmet";



const Register = () => {
    const HelmetTags = useHelmet({
        title: 'Register',
        description: 'Pay and manage your utility bills in one place.',
    });

    const { user, setUser, googleLoginWithPopUp, gitHubLoginWithPopUp, createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleRegisterWithEmailAndPassword = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const photoURL = e.target.photoURL.value;


        const rules = {
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(confirmPassword),
            len: password.length >= 6,
        };

        const isPasswordMatch = confirmPassword.length > 0 && confirmPassword === password;

        if (!rules.len) {
            toast.error('Password must be at least 6 characters.', { duration: 5000, position: 'bottom-left' });
            return;
        }
        if (!rules.upper) {
            toast.error('Password must have uppercase characters.', {
                duration: 5000,
                position: 'bottom-left',
            });
            return;
        }
        if (!rules.lower) {
            toast.error('Password must have lowercase characters.', {
                duration: 5000,
                position: 'bottom-left',
            });
            return;
        }

        if (!isPasswordMatch) {
            toast.error('Passwords do not match.', { duration: 5000, position: 'bottom-left' });
            return;
        }

        setIsSubmitting(true);
        createUser(email, password)
            .then((res) => {
                const createdUser = res.user;
                updateUserProfile({
                    displayName: name,
                    photoURL: photoURL,
                }).then(() => {
                    toast.success('User profile updated successfully');
                    setUser(createdUser);
                }).catch((error) => {
                    toast.error(`Error updating profile: ${error.message}`, {
                        duration: 4000,
                        position: 'bottom-left',
                    });
                });

                toast.success(`Welcome, ${createdUser.displayName}, you have successfully registered.`, {
                    duration: 6000,
                    position: 'bottom-left',
                });
                navigate('/', { replace: true });
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
            });
    }


    const handleSocialLogin = (loginWith) => {
        if (loginWith === 'google') {
            googleLoginWithPopUp()
                .then(res => {
                    toast.success(`Welcome, ${res.user.displayName}, you have successfully logged in.`, {
                        duration: 6000,
                        position: 'bottom-left',
                    });
                    navigate('/', { replace: true });
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`Error: ${errorCode}-${errorMessage}`, {
                        duration: 4000,
                        position: 'bottom-left',
                    });
                })
        }
        if (loginWith === 'github') {
            gitHubLoginWithPopUp()
                .then(res => {
                    toast.success(`Welcome, ${res.user.displayName}, you have successfully logged in.`, {
                        duration: 6000,
                        position: 'top-right',
                    });
                    navigate('/', { replace: true });
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`Error: ${errorCode}-${errorMessage}`, {
                        duration: 4000,
                        position: 'bottom-left',
                    });
                });
        }
    };
    return (
        <>
            <HelmetTags />
            <div className="hero bg-base-200 min-h-[90vh]">
                <div className="hero-content w-full md:w-3/4 lg:w-3/4">
                    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                        <div className="card-body">
                            <p className='text-center font-semibold text-3xl text-base-content'>Sign Up</p>
                            <form onSubmit={handleRegisterWithEmailAndPassword}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="name" name='name' className="input w-full" placeholder="Name" />
                                    <div>
                                        <div className='flex flex-row justify-between'>
                                            <label className="label">Email</label>
                                            <p className="label-confirm-password w-1/2 text-end text-error/70">Mandatory</p>
                                        </div>
                                        <input type="email" name='email' className="input w-full" placeholder="Email" required />
                                    </div>

                                    <div>
                                        <div className='flex flex-row justify-between'>
                                            <label className="label">Password</label>
                                            <p className="label-confirm-password w-1/2 text-end text-error/70">Mandatory</p>
                                        </div>
                                        <label className="input w-full">
                                            <input type={showPassword ? 'text' : 'password'} name='password' className="grow w-full" placeholder="Password" required />
                                            {
                                                showPassword ?
                                                    <Eye className="h-5 w-5" onClick={() => setShowPassword(!showPassword)} />
                                                    :
                                                    <EyeOff className="h-5 w-5" onClick={() => setShowPassword(!showPassword)} />
                                            }
                                        </label>
                                    </div>
                                    <div>
                                        <div className='flex flex-row justify-between'>
                                            <label className="label-confirm-password w-1/2">Confirm Password</label>
                                            <p className="label-confirm-password w-1/2 text-end text-error/70">Mandatory</p>
                                        </div>
                                        <input type="password" name='confirmPassword' className="input w-full" placeholder="Confirm Password" required />
                                    </div>

                                    <label className="label">Photo URL</label>
                                    <input type="text" name='photoURL' className="input w-full" placeholder="Photo URL" />

                                    <div className='grid grid-cols-2 w-full'>
                                        <div></div>
                                        <Link to="/auth/login" className="link link-hover text-end">Already have an account?</Link>
                                    </div>
                                    <button className={`btn mt-4 ${isSubmitting ? 'bg-neutral/40 text-neutral-content cursor-not-allowed' : 'btn-neutral'}`} disabled={isSubmitting}>Submit</button>
                                </fieldset>
                            </form>
                            <button onClick={() => handleSocialLogin('google')} className="btn btn-soft mt-4">
                                <FcGoogle className='h-7 w-7' />
                                Login With Google
                            </button>
                            <button onClick={() => handleSocialLogin('github')} className="btn btn-soft mt-4">
                                <IoLogoGithub className='h-7 w-7' />
                                Login With GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
