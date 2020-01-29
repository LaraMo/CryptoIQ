import React, {useState} from 'react';
const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <footer className="moving-footer"> 
            <span>© All rights reserved to Quan Nguyen (Dev), Nicholas Apanian (Dev) and Liora Mezirovsky (Dev)</span>
            <span>Jessica Chambers (Coordinator) and Shelagh Robinson (Coordinator)</span>
            <span> @{year}</span>
        </footer>
    )
}

export default Footer;