import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {IoMdAddCircleOutline} from 'react-icons/io'
import Badge from './Badge'
import CardItems from './CardItems'
import InputField from './InputField'
import InputPercentage from './InputPercentage'
import ModalForm from './ModalForm'
import CreateItem from '../api/todos/items/CreateItem'
import GetItems from '../api/todos/items/GetItems'
import UpdateItem from '../api/todos/items/UpdateItem'
import DeleteItem from '../api/todos/items/DeleteItem'

import { ToastContainer, toast } from 'react-toastify';

function CardTodos({todo, idGroup, bgcolor, bdcolor}) {

    const [isShowModal, setIsShowModal] = useState(false)
    const [listItems, setListItems] = useState([])
    const [titleModal, setTitleModal] = useState("")

    const {  setValue, resetField, handleSubmit, control, formState: { errors } } = useForm(); 

    const getListitems = async () =>{

		const res = await GetItems(idGroup)
		
		if (res.status === 200) {
            
			setListItems(res.data)
		}

	}


    const onSubmit = async (data) =>{

        const toastId = toast.loading("Please wait...")
        
        if (data.idItem) {

            const res = await UpdateItem(data.idGroup, data.idItem, data)
            
            if (res.status === 200) {

                return toast.update(toastId, {
                    render: res.message, 
                    type: "success", 
                    isLoading: false,
                    autoClose : true,
                    onClose: () => {
                        resetForm()
                        getListitems()
                    }
                })
                
            }
            
        } else {

            const res = await CreateItem(data.idGroup, data)
            
            if (res.status === 201) {

                return toast.update(toastId, {
                    render: res.message, 
                    type: "success", 
                    isLoading: false,
                    autoClose : true,
                    onClose: () => {
                        resetForm()
                        getListitems()
                    }
                })
            }

        }


	}

    const showModal = (type = 'add' ,data) => {   
             
        setIsShowModal(true)        
        setValue('idGroup',idGroup)
        setTitleModal('Add New Item')

        if (type === 'edit') {            
            setValue('idItem',data.id);
            setValue('name',data.name);
            setValue('progress_percentage',data.progress_percentage);
            setTitleModal('Edit Item')
        } 
    }

    const handleDelete = async (idItem) => {

        const toastId = toast.loading("Please wait...")

        const res = await DeleteItem(idGroup, idItem)
            
        if (res.status === 200) {

            return toast.update(toastId, {
                render: res.message, 
                type: "success", 
                isLoading: false,
                autoClose : true,
                onClose: () => {
                    getListitems()
                }
            })
            
        }
    }
    

	useEffect(() => {
		
		getListitems()

	}, [])
    
    const resetForm = () => {
        resetField('idItem')
        resetField('name')
        resetField('progress_percentage')
        setIsShowModal(false)        
    }

    const handleOnDragOver = e => e.preventDefault()

    const handleOnDrop = async(e) => {
        e.preventDefault();
         
        const data = JSON.parse(e.dataTransfer.getData('data'));
        const res = await UpdateItem(data.todo_id, data.id, data, idGroup)
            
        if (res.status === 200) getListitems()
        
    }

    return (
        <div id='drop'
            className={`flex flex-col border w-full rounded-md py-4 shadow h-max ${bgcolor} ${bdcolor} dark:bg-gray-700 dark:border-gray-500`}
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            >
            <ToastContainer autoClose={1000}/>
            <div className="mx-5">
                <Badge 
                    title={todo.title}
                    bgcolor={bgcolor}
                    bdcolor={bdcolor}
                />
            </div>
            {
                listItems.length ?
                    listItems.map(item=>(
                        <CardItems 
                            key={item.id}
                            item={item} 
                            showModalEdit={()=>showModal('edit',item)}
                            onDelete={()=>handleDelete(item.id)}
                            setListItems={setListItems}
                            listItems={listItems}
                        />
                    ))
                :
                    <div className='bg-gray-100 border border-gray-200 mt-3 mx-5 rounded py-2 px-5 dark:bg-gray-700 dark:border-gray-500'>
                        <span className='text-gray-400 text-sm dark:text-zinc-100'>No Task</span>
                    </div>
            }
            <div className='mx-5 mt-2'>
                <a className='flex items-center text-sm hover:cursor-pointer hover:font-bold dark:text-zinc-100' onClick={()=>showModal()}>
                    <IoMdAddCircleOutline className='mr-1'/> 
                    New Task
                </a>
            </div>

            {
                isShowModal &&
                <ModalForm onSubmit={handleSubmit(onSubmit)} resetForm={()=>resetForm()} title={titleModal}>
                    <Controller
                        name="idGroup"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <input {...field} type="hidden" />
                        )}
                    />    
                    <Controller
                        name="idItem"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: false
                        }}
                        render={({ field }) => (
                            <input {...field} type="hidden" />
                        )}
                    />    
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <InputField 
                                label="Name"
                                field={field}
                                onChange={(value)=>field.onChange(value)}
                            />
                        )}
                    />    
                    <Controller
                        name="progress_percentage"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <InputPercentage 
                                label="Progress Percentage"
                                field={field}
                                onChange={(value)=>field.onChange(value)}
                            />
                        )}
                    />    
                </ModalForm>
            }
        </div>	
    )
}

export default CardTodos