// DOM yüklendiğinde çalışacak bir olay dinleyicisi ekleniyor
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Kullanıcının oturum token'ını localStorage'dan al
    let user = null; // Kullanıcı bilgilerini tutmak için bir değişken tanımla

    try {
        user = JSON.parse(localStorage.getItem('user') || '{}'); // Kullanıcı bilgilerini JSON formatında al
        console.log('Kullanıcı bilgileri:', user); // Kullanıcı bilgilerini debug için konsola yazdır
        console.log('Kullanıcı rolü:', user.role); // Kullanıcı rolünü kontrol et ve yazdır
        console.log('Role shelter kontrolü:', user.role === 'shelter'); // Kullanıcının shelter olup olmadığını kontrol et
    } catch (error) {
        console.error('Kullanıcı bilgileri parse edilemedi:', error); // JSON parse hatası durumunda hata mesajı yazdır
        user = {}; // Kullanıcı bilgilerini boş bir obje olarak ayarla
    }

    const navbar = document.createElement('nav'); // Yeni bir <nav> elemanı oluştur
    navbar.className = 'navbar'; // Navbar için bir sınıf ekle

    // Kullanıcının shelter rolünde olup olmadığını kontrol et
    const isShelter = user.role === 'shelter';
    console.log('İs Shelter:', isShelter); // Debug için shelter kontrolünü yazdır

    // Navbar HTML içeriğini oluştur
    navbar.innerHTML = `
        <div class="navbar-container">
            <a href="/views/index" class="navbar-brand">
                <i class="fas fa-paw"></i> Yuvamı Bul
            </a>
            <div class="navbar-menu">
                <a href="/views/shelters" class="navbar-item">İlanlar</a>
                <a href="/views/blog" class="navbar-item">Blog</a>
                <a href="/views/donate" class="navbar-item">Bağış Yap </a>
                <a href="/views/maps" class="navbar-item">Harita</a>
                
                ${token ? ` 
                    <!-- Kullanıcı oturum açmışsa gösterilecek menü -->
                    <div class="profile-dropdown">
                        <div class="profile-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="dropdown-content">
                            <div class="user-info">
                                <p>${user.firstName ? `${user.firstName} ${user.lastName}` : 'Kullanıcı'}</p>
                            </div>
                            
                            ${isShelter ? `
                                <!-- Shelter rolündeki kullanıcılar için özel menü -->
                                <a href="/views/profile" class="dropdown-item">
                                    <i class="fas fa-user"></i> Profilim
                                </a>   
                                <a href="/views/ads-dashboard" class="dropdown-item">
                                    <i class="fas fa-list"></i> İlanlarım
                                </a>
                            ` : `
                                <!-- Diğer kullanıcılar için profil menüsü -->
                                <a href="/views/profile" class="dropdown-item">
                                    <i class="fas fa-user"></i> Profilim
                                </a>
                            `}
                            ${user.isAdmin === 0 && user.role === 'user' ? `
                                <!-- Normal kullanıcılar için favori ilanlar menüsü -->
                                <a href="/views/favorites" class="dropdown-item">
                                    <i class="fas fa-heart"></i> Favori İlanlarım
                                </a>
                            ` : ''}
                            
                            ${user.isAdmin === 1 ? `
                                <!-- Admin kullanıcılar için yetkilendirme menüsü -->
                                <a href="/views/role-management" class="dropdown-item">
                                    <i class="fas fa-user-shield"></i> Yetkilendirme
                                </a>
                            ` : ''}
                            
                            <a href="#" class="dropdown-item" id="logoutBtn">
                                <i class="fas fa-sign-out-alt"></i> Çıkış Yap
                            </a>
                        </div>
                    </div>
                ` : `
                    <!-- Kullanıcı oturum açmamışsa gösterilecek menü -->
                    <a href="/views/login" class="navbar-item">Giriş Yap</a>
                    <a href="/views/register" class="navbar-item">Kayıt Ol</a>
                `}
            </div>
        </div>
    `;

    document.body.insertBefore(navbar, document.body.firstChild); // Navbar'ı body'nin en üstüne ekle

    // Çıkış yapma işlemi
    const logoutBtn = document.getElementById('logoutBtn'); // Çıkış yap butonunu seç
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Varsayılan davranışı engelle
            localStorage.removeItem('token'); // Token'ı localStorage'dan kaldır
            localStorage.removeItem('user'); // Kullanıcı bilgilerini localStorage'dan kaldır
            window.location.href = '/views/login'; // Kullanıcıyı giriş sayfasına yönlendir
        });
    }
});

// Navbar'ı güncellemek için bir fonksiyon
function updateNavbar() {
    const token = localStorage.getItem('token'); // Kullanıcının oturum token'ını al
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Kullanıcı bilgilerini JSON formatında al
    const navbar = document.querySelector('.navbar'); // Navbar elemanını seç

    if (token) {
        // Kullanıcı oturum açmışsa gösterilecek navbar içeriği
        navbar.innerHTML = `
            <div class="navbar-brand">
                <a href="/views/index" class="navbar-logo">
                    <img src="../images/logo.png" alt="PawFinder Logo">
                    <span>PawFinder</span>
                </a>
            </div>
            <div class="navbar-menu">
                <a href="/views/index" class="navbar-item">Ana Sayfa</a>
                <a href="/views/shelters" class="navbar-item">İlanlar</a>
                ${user.isAdmin === 0 && user.role === 'user' ? `
                    <a href="/views/favorites" class="navbar-item">
                        <i class="fas fa-heart"></i> Favorilerim
                    </a>
                ` : ''}
                ${user.isAdmin === 1 ? `
                    <a href="/views/ads-dashboard" class="navbar-item">İlan Yönetimi</a>
                ` : ''}
                <div class="navbar-item has-dropdown">
                    <a class="navbar-link">
                        <i class="fas fa-user"></i> ${user.ad || 'Kullanıcı'}
                    </a>
                    <div class="navbar-dropdown">
                        <a href="/views/profile" class="navbar-dropdown-item">Profil</a>
                        <a href="#" onclick="logout()" class="navbar-dropdown-item">Çıkış Yap</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Kullanıcı oturum açmamışsa gösterilecek navbar içeriği
        navbar.innerHTML = `
            <div class="navbar-brand">
                <a href="/views/index" class="navbar-logo">
                    <img src="../images/logo.png" alt="PawFinder Logo">
                    <span>PawFinder</span>
                </a>
            </div>
            <div class="navbar-menu">
                <a href="/views/index" class="navbar-item">Ana Sayfa</a>
                <a href="/views/shelters" class="navbar-item">İlanlar</a>
                <a href="/views/login" class="navbar-item">Giriş Yap</a>
                <a href="/views/register" class="navbar-item">Kayıt Ol</a>
            </div>
        `;
    }
}