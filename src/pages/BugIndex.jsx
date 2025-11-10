import { useState } from 'react'
import { useEffect } from 'react'

import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'

export function BugIndex() {
    const [bugs, setBugs] = useState([])
    const [filterBy, setFilterBy] = useState({})
    const [sortBy, setSortBy] = useState({})
    const [sortDir, setSortDir] = useState('desc')
    const [pageIdx, setPageIdx] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        console.log(pageIdx)
        loadBugs(filterBy, sortBy, pageIdx, sortDir)
    }, [filterBy, pageIdx])
    
    useEffect(() => {
        setPageIdx(1)
        loadBugs(filterBy, sortBy, pageIdx, sortDir)
    }, [sortBy, sortDir])

    async function loadBugs(filterBy, sortBy, pageIdx, sortDir) {
        const { bugs, totalPages } = await bugService.query(filterBy, sortBy, pageIdx, sortDir)
        setBugs(bugs)
        setTotalPages(totalPages)
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            console.log('Deleted Succesfully!')
            setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description?'),
            labels: prompt('Bug Labels - comma seperated').split(',').map(label => label.trim())
        }
        try {
            const savedBug = await bugService.save(bug)
            console.log('Added Bug', savedBug)
            // setBugs(prevBugs => [...prevBugs, savedBug])
            loadBugs()
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {

            const savedBug = await bugService.save(bugToSave)
            console.log('Updated Bug:', savedBug)
            setBugs(prevBugs => prevBugs.map((currBug) =>
                currBug._id === savedBug._id ? savedBug : currBug
            ))
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    function onSetFilterBy(filterByToSet){
        setFilterBy(filterByToSet)
    }

    function onSetSortBy(sortByToSet){
        setSortBy(sortByToSet)
    }

    function handleSortChanghe(ev){
        onSetSortBy(ev.target.id)
    }

    function handleSortDirChange(){
        setSortDir((dir) => dir === 'desc' ? 'asc' : 'desc')
    }

    function handlePageChange({ target }) {
        setPageIdx(+target.value)
    }

    return (
        <section>
            <h2>Bugs App</h2>
            <main>
                <button onClick={onAddBug}>Add Bug ⛐</button>
                <h3>Filter By:</h3>
                <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                <h3>Sort By:</h3>
                

                <input type="radio" id="title" name='sortBy' onChange={handleSortChanghe} value={sortBy}/>
                <label htmlFor="vehicle1"> Title </label><br/>
                <input type="radio" id="severity" name='sortBy' onChange={handleSortChanghe} value={sortBy}/>
                <label htmlFor="vehicle2"> Severity </label><br/>
                <input type="radio" id="createdAt" name='sortBy' onChange={handleSortChanghe} value={sortBy}/>
                <label htmlFor="vehicle3"> Created At </label><br/>
                Ascending order:
                <input type='checkbox' name='sortDir' onChange={handleSortDirChange} />
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
                <div className="pagination-controls">
                    <h3>Page:</h3>
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((idx) => (
                        <label key={idx}>
                            <input
                                type="radio"
                                name="pageIdx"
                                value={idx}
                                checked={pageIdx === idx}
                                onChange={handlePageChange}
                            />
                            {idx}
                        </label>
                    ))}
                </div>
            </main>
        </section>
    )
}
