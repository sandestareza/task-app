import React, { useEffect, useState } from 'react'
import GetGroups from '../../api/todos/groups/GetGroups'
import Header from '../../components/Layout/Header'

import Loading from '../../components/Loading'
import CardTodos from '../../components/CardTodos'

import IconEmtyData from '../../assets/icons/emty-data.svg';
import IconEmtyDataDark from '../../assets/icons/emty-data-dark.svg';

function Home() {

	const [modeDark, setModeDark] = useState(typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? true : false)

	const COLOR_CARD = [
		'bg-teal-100',
		'bg-red-100',
		'bg-amber-100',
		'bg-lime-100',
		'bg-indigo-100'
	]

	const BORDER_COLOR_CARD = [
		'border-teal-400',
		'border-red-400',
		'border-amber-400',
		'border-lime-400',
		'border-indigo-400'
	]

	const [listTodos, setListTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getListTodos = async () =>{

		setIsLoading(true)

		const res = await GetGroups()
		
		if (res.status === 200) {
			setListTodos(res.data)
			setIsLoading(false)
		}

	}

	useEffect(() => {		
		getListTodos()
	}, [])
	

    return (
        <div className="flex flex-col justify-center items-center w-full">
			<Header 
				listTodos={()=>getListTodos()}		
				setModeDark={(bool)=>setModeDark(bool)}		
			/>
			<div className="container mt-3">
				<div className={`grid grid-rows-1 ${listTodos.length ? 'md:grid-cols-4' : 'md:grid-cols-1' } gap-3 w-full px-2 md:px-0`}>
				{
					isLoading ? <Loading darktext="dark:text-zinc-100" darkbg="dark:bg-zinc-100" /> :
					listTodos.length ?
						listTodos.map((todo, i) => {
							todo.ordering = i+1
							return (		
								<CardTodos 
									ordering={todo.ordering}
									length={listTodos.length}
									key={todo.id} 
									todo={todo} 
									idGroup={todo.id} 
									listTodos={listTodos}
									bgcolor={COLOR_CARD[i]}
									bdcolor={BORDER_COLOR_CARD[i]}
									refreshTodo={getListTodos}
								/>				
								
													
							)
						})
					:
					<div className='flex w-100 flex-col w-full justify-center items-center'>
						{
							<img 
								src={modeDark ? IconEmtyDataDark : IconEmtyData}
								alt="emty-data"
								className='w-[500px] h-[500px]'
							/>
						}
						<p className='text-center dark:text-zinc-100 font-bold -mt-24'>Empty data</p>
					</div>					
				}
				</div>	
				
			</div>
		</div>
    )
}

export default Home