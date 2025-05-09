import express from 'express'; // Web uygulamaları geliştirmek için kullanılan Express framework'ü
import { fileURLToPath } from 'url'; // Dosya URL'leriyle çalışmak için yardımcı bir modül
import { dirname, join } from 'path'; // Dosya ve dizin yollarıyla çalışmak için yardımcı modüller
import mongoose from 'mongoose'; // MongoDB ile çalışmak için kullanılan bir modelleme aracı
import bcrypt from 'bcryptjs'; // Şifreleri hashlemek için kullanılan bir kütüphane
import jwt from 'jsonwebtoken'; // JSON Web Token (JWT) oluşturmak ve doğrulamak için kullanılan bir kütüphane
import { body, validationResult } from 'express-validator'; // Giriş doğrulama ve temizleme işlemleri için kullanılan bir middleware
import User from './models/User.js'; // Kullanıcı modeli (MongoDB için)
import dotenv from 'dotenv'; // Çevresel değişkenleri yüklemek için kullanılan bir kütüphane
import Ad from './models/Ad.js'; // İlan modeli (MongoDB için)
import Blog from './models/Blog.js'; // Blog modeli (MongoDB için)
import swaggerUi from 'swagger-ui-express'; // Swagger API dökümantasyonunu sunmak için kullanılan middleware
import specs from './docs/swagger.js'; // Swagger yapılandırma dosyası
import Favorite from './models/Favorite.js'; // Favori modeli (MongoDB için)

dotenv.config(); // .env dosyasındaki çevresel değişkenleri yükler

const __filename = fileURLToPath(import.meta.url); // Geçerli dosyanın tam yolunu alır
const __dirname = dirname(__filename); // Geçerli dizinin yolunu alır

const app = express(); // Yeni bir Express uygulaması başlatır
const PORT = process.env.PORT || 4000; // Port numarasını çevresel değişkenlerden alır, yoksa 4000 kullanılır

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); 
// API dökümantasyonunu "/api-docs" yolunda sunar

// Middleware    
app.use(express.json()); 
// Gelen JSON formatındaki istekleri ayrıştırır ve req.body'de kullanılabilir hale getirir

app.use(express.urlencoded({ extended: true })); 
// URL-encoded form verilerini ayrıştırır ve req.body'de kullanılabilir hale getirir

app.use(express.static('public')); 
// "public" klasöründeki statik dosyaları (CSS, JS, resimler vb.) sunar

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI) 
// MongoDB'ye bağlanır, URI çevresel değişkenlerden alınır
.then(() => console.log('MongoDB bağlantısı başarılı')) 
// Bağlantı başarılı olduğunda bir mesaj yazdırır
.catch(err => console.error('MongoDB bağlantı hatası:', err)); 
// Bağlantı hatası durumunda hata mesajını yazdırır

// Rotalar
app.get('/views/index', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'index.html')); 
  // "index.html" dosyasını istemciye gönderir
});

app.get('/', (req, res) => {
  res.redirect('/views/index'); 
  // Ana sayfaya yapılan istekleri "index.html" sayfasına yönlendirir
});

app.get('/views/blog', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'views', 'blog.html')); 
    // "blog.html" dosyasını istemciye gönderir
});

app.get('/views/login', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'login.html')); 
  // "login.html" dosyasını istemciye gönderir
});

app.get('/views/register', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'register.html')); 
  // "register.html" dosyasını istemciye gönderir
});

app.get('/views/pets', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'pets.html')); 
  // "pets.html" dosyasını istemciye gönderir
});

app.get('/views/shelters', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'shelters.html')); 
  // "shelters.html" dosyasını istemciye gönderir
});

app.get('/views/maps', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'maps.html')); 
  // "maps.html" dosyasını istemciye gönderir
});

app.get('/views/donate', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'donate.html')); 
  // "donate.html" dosyasını istemciye gönderir
});

app.get('/views/profile', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'profile.html')); 
  // "profile.html" dosyasını istemciye gönderir
});

app.get('/views/create-ad', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'create-ad.html')); 
  // "create-ad.html" dosyasını istemciye gönderir
});

app.get('/views/edit-ad', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'edit-ad.html')); 
  // "edit-ad.html" dosyasını istemciye gönderir
});

