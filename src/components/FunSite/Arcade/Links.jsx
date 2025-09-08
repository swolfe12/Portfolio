import React, { useState, useEffect } from 'react';
import Navbar from './NavBar.tsx';
import screensaver from '../../../assets/screensaver.jpg';

export const Links = () => {
    return (
        <div className='links' style={{ backgroundImage: `url(${screensaver})` }}>
            <Navbar/>
            <div className="grid">
                <div className="list">
                    <ul>
                        <li>Github</li>
                        <li>LinkedIn</li>
                        <li>WCC</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Links;