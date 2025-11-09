import { useState, useEffect, useRef } from "react"

import { utilService } from "../services/util.service.js"

export function BugFilter({ filterBy, onSetFilterBy }){

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    const handleChange = ({ target }) => {
        let { value, name: field, type } = target
        value = type === 'text' ? value : +value
        if (field === 'labels' && value.length > 0) value = value.split(',').map(label => label.trim())
        setFilterByToEdit({ ...filterByToEdit, [field]: value} )
    }

    return(
        <div className="filter-container">
            <input 
                type="text" 
                name='title'
                placeholder='Filter by bug title'
                value={filterByToEdit.title || ''} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name='labels'
                placeholder='Filter by labels comma seperated'
                value={filterByToEdit.labels || ''} 
                onChange={handleChange}
            />
            <span className="filter-text">Min Severity: </span>
            <select               
                name='severityMin'
                value={filterByToEdit.severityMin || ''}
                onChange={handleChange} 
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <span className="filter-text">Max Severity: </span>
            <select  
                name='severityMax'
                value={filterByToEdit.severityMax || ''}
                onChange={handleChange} 
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
} 