const { useState, useEffect } = React

export function MailActions({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onSetSortBy({ target }) {
        let { value, name: field } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
        onSetFilter(filterByToEdit)
    }


    return (
        <label htmlFor="read">
        <select id="read" htmlFor="read" name="read" onChange={onSetSortBy}>
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
        </label>
    )
}


// (options.sortBy.vendor) {
//     cars.sort((car1, car2) => (car1.vendor.localeCompare(car2.vendor)) * options.sortBy.vendor)
// }