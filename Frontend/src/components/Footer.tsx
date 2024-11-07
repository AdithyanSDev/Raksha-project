import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-8">
            <div className="flex justify-between">
                <div>
                    <h4 className="font-bold text-lg">Raksha</h4>
                    <p>Helping you stay safe during natural disasters.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg">Quick Links</h4>
                    <ul>
                        <li><a href="/" className="text-gray-400">Home</a></li>
                        <li><a href="/about" className="text-gray-400">About</a></li>
                        <li><a href="/contact" className="text-gray-400">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg">Contact Us</h4>
                    <p>123 Disaster Ave, Safety City</p>
                    <p>Email: contact@raksha.com</p>
                </div>
            </div>
            <div className="text-center mt-8">
                <p>&copy; 2024 Raksha. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
