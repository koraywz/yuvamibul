/**
 * User Modeli:
 * Kullanıcı bilgilerini tutmak için oluşturulmuş veri şemasıdır.
 * - Zorunlu alanlar: firstName, lastName, birthDate, email, password, role
 * - Email alanı benzersiz (unique) olmalı.
 * - isAdmin ve role ile kullanıcı rolleri ayarlanabilir.
 * - createdAt alanı otomatik olarak oluşturulma tarihini kaydeder.
 */


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Aynı email adresi iki kullanıcıda olamaz.
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default : 'user',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema); // Kullanıcı modelini oluşturuyoruz ve export ediyoruz.