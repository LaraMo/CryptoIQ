import React, {useState} from 'react';
import {dawson} from '../assets/dawson.png'
const Footer = () => {
    const [year] = useState(new Date().getFullYear());
    return (
        <footer className="moving-footer"> 
            <div>
             <p>For any questions please contact: test@gmail.com</p>
             <p>Developers: Quan Nguyen, Nicholas Apanian & Liora Mezirovsky</p>
             <p>Creators: Jessica Chambers & Shelagh Robinson</p>
            </div>
             <img src ={dawson} id="dawson"></img>
            <span> ©️ All rights reserved, {year}</span>
        </footer>
    )
}

export default Footer;