app.get('/views/ad-detay', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'ad-detay.html')); 
  // "ad-detay.html" dosyasını istemciye gönderir
});

app.get('/views/create-blog', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'create-blog.html')); 
  // "create-blog.html" dosyasını istemciye gönderir
});

app.get('/views/edit-blog', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'edit-blog.html')); 
  // "edit-blog.html" dosyasını istemciye gönderir
});

app.get('/views/blog-detail', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'blog-detail.html')); 
  // "blog-detail.html" dosyasını istemciye gönderir
});

app.get('/views/role-management', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'role-management.html')); 
  // "role-management.html" dosyasını istemciye gönderir
});

app.get('/views/ads-dashboard', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'ads-dashboard.html')); 
  // "ads-dashboard.html" dosyasını istemciye gönderir
});

app.get('/views/favorites', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'views', 'favorites.html')); 
  // "favorites.html" dosyasını istemciye gönderir
});

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Authorization başlığını alır
    const token = authHeader && authHeader.split(' ')[1]; // Token'ı başlıktan ayıklar
    
    if (!token) {
        return res.status(401).json({ message: 'Token gerekli' }); // Token eksikse hata döner
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'gizlianahtar', (err, user) => { // Token'ı doğrular
        if (err) {
            return res.status(403).json({ message: 'Geçersiz token' }); // Token geçersizse hata döner
        }
        
        req.user = user; // Doğrulanmış kullanıcı bilgilerini req.user'a kaydeder
        next(); // Bir sonraki middleware veya route handler'a geçer
    });
};

// Get profile information
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Kullanıcıyı ID ile bulur ve şifreyi hariç tutar
        
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }
        
        res.json(user); // Kullanıcı bilgilerini döner
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Change password
app.post('/api/change-password', authenticateToken, [
    body('currentPassword').notEmpty().withMessage('Mevcut şifre gerekli'), // Mevcut şifreyi doğrular
    body('newPassword').isLength({ min: 6 }).withMessage('Yeni şifre en az 6 karakter olmalıdır') // Yeni şifreyi doğrular
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Doğrulama hatalarını döner
        }
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId); // Kullanıcıyı ID ile bulur
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password); // Mevcut şifreyi karşılaştırır
        if (!isMatch) {
            return res.status(400).json({ message: 'Mevcut şifre yanlış' }); // Şifre yanlışsa hata döner
        }
        const salt = await bcrypt.genSalt(10); // Hashleme için salt oluşturur
        const hashedPassword = await bcrypt.hash(newPassword, salt); // Yeni şifreyi hashler
        
        user.password = hashedPassword; // Kullanıcının şifresini günceller
        await user.save(); // Güncellenmiş kullanıcıyı kaydeder
        
        res.json({ message: 'Şifre başarıyla değiştirildi' }); // Başarı mesajı döner
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Change email
app.post('/api/change-email', authenticateToken, [
    body('newEmail').isEmail().withMessage('Geçerli bir e-posta adresi giriniz') // Yeni e-postayı doğrular
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Doğrulama hatalarını döner
        }
        const { newEmail } = req.body;
        const user = await User.findById(req.user.userId); // Kullanıcıyı ID ile bulur
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }
        user.email = newEmail; // Kullanıcının e-postasını günceller
        await user.save(); // Güncellenmiş kullanıcıyı kaydeder
        
        res.json({ message: 'E-posta başarıyla değiştirildi' }); // Başarı mesajı döner
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Register endpoint
app.post('/api/register', [
    body('firstName').notEmpty().withMessage('Ad alanı boş bırakılamaz').trim(), // Ad alanını doğrular
    body('lastName').notEmpty().withMessage('Soyad alanı boş bırakılamaz').trim(), // Soyad alanını doğrular
    body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'), // E-posta adresini doğrular
    body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'), // Şifreyi doğrular
    body('birthDate').notEmpty().withMessage('Doğum tarihi boş bırakılamaz') // Doğum tarihini doğrular
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Doğrulama hatalarını döner
        }

        const { firstName, lastName, email, password, birthDate } = req.body;

        let user = await User.findOne({ email }); // E-posta adresinin zaten kayıtlı olup olmadığını kontrol eder
        if (user) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' }); // E-posta adresi zaten kayıtlıysa hata döner
        }

        const salt = await bcrypt.genSalt(10); // Hashleme için salt oluşturur
        const hashedPassword = await bcrypt.hash(password, salt); // Şifreyi hashler

        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthDate: new Date(birthDate)
        }); // Yeni bir kullanıcı oluşturur

        await user.save(); // Yeni kullanıcıyı kaydeder

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'gizlianahtar',
            { expiresIn: '1h' } // Token süresini belirler
        ); // JWT token oluşturur

        res.status(201).json({ token }); // Token'ı döner
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Admin middleware
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Authorization başlığından token'ı ayıklar
        if (!token) {
            return res.status(401).json({ message: 'Yetkilendirme token\'ı gerekli' }); // Token eksikse hata döner
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrular
        const user = await User.findById(decoded.userId); // Kullanıcıyı ID ile bulur
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Bu işlem için admin yetkisi gerekli' }); // Kullanıcı admin değilse hata döner
        }
        req.user = user; // Doğrulanmış kullanıcı bilgilerini req.user'a kaydeder
        next(); // Bir sonraki middleware veya route handler'a geçer
    } catch (error) {
        res.status(401).json({ message: 'Geçersiz token' }); // Token geçersizse hata döner
    }
};

