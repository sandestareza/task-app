import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";

import ButtonAction from '../../components/ButtonAction'
import InputField from '../../components/InputField'

import { signUp } from '../../api/auth'

import {
	EMAIL_REGEX,
	NAME_REGEX,
	PWD_REGEX
} from '../../helpers/regex'
import { checkToken } from '../../helpers/tokens';

import { ToastContainer, toast } from 'react-toastify';

function Register() {

	const navigate = useNavigate();

	const [isHidePass, setIsHidePass] = useState(false)
	const [isHidePassConfir, setIsHidePassConfir] = useState(false)
	const [isMatchPass, setisMatchPass] = useState(true)

	const clickShowPass = () => setIsHidePass(!isHidePass)
	const clickShowPassConfir = () => setIsHidePassConfir(!isHidePassConfir)

	const { getValues, watch, handleSubmit, control, formState: { errors } } = useForm(); 
	
	const confPass = watch('password_confirmation')

	const handleSignUp = async (data) => {

		if (isMatchPass) {

			const toastId = toast.loading("Please wait...")
			
			const res = await signUp(data)
	
			if (res.status !== 201) {
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
			})
			
		}
        
    }

	// check math password
	useEffect(() => {
	  
		if (getValues('password') !== confPass) setisMatchPass(false)
		else setisMatchPass(true)
	  
	}, [confPass])

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
					<h6 className='text-center font-bold text-2xl'>Form Register</h6>
					<form onSubmit={handleSubmit(handleSignUp)}>
						<Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern : NAME_REGEX
                            }}
                            render={({ field }) => (
                                <InputField 
                                    label="Name"
                                    field={field}
                                    onChange={(value)=>field.onChange(value)}
                                />
                            )}
                        />
						<p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.name?.type === 'required' && 'Name is required'}</p>
                        <p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.name?.type === 'pattern' && 'Input only letter'}</p>
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
						<p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.name?.type === 'required' && 'Email is required'}</p>
                        <p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.name?.type === 'pattern' && 'Invalid email address'}</p>
						<Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern : PWD_REGEX
                            }}
                            render={({ field }) => (
                                <InputField 
                                    label="Password"
                                    field={field}
                                    onChange={(value)=>field.onChange(value)}
									type={isHidePass ? "text" : "password"}
                                />
                            )}
                        />
							<p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.password?.type === 'required' && 'Password is required'}</p>
							<p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.password?.type === 'pattern' && 'The password must consist of numbers, uppercase, lowercase and symbols'}</p>
							<button
								type='button'
								className='text-xs mt-1'
								onClick={clickShowPass}
							>
								{ isHidePass ? 'hide Password' : 'Show Password' }
								
							</button>
						<Controller
                            name="password_confirmation"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true							
                            }}
                            render={({ field }) => (
                                <InputField 
                                    label="Confirmation Password"
                                    field={field}
                                    onChange={(value)=>field.onChange(value)}
									type={isHidePassConfir ? "text" : "password"}
                                />
                            )}
                        />
							<p className='text-xs text-red-700 dark:text-red-200 mt-2'>{errors.password_confirmation?.type === 'required' && 'Password is required'}</p>
							<p className='text-xs text-red-700 dark:text-red-200 mt-2'>{isMatchPass ? '' : 'Passwords do not match'}</p>
							<button
								type='button'
								className='text-xs mt-1'
								onClick={clickShowPassConfir}
							>
								{ isHidePassConfir ? 'hide Password' : 'Show Password' }
								
							</button>
						
						<div className='text-center'>
							<ButtonAction 
								type="submit"
								className="btn-save mt-5 dark:bg-teal-700 hover:dark:bg-teal-900 dark:border-teal-900"
							>
								Register
							</ButtonAction>
						</div>
					</form>
					<div className='mt-2'>
						<p className='text-center font-light text-sm'>
							Already Account? 
							<Link to='/auth/login' className='ml-1 dark:hover:text-blue-200 hover:text-blue-600 hover:font-bold'>Login</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register