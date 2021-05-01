import React, {ChangeEvent} from 'react'
import './range-slider.scss'

interface IRangeSliderProps {
    className: string,
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>, colorCode: string) => void,
    colorText: string
}

function RangeSlider(props: IRangeSliderProps) {
    return (
        <div className={'range-slider'}>
            <span className={'range-slider-text'}>{props.colorText[0]}</span>
            <input
                type="range"
                className={props.className}
                min={0}
                max={255}
                onChange={(e) => props.onChangeHandler(e, props.colorText)}
            />
        </div>
    )
}

export default RangeSlider
