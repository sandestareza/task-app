import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import InputField from '../../components/InputField'
import ButtonAction from '../../components/ButtonAction'
import { useForm, Controller } from 'react-hook-form';
import { signIn } from '../../api/auth';

import { useNavigate } from "react-router-dom";

import { EMAIL_REGEX } from '../../helpers/regex'
import { checkToken } from '../../helpers/tokens';

import { ToastContainer, toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate();

    const [isHidePass, setIsHidePass] = useState(false)

    const clickShowPass = () => setIsHidePass(!isHidePass)

    const { handleSubmit, control, formState: { errors } } = useForm(); 

    const handleSignIn = async (data) => {
        
        const toastId = toast.loading("Please wait...")

        const res = await signIn(data)

        if (res.status !== 200) {
                        
            return toast.update(toastId, {
                 render: res.message, 
                 type: "warning", 
                 isLoading: false,
                 autoClose : 3000
            });
        }

        return toast.update(toastId, {
            render: res.message, 
            type: "success", 
            isLoading: false,
            autoClose : true,
            onClose: () => navigate('/')
       });        
        
    }

    // check user is login
	useEffect(() => {
        
        const token = checkToken()

        if (token) {
          navigate("/");
          return;
        }

    }, [navigate]);
    

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <ToastContainer
                autoClose={1000}         
            />
            <div className='card dark:bg-gray-500 dark:border-gray-400 dark:text-zinc-100'>
                <div className='card-body'>
                    <h6 className='text-center font-bold text-2xl'>Form Login</h6>
                    <form onSubmit={handleSubmit(handleSignIn)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern : EMAIL_REGEX
                            }}
                            render={({ field }) => (
                                <InputField 
                                    label="Email"
                                    field={field}
                                    onChange={(value)=>field.onChange(value)}
                                />
                            )}
                        />
                        <p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.email?.type === 'required' && 'Email is required'}</p>
                        <p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.email?.type === 'pattern' && 'Invalid email address'}</p>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <InputField 
                                    label="Password"
                                    field={field}
                                    onChange={(value)=>field.onChange(value)}
                                    type={isHidePass ? 'text' : 'password'}
                                />
                            )}
                        />
                        <p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.password && 'Password is required'}</p>
							<button
                                type='button'
								className='text-xs mt-1'
								onClick={clickShowPass}
							>
								{ isHidePass ? 'hide Password' : 'Show Password' }
								
							</button>
                            <div className='text-center'>
                                <ButtonAction 
                                    type="submit"
                                    className="btn-save mt-5 dark:bg-teal-700 hover:dark:bg-teal-900 dark:border-teal-900"
                                >
                                    Login
                                </ButtonAction>
                            </div>
                    </form>
                    <div className='mt-2'>
                        <p className='text-center font-light text-sm'>
                            Not Account? 
                            <Link to='/auth/register' className='ml-1 dark:hover:text-blue-200 hover:text-blue-600 hover:font-bold'>Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login