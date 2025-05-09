import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    }
}, {
    timestamps: true
});

// Ensure a user can't favorite the same ad twice
favoriteSchema.index({ userId: 1, adId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema); 