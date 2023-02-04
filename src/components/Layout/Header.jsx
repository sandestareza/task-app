import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import ButtonAction from '../ButtonAction'
import ModalForm from '../ModalForm';
import InputField from '../InputField'
import { Controller, useForm } from 'react-hook-form';
import InputTextArea from '../InputTextArea';
import { CreateGroup } from '../../api/todos/groups/CreateGroup';
import { IoMdAdd } from 'react-icons/io'
import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';

function Header(props) {

    const navigate = useNavigate();

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowMenu, setIsShowMenu] = useState(false)

    const root = window.document.documentElement
    const lightTheme = "light"
    const darkTheme = "dark"
    let theme;

    if (localStorage) {
        theme = localStorage.getItem("theme")
    }
    if (theme === lightTheme || theme === darkTheme) {
        root.classList.add(theme);
    } else {
        root.classList.add(lightTheme)
    }

    const hanldeLogout = async() => {
        const res = await logout()
        
        if (res.status === 200) {
            navigate('/auth/login')
        }
    }

    const showModal = () => setIsShowModal(true)

    const { resetField, handleSubmit, control, formState: { errors } } = useForm(); 

    const createGroup = async(data) => {

        const toastId = toast.loading("Please wait...")

        const res = await CreateGroup(data)
        
        if (res.status === 201) {

            return toast.update(toastId, {
                render: res.message, 
                type: "success", 
                isLoading: false,
                autoClose : true,
                onClose: () => {
                    props.listTodos()
                    resetForm()
                }
            })
            
        }
    }

    const resetForm = () => {
        resetField('title')
        resetField('description')
        setIsShowModal(false)
    }        
    
    const handleDarkMode = () => {
        setIsShowMenu(false)
        
        if (theme === darkTheme) {
            root.classList.replace(darkTheme, lightTheme);
            localStorage.setItem("theme", "light");
            theme = lightTheme
            props.setModeDark(false)
        } else {
            root.classList.replace(lightTheme, darkTheme)
            localStorage.setItem("theme", 'dark')
            props.setModeDark(true)
        }
    }
    

    return (
        <div className='container border-b border-dashed relative'>
            <ToastContainer autoClose={1000}/>
            <div className="flex items-center justify-between gap-x-4 w-full py-7 px-2 md:px-0">
                <div className='flex'>
                    <h1 className="text-2xl font-bold mr-3 dark:text-zinc-100">Product Roadmap</h1>
                    <ButtonAction 
                        onClick={showModal}
                        className="flex items-center btn-add dark:text-zinc-100 dark:bg-teal-700 hover:dark:bg-teal-900"
                    >
                     <IoMdAdd className='mr-1 text-lg'/>Add New Group
                    </ButtonAction>
                </div>
                <div>
                    <a className="flex items-center gap-1 text-md hover:font-bold hover:cursor-pointer dark:text-zinc-100" onClick={()=>setIsShowMenu(!isShowMenu)}>
                        {
                            isShowMenu ?
                            <AiOutlineClose className='text-2xl' />
                            :
                            <AiOutlineMenu className='text-2xl'/>
                        }
                    </a>
                </div>
            </div>
            {
                isShowModal &&
                <ModalForm onSubmit={handleSubmit(createGroup)} resetForm={()=>resetForm()} title='Add New Group'>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <InputField 
                                label="Title"
                                field={field}
                                onChange={(value)=>field.onChange(value)}
                            />
                        )}
                    />    
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <InputTextArea 
                                label="Description"
                                field={field}
                                onChange={(value)=>field.onChange(value)}
                            />
                        )}
                    />    
                </ModalForm>
            }
            {
                isShowMenu &&
                <div className="list-group absolute z-50 right-0 top-16 transition-all ease-linear dark:border-zinc-500 dark:text-zinc-100 dark:bg-gray-800" onMouseLeave={()=>setIsShowMenu(false)}>
                    <ul>
                        <li className="list-group-menu items-center hover:dark:bg-gray-700" onClick={handleDarkMode}>
                            <span>{ theme === darkTheme ? <BsFillSunFill /> : <BsFillMoonFill /> }</span>
                            <span>{ theme === darkTheme ? 'Mode Light' : 'Mode Dark'}</span>
                        </li>
                        <li className="list-group-menu items-center hover:dark:bg-gray-700" onClick={hanldeLogout}>
                            <span><AiOutlineLogout /></span>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Header