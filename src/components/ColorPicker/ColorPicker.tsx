import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import RangeSlider from '../RangeSlider/RangeSlider'
import './color-picker.scss'

interface IColors {
    name: string,
    color: string
}

interface IColorPickerProps {
    value: string,
    colors: Array<IColors>,
    onChange: (e: ChangeEvent<HTMLInputElement>, colorCode: string) => void,
    squareHexColor: string,
    onColorClickEvent: (color: string) => void,
    onDropdownCancelEvent: () => void
    onDropdownSubmitEvent: () => void
}

function ColorPicker(props: IColorPickerProps) {
    const [toggleDropdownRgb, setToggleDropdownRgb] = useState(false)
    const [toggleDropdownColorList, setToggleDropdownColorList] = useState(false)

    const dropdownRgbRef = useRef<HTMLDivElement>(null)
    const dropdownColorListRef = useRef<HTMLUListElement>(null)

    const handleDropdownToggle = (e: React.MouseEvent, whichToggle?: string) => {
        e.stopPropagation()

        if (whichToggle === 'dropdown-rgb') {
            setToggleDropdownColorList(false)
            setToggleDropdownRgb(!toggleDropdownRgb)
        } else {
            setToggleDropdownRgb(false)
            setToggleDropdownColorList(!toggleDropdownColorList)
        }
    }

    const handleClickColor = (color: string) => {
        props.onColorClickEvent(color)
        setToggleDropdownColorList(false)
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
            if (dropdownRgbRef?.current?.contains(e.target as HTMLElement) || dropdownColorListRef?.current?.contains(e.target as HTMLElement)) {
                return
            }

            props.onDropdownCancelEvent()
            setToggleDropdownRgb(false)
            setToggleDropdownColorList(false)
        })
    }, [props])

    return (
        <div className={'color-picker'}>
            <p className={'color-showcase'}>{props.value}</p>
            <button
                aria-label={'Generate Color'}
                id={'color-generator'}
                className="color-box color-block center-by-flex"
                onClick={(e) => handleDropdownToggle(e, 'dropdown-rgb')}
            >
                <span className={'hex-bg'} style={{backgroundColor: props.squareHexColor}}/>
            </button>
            <div
                ref={dropdownRgbRef}
                aria-labelledby="color-generator"
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
                id={'color-list'}
                className={'color-history color-block center-by-flex'}
                onClick={(e) => handleDropdownToggle(e)}
            >
                <span className={'arrow-down'}/>
            </button>
            {toggleDropdownColorList &&
            <ul
                ref={dropdownColorListRef}
                className={'dropdown dropdown-list'}
                aria-labelledby="color-list"
            >
                {renderColors()}
            </ul>
            }
        </div>
    )
}

export default ColorPicker
