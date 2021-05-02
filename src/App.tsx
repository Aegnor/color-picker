import React, {ChangeEvent, useState} from 'react'
import ColorPicker from './components/ColorPicker/ColorPicker'

const colors = [
    {
        name: 'red',
        color: '#fc0303'
    },
    {
        name: 'yellow',
        color: '#fcfc03'
    },
    {
        name: 'green',
        color: '#0bfc03'
    },
    {
        name: 'blue',
        color: '#033dfc'
    }
]

const convertToHex = (string: string): string => {
    const hex = Number(string).toString(16).padStart(2, '0')
    return hex === '0' ? hex + '0' : hex
}

function App() {
    const initialHexValue = '#505050'

    const [hexColorValue, setHexColorValue] = useState(initialHexValue)
    const [squareHexColor, setSquareHexColor] = useState(initialHexValue)
    const [lastSquareHexColor, setLastSquareHexColor] = useState(initialHexValue)
    const [hex, setHex] =  useState(['50', '50', '50'])

    const handleChange = (e: ChangeEvent<HTMLInputElement>, colorCode: string) => {
        let [r, g, b] = hex
        const {value} = e.target

        if (colorCode === 'red') {
            r = convertToHex(value)
        }
        if (colorCode === 'green') {
            g = convertToHex(value)
        }
        if (colorCode === 'blue') {
            b = convertToHex(value)
        }

        setHex([r, g, b])
        setSquareHexColor(`#${r}${g}${b}`)
    }

    const onColorClickEvent = (color: string) => {
        setHexColorValue(color)
    }

    const onDropdownCancelEvent = () => {
        setSquareHexColor(lastSquareHexColor)
    }

    const onDropdownSubmitEvent = () => {
        setHexColorValue(squareHexColor)
        setLastSquareHexColor(squareHexColor)
    }

    return (
        <ColorPicker
            value={hexColorValue}
            onChange={handleChange}
            colors={colors}
            squareHexColor={squareHexColor}
            onColorClickEvent={onColorClickEvent}
            onDropdownCancelEvent={onDropdownCancelEvent}
            onDropdownSubmitEvent={onDropdownSubmitEvent}
        />
    )
}

export default App
