import React, {useState} from 'react';
const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <footer>Created by Quan, Nick and Lara @ {year}</footer>
    )
}

export default Footer;