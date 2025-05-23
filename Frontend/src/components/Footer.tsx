import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white px-4 py-8 md:px-16 lg:px-32">
            <div className="flex flex-wrap justify-between gap-8">
                <div>
                    <h4 className="font-bold text-lg">Raksha</h4>
                    <p>Helping you stay safe during natural disasters.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg">Quick Links</h4>
                    <ul>
                        <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
                        <li><a href="/about" className="text-gray-400 hover:text-white transition">About</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg">Contact Us</h4>
                    <p>Disaster mangement commmunity, India </p>
                    <p>Email: contactraksha@gmail.com</p>
                </div>
            </div>
            <div className="text-center mt-8">
                <p>&copy; 2024 Raksha. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
