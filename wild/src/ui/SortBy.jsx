import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

export default function SortBy({options}) {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get('sortBy') || " "    //empty string selects the first element of the select 
    
    function handleChange(e){
        searchParams.set('sortBy',e.target.value)
        setSearchParams(searchParams)
    }
  
    return (
    <div>
      <Select options={options} type="white" onChange={handleChange} />
    </div>
  )
  
}
