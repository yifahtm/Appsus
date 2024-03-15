

export function MailActions() {

    

function onSetSortBy({target}) {

    console.log(target.value)
}


    return (
        <select onChange={onSetSortBy}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
    )
}