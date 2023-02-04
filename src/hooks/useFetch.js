import React, { useEffect, useState } from 'react'

const useFetch = (path) => {

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)
    const [data, setData] = useState([])


    const fetchData = async () => {

    }

    useEffect(() => {
      
        fetchData()
      
    }, [])
    


    return [isLoading, isError, data]
}

export default useFetch