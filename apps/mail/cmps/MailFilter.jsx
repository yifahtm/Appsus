const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    let { search } = filterByToEdit
    return (
        <div className="filter">
            <form className="search" onSubmit={onFilter}>
                <button>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </button>
                {/* <label htmlFor="search">
            </label> */}
                <input type="text"
                    id="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="search" />

            </form>
        </div>
    )
}