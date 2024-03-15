export function ColorInput({ onChangeStyle, previewStyle }) {
    console.log(previewStyle)
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1', '#ffffff']

    function onSetColor(color) {
        const style = { backgroundColor: color }
        onChangeStyle(style)
    }


    return <section className="color-input">
        <div className="items-container flex space-around">
            {
                colors.map(color => <div key={color}
                    className={`item  + ${color === previewStyle.backgroundColor ? 'selected' : ''}`}
                    onClick={() => onSetColor(color)}
                    style={{ backgroundColor: color }}
                ></div>)
            }
        </div>

    </section>
} 