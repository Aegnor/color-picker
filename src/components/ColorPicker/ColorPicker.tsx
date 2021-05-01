import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import RangeSlider from '../RangeSlider/RangeSlider'
import './color-picker.scss'

interface IColors {
    name: string,
    color: string
}

interface IColorPickerProps {
    value: string,
    squareHexColor: string,
    colors: Array<IColors>,
    onChange: (e: ChangeEvent<HTMLInputElement>, colorCode: string) => void,
    onColorClickEvent: (color: string) => void,
    onDropdownCancelEvent: () => void
    onDropdownSubmitEvent: () => void
}

function ColorPicker(props: IColorPickerProps) {
    const [toggleDropdownRgb, setToggleDropdownRgb] = useState(false)
    const [toggleDropdownColor, setToggleDropdownColor] = useState(false)

    const dropdownRgbRef = useRef<HTMLDivElement>(null)
    const dropdownColorRef = useRef<HTMLUListElement>(null)

    const handleDropdownToggle = (e: React.MouseEvent, whichToggle?: string) => {
        e.stopPropagation()

        if (whichToggle === 'dropdown-rgb') {
            setToggleDropdownColor(false)
            setToggleDropdownRgb(!toggleDropdownRgb)
        } else {
            setToggleDropdownRgb(false)
            setToggleDropdownColor(!toggleDropdownColor)
        }
    }

    const handleClickColor = (color: string) => {
        props.onColorClickEvent(color)
        setToggleDropdownColor(false)
    }

    const handleClickCancel = () => {
        props.onDropdownCancelEvent()
        setToggleDropdownRgb(false)
    }

    const handleClickSubmit = () => {
        props.onDropdownSubmitEvent()
        setToggleDropdownRgb(false)
    }

    const renderColors = () => {
        return props.colors.map((color, i) => {
            return <li className={'list-item'} key={i}>
                <button className={'color-button'} aria-label={`Color ${color.name}`}
                        onClick={() => handleClickColor(color.color)}>
                    <span className={'color-text'}>{color.name}</span>
                    <span className={'color-bg'} style={{backgroundColor: color.color}}/>
                </button>
            </li>
        })
    }

    useEffect(() => {
        document.body.addEventListener('click', (e: MouseEvent) => {
            if (dropdownRgbRef?.current?.contains(e.target as HTMLElement) || dropdownColorRef?.current?.contains(e.target as HTMLElement)) {
                return
            }

            props.onDropdownCancelEvent()
            setToggleDropdownRgb(false)
            setToggleDropdownColor(false)
        })
    }, [props])

    return (
        <div className={'color-picker'}>
            <p className={'color-showcase'}>{props.value}</p>
            <button
                aria-label={'Generate Color'}
                className="color-box color-block center-by-flex"
                onClick={(e) => handleDropdownToggle(e, 'dropdown-rgb')}
            >
                <span className={'hex-bg'} style={{backgroundColor: props.squareHexColor}}/>
            </button>
            <div
                ref={dropdownRgbRef}
                role={'list'}
                className={'dropdown dropdown-large dropdown-rgb'}
                id={'dropdown-rgb'}
                style={{display: toggleDropdownRgb ? 'block' : 'none'}}
            >
                <RangeSlider
                    className={'range-slider-red'}
                    onChangeHandler={props.onChange}
                    colorText={'red'}
                />
                <RangeSlider
                    className={'range-slider-green'}
                    onChangeHandler={props.onChange}
                    colorText={'green'}
                />
                <RangeSlider
                    className={'range-slider-blue'}
                    onChangeHandler={props.onChange}
                    colorText={'blue'}
                />
                <div className={'dropdown-buttons'}>
                    <button className={'button button-second dropdown-buttons-first'} onClick={handleClickCancel}>cancel</button>
                    <button className={'button button-primary'} onClick={handleClickSubmit}>ok</button>
                </div>
            </div>

            <button
                aria-label={'Choose Color'}
                className={'color-history color-block center-by-flex'}
                onClick={(e) => handleDropdownToggle(e)}
            >
                <span className={'arrow-down'}/>
            </button>
            {toggleDropdownColor &&
            <ul ref={dropdownColorRef} className={'dropdown dropdown-list'}>
                {renderColors()}
            </ul>
            }
        </div>
    )
}

export default ColorPicker
