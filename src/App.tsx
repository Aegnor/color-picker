import React from 'react'
import './App.scss'

function App() {
    return (
        <div className={'color-picker'}>
            <p className={'color-showcase'}>#ff33cc</p>
            <button aria-label={'Generate Color'} className="color-box color-block center-by-flex dropdown-triangle">
                <span className={'hex-bg'} style={{backgroundColor: '#ff33cc'}}/>
            </button>
            <div role={'list'} style={{display: 'none'}} className={'dropdown dropdown-large'}>
                <div className={'range-slider '}>
                    <span className={'range-slider-text'}>R</span>
                    <input type="range" className={'range-slider-red'}/>
                </div>
                <div className={'range-slider'}>
                    <span className={'range-slider-text'}>G</span>
                    <input type="range" className={'range-slider-green'}/>
                </div>
                <div className={'range-slider'}>
                    <span className={'range-slider-text'}>B</span>
                    <input type="range" className={'range-slider-blue'}/>
                </div>
                <div className={'dropdown-buttons'}>
                    <button className={'button button-second dropdown-buttons-first'}>cancel</button>
                    <button className={'button button-primary'}>ok</button>
                </div>
            </div>

            <button aria-label={'Choose Color'} className={'color-history color-block center-by-flex dropdown-triangle'}>
                <span className={'arrow-down'}/>
            </button>
            {/* Add aria labeledby attr */}
            <ul className={'dropdown dropdown-list'}>
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
        </div>
    )
}

export default App
