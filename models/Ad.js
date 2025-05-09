/**
 * Ad Modeli:
 * Hayvan sahiplendirme ilanları için veri yapısı tanımıdır.
 * - Kullanıcı referansı içerir (userId).
 * - Otomatik artan ilan_no üretir.
 * - Enum ile cinsiyet sınırlandırması yapılır.
 * - Sağlık durumu, hikaye ve iletişim bilgileri tutulur.
 * - timestamps ile oluşturulma ve güncelleme tarihleri otomatik kaydedilir.
 */

import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({

    ilan_no: {
        type: Number,
        unique: true //aynı ilan_no iki kez kaydedilemez.
    },

    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //userId alanı User şemasından referans alır.
        required: true
    },

    cins: {
        type: String,
        required: true
    },

    yas: {
        type: Number,
        required: true
    },

    
    cinsiyet: {
        type: String,
        enum: ['Erkek', 'Dişi'],// enum -->sabit değer listesi demek
        required: true
    },

    saglik_durumu: {
        type: String,
        required: true
    },

    karakter_ozellikleri: {
        type: String,
        required: true
    },

    bulundugu_yer: {
        type: String,
        required: true
    },

    iletisim_no: {
        type: String,
        required: true
    },

    hikaye: {
        type: String,
        required: true
    },

    resim_url: {
        type: String,
        required: true
    },

    olusturan: {
        type: String,
        required: true
    },

    olusturanAd: {
        type: String,
        required: true
    },

    // Belge oluşturulurken varsayılan olarak şu anki tarihi kaydeder.
    olusturma_tarihi: {
        type: Date,
        default: Date.now
    }
}, {
    // timestamps: true -> createdAt ve updatedAt alanları otomatik eklenir ve güncellenir.
    timestamps: true
});

// İlan kaydedilmeden önce en büyük ilan_no'yu bulup bir artırır. Böylece ilan_no otomatik artar.
adSchema.pre('save', async function(next) { //Kayıt veritabanına gitmeden önce çalışan bir fonksiyondur. Burada ilan_no'yu otomatik artırmak için kullanıldı.
    if (this.isNew) {
        try {
            // this.constructor => model üzerinde sorgu yapmak için kullanılır.
            const lastAd = await this.constructor.findOne({}, {}, { sort: { 'ilan_no': -1 } });
            this.ilan_no = lastAd ? lastAd.ilan_no + 1 : 1;  //:1 demek hiç ilan yoksa 1 numaralı ilan oluştur demektir. lastAd ? bulunduysa demek.
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Model tanımlanıyor ve export ediliyor.
const Ad = mongoose.model('Ad', adSchema);
export default Ad;
