

export function MailFilter() {

    function onFilter(ev) {
        ev.preventDefault()
    }

    function handleChange({ target }) {
        console.log(target)
    }

    return (
        <form onSubmit={onFilter}>
            <label htmlFor="search">

            </label>
            <input type="text"
                id="search"
                name="search"
                value=" "
                onChange={handleChange}
                placeholder="search" />

            <button>
                <span class="material-symbols-outlined">
                    search
                </span>
            </button>
        </form>
    )
}