// Ad middleware
const checkAdPermissions = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Authorization başlığından token'ı ayıklar
        if (token === null) {
            return res.status(401).json({ message: 'Yetkilendirme token\'ı gerekli' }); // Token eksikse hata döner
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrular
        const user = await User.findById(decoded.userId); // Kullanıcıyı ID ile bulur

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }

        if (user.isAdmin !== 0 || user.role !== 'shelter') {
            return res.status(403).json({ message: 'Gerekli yetki yok' }); // Kullanıcının gerekli yetkisi yoksa hata döner
        }

        req.user = user; // Doğrulanmış kullanıcı bilgilerini req.user'a kaydeder
        next(); // Bir sonraki middleware veya route handler'a geçer
    } catch (error) {
        console.error('Permission check error:', error);
        res.status(401).json({ message: 'Geçersiz token' }); // Token geçersizse hata döner
    }
};

// Get user's own ads
app.get('/api/ads/my-ads', authenticateToken, checkAdPermissions, async (req, res) => {
    try {
        const ads = await Ad.find({ olusturan: req.user.email }).sort({ createdAt: -1 }); // Kullanıcının oluşturduğu ilanları bulur
        res.json(ads); // İlanları döner
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Get all ads
app.get('/api/ads', async (req, res) => {
    try {
        const ads = await Ad.find().sort({ olusturma_tarihi: -1 }); // Tüm ilanları bulur ve oluşturulma tarihine göre sıralar
        res.json(ads); // İlanları döner
    } catch (error) {
        res.status(500).json({ message: error.message }); // Sunucu hatası döner
    }
});

// Get ad details by ad number
app.get('/api/ads/:ilan_no', async (req, res) => {
    try {
        const ad = await Ad.findOne({ ilan_no: req.params.ilan_no }); // İlan numarasına göre ilanı bulur
        if (!ad) {
            return res.status(404).json({ message: 'İlan bulunamadı' }); // İlan bulunamazsa hata döner
        }
        res.json(ad); // İlan detaylarını döner
    } catch (error) {
        res.status(500).json({ message: error.message }); // Sunucu hatası döner
    }
});

// Create ad
app.post('/api/ads', authenticateToken, checkAdPermissions, async (req, res) => {
    try {
        const userData = req.user; // Middleware'den kullanıcı bilgilerini alır
        
        if (!userData) {
            return res.status(404).json({ 
                message: 'Kullanıcı bulunamadı',
                error: 'Kullanıcı bilgileri alınamadı'
            }); // Kullanıcı bilgileri eksikse hata döner
        }

        const ad = new Ad({
            ...req.body,
            userId: userData._id,
            olusturan: userData.email,
            olusturanAd: `${userData.firstName} ${userData.lastName}`
        }); // Yeni bir ilan oluşturur

        const savedAd = await ad.save(); // Yeni ilanı kaydeder
        res.status(201).json(savedAd); // Kaydedilen ilanı döner
    } catch (error) {
        console.error('İlan oluşturma hatası:', error);
        res.status(400).json({ 
            message: 'İlan oluşturulurken bir hata oluştu',
            error: error.message 
        }); // İlan oluşturma hatası döner
    }
});

// Update ad
app.put('/api/ads/:ilan_no', authenticateToken, checkAdPermissions, async (req, res) => {
    try {
        const ad = await Ad.findOne({ ilan_no: req.params.ilan_no }); // İlan numarasına göre ilanı bulur
        if (!ad) {
            return res.status(404).json({ message: 'İlan bulunamadı' }); // İlan bulunamazsa hata döner
        }

        if (ad.olusturan !== req.user.email) {
            return res.status(403).json({ message: 'Bu ilanı düzenleme yetkiniz yok' }); // Kullanıcının düzenleme yetkisi yoksa hata döner
        }

        const updatedAd = await Ad.findOneAndUpdate(
            { ilan_no: req.params.ilan_no },
            {
                cins: req.body.cins,
                yas: req.body.yas,
                cinsiyet: req.body.cinsiyet,
                saglik_durumu: req.body.saglik_durumu,
                karakter_ozellikleri: req.body.karakter_ozellikleri,
                bulundugu_yer: req.body.bulundugu_yer,
                iletisim_no: req.body.iletisim_no,
                hikaye: req.body.hikaye,
                resim_url: req.body.resim_url
            },
            { new: true }
        ); // İlanı günceller

        res.json(updatedAd); // Güncellenmiş ilanı döner
    } catch (error) {
        console.error('İlan güncelleme hatası:', error);
        res.status(500).json({ message: 'İlan güncellenirken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Delete ad
app.delete('/api/ads/:ilan_no', authenticateToken, checkAdPermissions, async (req, res) => {
    try {
        const ad = await Ad.findOne({ ilan_no: req.params.ilan_no }); // İlan numarasına göre ilanı bulur
        if (!ad) {
            return res.status(404).json({ message: 'İlan bulunamadı' }); // İlan bulunamazsa hata döner
        }

        if (ad.olusturan !== req.user.email) { 
            return res.status(403).json({ message: 'Bu ilanı silme yetkiniz yok' }); // Kullanıcının silme yetkisi yoksa hata döner
        }

        await ad.deleteOne(); // İlanı siler
        res.json({ message: 'İlan başarıyla silindi' }); // Başarı mesajı döner
    } catch (error) {
        console.error('İlan silme hatası:', error);
        res.status(500).json({ message: 'İlan silinirken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Update login functionality
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // E-posta adresine göre kullanıcıyı bulur

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Geçersiz email veya şifre' }); // E-posta veya şifre geçersizse hata döner
        }

        const userData = await User.findById(user._id).select('-password'); // Şifre hariç kullanıcı verilerini alır

        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'pawfinder_gizli_anahtar_123',
            { expiresIn: '24h' } // Token süresini belirler
        ); // JWT token oluşturur

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isAdmin: user.isAdmin
            }
        }); // Token ve kullanıcı bilgilerini döner
    } catch (error) {
        console.error('Login hatası:', error);
        res.status(500).json({ message: error.message }); // Sunucu hatası döner
    }
});

// Blog middleware
const checkBlogPermissions = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Authorization başlığından token'ı ayıklar
        if (!token) {
            return res.status(401).json({ message: 'Yetkilendirme token\'ı gerekli' }); // Token eksikse hata döner
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrular
        const user = await User.findById(decoded.userId); // Kullanıcıyı ID ile bulur

        if (!user || user.isAdmin !== 1 || user.role !== 'admin') {
            return res.status(403).json({ message: 'Gerekli yetki yok' }); // Kullanıcının gerekli yetkisi yoksa hata döner
        }

        req.user = user; // Doğrulanmış kullanıcı bilgilerini req.user'a kaydeder
        next(); // Bir sonraki middleware veya route handler'a geçer
    } catch (error) {
        res.status(401).json({ message: 'Geçersiz token' }); // Token geçersizse hata döner
    }
};

// Create blog (Admin only)
app.post('/api/blogs', authenticateToken, checkBlogPermissions, async (req, res) => {
    try {
        const user = req.user; // Middleware'den kullanıcı bilgilerini alır
        
        const blog = new Blog({
            ...req.body,
            olusturan: `${user.firstName} `, 
        }); // Yeni bir blog oluşturur
        await blog.save(); // Yeni blogu kaydeder
        res.status(201).json(blog); // Kaydedilen blogu döner
    } catch (error) {
        res.status(400).json({ message: error.message }); // Blog oluşturma hatası döner
    }
});

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Tüm blogları bulur ve oluşturulma tarihine göre sıralar
        res.json(blogs); // Blogları döner
    } catch (error) {
        console.error('Blog listeleme hatası:', error);
        res.status(500).json({ message: 'Bloglar listelenirken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Get blog details by blog number
app.get('/api/blogs/:blogNo', async (req, res) => {
    try {
        const blog = await Blog.findOne({ blogNo: req.params.blogNo }); // Blog numarasına göre blogu bulur
        if (!blog) {
            return res.status(404).json({ message: 'Blog bulunamadı' }); // Blog bulunamazsa hata döner
        }
        res.json(blog); // Blog detaylarını döner
    } catch (error) {
        console.error('Blog detay hatası:', error);
        res.status(500).json({ message: 'Blog detayı alınırken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Update blog (Admin only)
app.put('/api/blogs/:blogNo', authenticateToken, checkBlogPermissions, async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { blogNo: req.params.blogNo },
            req.body,
            { new: true }
        ); // Blogu günceller
        if (!blog) {
            return res.status(404).json({ message: 'Blog yazısı bulunamadı' }); // Blog bulunamazsa hata döner
        }
        res.json(blog); // Güncellenmiş blogu döner
    } catch (error) {
        res.status(400).json({ message: error.message }); // Blog güncelleme hatası döner
    }
});

// Delete blog (Admin only)
app.delete('/api/blogs/:blogNo', authenticateToken, checkBlogPermissions, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ blogNo: req.params.blogNo }); // Blogu siler
        if (!blog) {
            return res.status(404).json({ message: 'Blog yazısı bulunamadı' }); // Blog bulunamazsa hata döner
        }
        res.json({ message: 'Blog yazısı başarıyla silindi' }); // Başarı mesajı döner
    } catch (error) {
        res.status(400).json({ message: error.message }); // Blog silme hatası döner
    }
});

// Update user
app.put('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, email, birthDate } = req.body;
        
        if (req.user.userId !== req.params.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' }); // Kullanıcının yetkisi yoksa hata döner
        }

        const user = await User.findById(req.params.id); // Kullanıcıyı ID ile bulur
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email }); // E-posta adresinin zaten kayıtlı olup olmadığını kontrol eder
            if (existingUser) {
                return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' }); // E-posta adresi zaten kayıtlıysa hata döner
            }
        }

        user.firstName = firstName || user.firstName; // Kullanıcının adını günceller
        user.lastName = lastName || user.lastName; // Kullanıcının soyadını günceller
        user.email = email || user.email; // Kullanıcının e-posta adresini günceller
        user.birthDate = birthDate ? new Date(birthDate) : user.birthDate; // Kullanıcının doğum tarihini günceller

        await user.save(); // Güncellenmiş kullanıcıyı kaydeder
        res.json({ message: 'Kullanıcı başarıyla güncellendi', user }); // Başarı mesajı ve güncellenmiş kullanıcıyı döner
    } catch (error) {
        console.error('Kullanıcı güncelleme hatası:', error);
        res.status(500).json({ message: 'Kullanıcı güncellenirken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Delete user
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.userId !== req.params.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' }); // Kullanıcının yetkisi yoksa hata döner
        }

        const user = await User.findById(req.params.id); // Kullanıcıyı ID ile bulur
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }

        await user.deleteOne(); // Kullanıcıyı siler
        res.json({ message: 'Kullanıcı başarıyla silindi' }); // Başarı mesajı döner
    } catch (error) {
        console.error('Kullanıcı silme hatası:', error);
        res.status(500).json({ message: 'Kullanıcı silinirken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Get all users (Admin only)
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const adminUser = await User.findById(req.user.userId); // Admin kullanıcıyı ID ile bulur
        if (!adminUser.isAdmin) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' }); // Kullanıcı admin değilse hata döner
        }

        const users = await User.find().select('-password'); // Tüm kullanıcıları bulur ve şifreleri hariç tutar
        res.json(users); // Kullanıcıları döner
    } catch (error) {
        console.error('Kullanıcıları getirme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Authorize user endpoint
app.put('/api/users/:userId/authorize', authenticateToken, async (req, res) => {
    try {
        const adminUser = await User.findById(req.user.userId); // Admin kullanıcıyı ID ile bulur
        if (!adminUser.isAdmin) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' }); // Kullanıcı admin değilse hata döner
        }

        const { userId } = req.params;
        const { role } = req.body;

        const user = await User.findById(userId); // Kullanıcıyı ID ile bulur
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); // Kullanıcı bulunamazsa hata döner
        }

        if (user.isAdmin) {
            return res.status(403).json({ message: 'Admin kullanıcıların rolü değiştirilemez' }); // Admin kullanıcıların rolü değiştirilemezse hata döner
        }

        user.role = role; // Kullanıcının rolünü günceller
        await user.save(); // Güncellenmiş kullanıcıyı kaydeder

        res.json({ message: 'Kullanıcı rolü başarıyla güncellendi' }); // Başarı mesajı döner
    } catch (error) {
        console.error('Yetkilendirme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' }); // Sunucu hatası döner
    }
});

