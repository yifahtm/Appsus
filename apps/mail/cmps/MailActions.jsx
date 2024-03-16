const { useState, useEffect } = React

export function MailActions({ filterBy, onSetFilter, sortBy, onSortChange }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit, sortByToEdit])


    function onFilter({ target }) {
        let { value, name: field } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
        onSetFilter(filterByToEdit)
    }


    function handleSortChange(sortByKey) {
        if (sortBy[sortByKey] === 1) {
            onSortChange({ [sortByKey]: -1 })
            setSortByToEdit(sortBy)
            return
        }
        onSortChange({ [sortByKey]: 1 })
        setSortByToEdit(sortBy)
    }

    function getArrow(value){
        if (!sortByToEdit[value] || sortByToEdit[value] === 1) return '▼'
        else return '▲'

    }

//'▲' : '▼';

    return (
        <section className="mail-actions">
            <label htmlFor="read">
                <select id="read" htmlFor="read" name="read" onChange={onFilter}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </label>
            <button onClick={() => handleSortChange('date')}> <span>{getArrow('date')}</span> Date
                {/* <span className="material-symbols-outlined">
                    expand_more
                </span> */}
            </button>
            <button onClick={() => handleSortChange('subject')}><span>{getArrow('subject')}</span> Subject 
                {/* <span
                    className="material-symbols-outlined">
                    expand_more
                </span> */}
            </button>
        </section>

    )
}


// (options.sortBy.vendor) {
//     cars.sort((car1, car2) => (car1.vendor.localeCompare(car2.vendor)) * options.sortBy.vendor)
// }