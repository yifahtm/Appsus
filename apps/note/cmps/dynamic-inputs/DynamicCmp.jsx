// import { ColorInput } from "./ColorInput.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function DynamicCmp(props) {
    console.log((props.previewStyle))
    switch (props.cmpType) {
        // case 'color':
        //     return <ColorInput {...props} />
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }
}