// Add favorite
app.post('/api/favorites/:adId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId); // Kullanıcıyı ID ile bulur

        if (!user || user.isAdmin !== 0 || user.role !== 'user') {
            return res.status(403).json({ message: 'Bu işlem için user olmalısınız' }); // Kullanıcının gerekli yetkisi yoksa hata döner
        }

        const ad = await Ad.findById(req.params.adId); // İlanı ID ile bulur
        if (!ad) {
            return res.status(404).json({ message: 'İlan bulunamadı' }); // İlan bulunamazsa hata döner
        }

        const favoriteExists = await Favorite.findOne({ userId, adId: req.params.adId }); // İlanın zaten favorilerde olup olmadığını kontrol eder
        if (favoriteExists) {
            return res.status(400).json({ message: 'Bu ilan zaten favorilerinizde' }); // İlan zaten favorilerdeyse hata döner
        }

        const favorite = new Favorite({ userId, adId: req.params.adId }); // Yeni bir favori oluşturur
        await favorite.save(); // Yeni favoriyi kaydeder

        res.status(201).json({ message: 'İlan favorilere eklendi' }); // Başarı mesajı döner
    } catch (error) {
        console.error('Favori ekleme hatası:', error);
        res.status(500).json({ message: 'Favori eklenirken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Remove favorite
app.delete('/api/favorites/:adId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId); // Kullanıcıyı ID ile bulur

        if (!user || user.isAdmin !== 0 || user.role !== 'user') {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' }); // Kullanıcının gerekli yetkisi yoksa hata döner
        }

        const favorite = await Favorite.findOneAndDelete({ userId, adId: req.params.adId }); // Favoriyi siler
        if (!favorite) {
            return res.status(404).json({ message: 'Favori bulunamadı' }); // Favori bulunamazsa hata döner
        }

        res.json({ message: 'İlan favorilerden kaldırıldı' }); // Başarı mesajı döner
    } catch (error) {
        console.error('Favori kaldırma hatası:', error);
        res.status(500).json({ message: 'Favori kaldırılırken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Get user's favorites
app.get('/api/favorites', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId); // Kullanıcıyı ID ile bulur

        if (!user || user.isAdmin !== 0 || user.role !== 'user') {
            return res.status(403).json({ message: 'Bu işlem için user olmalısınız' }); // Kullanıcının gerekli yetkisi yoksa hata döner
        }

        const favorites = await Favorite.find({ userId })
            .populate('adId')
            .sort({ createdAt: -1 }); // Kullanıcının favorilerini bulur ve oluşturulma tarihine göre sıralar

        res.json(favorites.map(fav => fav.adId)); // Favorileri döner
    } catch (error) {
        console.error('Favoriler alınırken hata:', error);
        res.status(500).json({ message: 'Favoriler alınırken bir hata oluştu' }); // Sunucu hatası döner
    }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Sunucu URL'sini loglar
  console.log(`API Dökümanı http://localhost:${PORT}/api-docs`); // API dökümantasyon URL'sini loglar
});