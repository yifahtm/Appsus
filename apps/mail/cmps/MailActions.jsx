const { useState, useEffect } = React

export function MailActions({ filterBy, onSetFilter, sortBy, handleSortChange }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onFilter({ target }) {
        let { value, name: field } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
        onSetFilter(filterByToEdit)
    }


    function onSetSortBy({ target }) {
        let { value } = target
        if (!value) return
        console.log(value)
        // if (sortByToEdit.value) sortByToEdit.value === 1 ? -1 : 1
        setSortByToEdit(prevSortBy => ({ ...prevSortBy, [value]: 1 }))
        handleSortChange(sortByToEdit)
    }

    function onChangeDir({ target }) {
        //    var newDir = dir === -1 ? 1 : -1
        //    setDir(newDir)
        //    console.log(dir)
    }

    return (
        <section className="mail-actions">
            <label htmlFor="read">
                <select id="read" htmlFor="read" name="read" onChange={onFilter}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </label>
            <button value="date" onClick={onSetSortBy}>Date
                {/* <span className="material-symbols-outlined">
                    expand_more
                </span> */}
            </button>
            <button value="subject" onClick={onSetSortBy}>Subject
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