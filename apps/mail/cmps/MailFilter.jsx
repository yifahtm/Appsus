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
        let { value} = target
        setFilterByToEdit(value)
    }

    return (
        <form onSubmit={onFilter}>
            <label htmlFor="search">

            </label>
            <input type="text"
                id="search"
                name="search"
                value={filterByToEdit}
                onChange={handleChange}
                placeholder="search"/>
                

            <button>
                <span className="material-symbols-outlined">
                    search
                </span>
            </button>
        </form>
    )
}