import React, {useEffect, useRef, useState} from 'react'
import RangeSlider from './components/RangeSlider'
import './App.scss'

function App() {
    const [toggleDropdownRgb, setToggleDropdownRgb] = useState(false)
    const [toggleDropdownColor, setToggleDropdownColor] = useState(false)

    const dropdownRgbRef = useRef<HTMLDivElement>(null)
    const dropdownColorRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        document.body.addEventListener('click', (e: MouseEvent) => {
            if (dropdownRgbRef?.current?.contains(e.target as HTMLElement) || dropdownColorRef?.current?.contains(e.target as HTMLElement)) {
                return
            }

            setToggleDropdownRgb(false)
            setToggleDropdownColor(false)
        })
    }, [])

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

    return (
        <div className={'color-picker'}>
            <p className={'color-showcase'}>#ff33cc</p>
            <button
                aria-label={'Generate Color'}
                className="color-box color-block center-by-flex"
                onClick={(e) => handleDropdownToggle(e, 'dropdown-rgb')}
            >
                <span className={'hex-bg'} style={{backgroundColor: '#ff33cc'}}/>
            </button>
            {toggleDropdownRgb &&
                <div ref={dropdownRgbRef} role={'list'} className={'dropdown dropdown-large dropdown-rgb'} id={'dropdown-rgb'}>
                    <RangeSlider
                        className={'range-slider-red'}
                        colorText={'R'}
                    />
                    <RangeSlider
                        className={'range-slider-green'}
                        colorText={'G'}
                    />
                    <RangeSlider
                        className={'range-slider-blue'}
                        colorText={'B'}
                    />
                    <div className={'dropdown-buttons'}>
                        <button className={'button button-second dropdown-buttons-first'}>cancel</button>
                        <button className={'button button-primary'}>ok</button>
                    </div>
                </div>
            }

            <button
                aria-label={'Choose Color'}
                className={'color-history color-block center-by-flex'}
                onClick={(e) => handleDropdownToggle(e)}
            >
                <span className={'arrow-down'} />
            </button>
            {toggleDropdownColor &&
                <ul ref={dropdownColorRef} className={'dropdown dropdown-list'}>
                    <li className={'list-item'}>
                        <button className={'color-button'} aria-label={'Color Red'}>
                            <span className={'color-text'}>Red</span>
                            <span className={'color-bg bg-red'}/>
                        </button>
                    </li>
                    <li className={'list-item'}>
                        <button className={'color-button'} aria-label={'Color Yellow'}>
                            <span className={'color-text'}>Yellow</span>
                            <span className={'color-bg bg-yellow'}/>
                        </button>
                    </li>
                    <li className={'list-item'}>
                        <button className={'color-button'} aria-label={'Color Green'}>
                            <span className={'color-text'}>Green</span>
                            <span className={'color-bg bg-green'}/>
                        </button>
                    </li>
                    <li className={'list-item'}>
                        <button className={'color-button'} aria-label={'Color Blue'}>
                            <span className={'color-text'}>Blue</span>
                            <span className={'color-bg bg-blue'}/>
                        </button>
                    </li>
                </ul>
            }
        </div>
    )
}

export default App
