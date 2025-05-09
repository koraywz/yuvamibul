/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - birthDate
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *         birthDate:
 *           type: string
 *           format: date
 *         
 * 
 *     Ad:
 *       type: object
 *       required:
 *         - cins
 *         - yas
 *         - cinsiyet
 *         - saglik_durumu
 *         - karakter_ozellikleri
 *         - bulundugu_yer
 *         - iletisim_no
 *         - hikaye
 *         - resim_url
 *       properties:
 *         cins:
 *           type: string
 *         yas:
 *           type: number
 *         cinsiyet:
 *           type: string
 *           enum: [Erkek, Dişi]
 *         saglik_durumu:
 *           type: string
 *         karakter_ozellikleri:
 *           type: string
 *         bulundugu_yer:
 *           type: string
 *         iletisim_no:
 *           type: string
 *         hikaye:
 *           type: string
 *         resim_url:
 *           type: string
 * 
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - content
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         imageUrl:
 *           type: string
 *           description: Blog yazısını oluşturan kullanıcının adı ve soyadı
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Kimlik doğrulama işlemleri
 *   - name: Admin
 *     description: Admin işlemleri
 *   - name: Kullanıcı
 *     description: Kullanıcı işlemleri
 *   - name: İlanlar
 *     description: İlan işlemleri
 *   - name: Blog
 *     description: Blog işlemleri
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz giriş
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *       401:
 *         description: Geçersiz email veya şifre
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Kullanıcı profil bilgilerini getir
 *     tags: [Kullanıcı]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı profil bilgileri başarıyla alındı
 *       401:
 *         description: Token gerekli
 *       404:
 *         description: Kullanıcı bulunamadı
 */

/**
 * @swagger
 * /api/change-password:
 *   post:
 *     summary: Kullanıcı şifresini değiştir
 *     tags: [Kullanıcı]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Şifre başarıyla değiştirildi
 *       401:
 *         description: Token gerekli
 *       400:
 *         description: Mevcut şifre yanlış
 *       404:
 *         description: Kullanıcı bulunamadı
 */

/**
 * @swagger
 * /api/change-email:
 *   post:
 *     summary: Kullanıcı e-posta adresini değiştir
 *     tags: [Kullanıcı]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentEmail
 *               - newEmail
 *             properties:
 *               currentEmail:  
 *                 type: string
 *                 format: email
 *               newEmail:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: E-posta başarıyla değiştirildi
 *       401:
 *         description: Token gerekli
 *       400:
 *         description: Bu email adresi zaten kullanılıyor
 *       404:
 *         description: Kullanıcı bulunamadı
 */
/**
 * @swagger
 * /api/favorites/{adId}:
 *   post:
 *     summary: Favori ekle
 *     description: Kullanıcı bir ilanı favorilerine ekler.
 *     tags: [Kullanıcı]
 *     parameters:
 *       - in: path
 *         name: adId
 *         required: true
 *         description: Favorilere eklenecek ilanın ID'si.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: İlan favorilere eklendi.
 *       400:
 *         description: Bu ilan zaten favorilerde.
 *       403:
 *         description: Yetki hatası.
 *       404:
 *         description: İlan bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */
/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Kullanıcının favorilerini getir
 *     description: Kullanıcının favori ilanlarını döndürür.
 *     tags:
 *       - Kullanıcı
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favori ilanlar başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 *       403:
 *         description: Yetki hatası.
 *       500:
 *         description: Sunucu hatası.
 */
/**
 * @swagger
 * /api/ads:
 *   post:
 *     summary: Yeni ilan oluştur
 *     tags: [İlanlar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ad'
 *     responses:
 *       201:
 *         description: İlan başarıyla oluşturuldu
 *       401:
 *         description: Token gerekli
 *       400:
 *         description: İlan oluşturulurken bir hata oluştu
 *       404:
 *         description: Kullanıcı bulunamadı
 */

/**
 * @swagger
 * /api/ads:
 *   get:
 *     summary: Tüm ilanları listele
 *     tags: [İlanlar]
 *     responses:
 *       200:
 *         description: İlanlar başarıyla listelendi
 */

/**
 * @swagger
 * /api/ads/{ilan_no}:
 *   get:
 *     summary: İlan detaylarını getir
 *     tags: [İlanlar]
 *     parameters:
 *       - in: path
 *         name: ilan_no
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: İlan detayları
 *       404:
 *         description: İlan bulunamadı
 */

/**
 * @swagger
 * /api/ads/{ilan_no}:
 *   put:
 *     summary: İlan bilgilerini güncelle
 *     tags: [İlanlar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ilan_no
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ad'
 *     responses:
 *       200:
 *         description: İlan başarıyla güncellendi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Bu ilanı düzenleme yetkiniz yok
 *       404:
 *         description: İlan bulunamadı
 */

/**
 * @swagger
 * /api/ads/{ilan_no}:
 *   delete:
 *     summary: İlanı sil
 *     tags: [İlanlar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ilan_no
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: İlan başarıyla silindi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Bu ilanı silme yetkiniz yok
 *       404:
 *         description: İlan bulunamadı
 */

/**
 * @swagger
 * /api/ads/my-ads:
 *   get:
 *     summary: Kullanıcının kendi ilanlarını getir
 *     tags: [İlanlar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: İlanlar başarıyla getirildi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Gerekli yetki yok
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Tüm kullanıcıları listele
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcılar başarıyla listelendi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Bu işlem için yetkiniz yok
 */

/**
 * @swagger
 * /api/users/{userId}/authorize:
 *   put:
 *     summary: Kullanıcı yetkilendirme
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kullanıcı rolü başarıyla güncellendi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Admin kullanıcıların rolü değiştirilemez
 *       404:
 *         description: Kullanıcı bulunamadı
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Yeni blog yazısı oluştur
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog yazısı başarıyla oluşturuldu
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Gerekli yetki yok
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Tüm blog yazılarını listele
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Blog yazıları başarıyla listelendi
 */

/**
 * @swagger
 * /api/blogs/{blogNo}:
 *   get:
 *     summary: Blog yazısı detaylarını getir
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogNo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog yazısı detayları
 *       404:
 *         description: Blog bulunamadı
 */

/**
 * @swagger
 * /api/blogs/{blogNo}:
 *   put:
 *     summary: Blog yazısını güncelle
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogNo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog yazısı başarıyla güncellendi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Gerekli yetki yok
 *       404:
 *         description: Blog yazısı bulunamadı
 */

/**
 * @swagger
 * /api/blogs/{blogNo}:
 *   delete:
 *     summary: Blog yazısını sil
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogNo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog yazısı başarıyla silindi
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Gerekli yetki yok
 *       404:
 *         description: Blog yazısı bulunamadı
 */