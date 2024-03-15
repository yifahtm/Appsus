const { useState, useEffect } = React



export function NoteFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        // console.log('target', target)

        let { value, name: field, type } = target
        if (type === 'number') value = +value
        // if(type ==='checkbox') value = target.checked


        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <section className="note-filter">
        <form className="search-note flex justify-center" onSubmit={onFilter}>
            <label htmlFor="search"></label>
            <input onChange={handleChange} type="search"
                id="search"
                name="title"
                value={filterByToEdit.title}
                placeholder="Search note..." />
            <button><span className="material-symbols-outlined">
                search
            </span></button>
        </form>
    </section >
}