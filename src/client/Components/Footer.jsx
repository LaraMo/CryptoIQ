import React, {useState} from 'react';
const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <footer class="moving-footer"> 
            <span>© All rights reserved to Quan Nguyen (Dev 💻), Nicholas Apanian (Dev 💻), Liora Mezirovsky (Dev 💻)</span>
            <span>Jessica Chambres (Coordinator 👩‍🏫) and Shelagh Robinson (Coordinator 👩‍🏫)</span>
            <spna> @{year}</spna>
        </footer>
    )
}

export default Footer;