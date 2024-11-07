import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ||'mongodb+srv://adithyanshajilal:971919@raksha.j9b3m.mongodb.net/?retryWrites=true&w=majority&appName=Raksha';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
    });
