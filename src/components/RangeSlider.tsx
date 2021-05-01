import React from 'react'
import './range-slider.scss'

interface IRangeSliderProps {
    className: string,
    colorText: string
}

function RangeSlider(props: IRangeSliderProps) {
    return (
        <div className={'range-slider'}>
            <span className={'range-slider-text'}>{props.colorText}</span>
            <input type="range" className={props.className}/>
        </div>
    )
}

export default RangeSlider
