import { ColorInput } from "./ColorInput.jsx"

export function DynamicCmp(props) {
    console.log((props.previewStyle))
    switch (props.cmpType) {
        case 'color':
            return <ColorInput {...props} />
    }
}