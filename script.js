// DOM Elementleri
document.addEventListener('DOMContentLoaded', function() {
    // Profil Elementleri
    const profileName = document.querySelector('.profile-name');
    const profileTitle = document.querySelector('.profile-title');
    const profileBio = document.querySelector('.profile-bio');
    const socialLinks = document.querySelectorAll('.social-link');
    const statValues = document.querySelectorAll('.stat-value');
    const profileImage = document.getElementById('profileImage');
    
    // Butonlar
    const likeButton = document.querySelector('.like-button');
    const followButton = document.querySelector('.follow-button');
    const shareBtn = document.querySelector('.action-button.share-button');
    
    // Modallar
    const shareModal = document.getElementById('shareModal');
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Paylaşım Elementleri
    const profileLink = document.getElementById('profileLink');
    const copyBtn = document.querySelector('.copy-button');
    const twitterBtn = document.querySelector('.share-button.twitter');
    const whatsappBtn = document.querySelector('.share-button.whatsapp');
    const telegramBtn = document.querySelector('.share-button.telegram');
    
    // Varsayılan veriler
    const defaultData = {
        name: 'Kullanıcı Adı',
        title: 'Yazılım Geliştirici',
        bio: 'Merhaba! Ben bir yazılım geliştiricisiyim.',
        social: {
            tiktok: '#',
            youtube: '#',
            instagram: '#',
            discord: '#',
            kick: '#'
        },
        stats: {
            views: 0,
            likes: 0,
            follows: 0
        },
        theme: 'default',
        profileImage: 'default-avatar.png',
        hasLiked: false,
        hasFollowed: false
    };
    
    // LocalStorage'dan veri yükleme veya varsayılan değerleri kullanma
    let userData = JSON.parse(localStorage.getItem('userData')) || defaultData;
    
    // UI Güncelleme
    function updateUI() {
        profileName.textContent = userData.name;
        profileTitle.textContent = userData.title;
        profileBio.textContent = userData.bio;
        profileImage.src = userData.profileImage;
        
        socialLinks[0].href = userData.social.tiktok;
        socialLinks[1].href = userData.social.youtube;
        socialLinks[2].href = userData.social.instagram;
        socialLinks[3].href = userData.social.discord;
        socialLinks[4].href = userData.social.kick;
        
        statValues[0].textContent = userData.stats.views;
        statValues[1].textContent = userData.stats.likes;
        statValues[2].textContent = userData.stats.follows;
        
        if (userData.hasLiked) {
            likeButton.classList.add('liked');
        }
        if (userData.hasFollowed) {
            followButton.classList.add('following');
        }
        
        // Temayı uygula
        document.documentElement.setAttribute('data-theme', userData.theme);
        
        // Yıldızları göster/gizle
        const stars = document.querySelectorAll('.star');
        if (userData.theme === 'galaksi') {
            stars.forEach(star => star.style.display = 'block');
        } else {
            stars.forEach(star => star.style.display = 'none');
        }
    }
    
    // Beğeni ve Takip İşlemleri
    likeButton.addEventListener('click', function() {
        if (!userData.hasLiked) {
            userData.stats.likes++;
            userData.hasLiked = true;
            likeButton.classList.add('liked');
            localStorage.setItem('userData', JSON.stringify(userData));
            updateUI();
        }
    });
    
    followButton.addEventListener('click', function() {
        if (!userData.hasFollowed) {
            userData.stats.follows++;
            userData.hasFollowed = true;
            followButton.classList.add('following');
            localStorage.setItem('userData', JSON.stringify(userData));
            updateUI();
        }
    });
    
    // Paylaşım İşlemleri
    function shareOnTwitter() {
        const text = encodeURIComponent('Profilimi kontrol et!');
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
    
    function shareOnWhatsApp() {
        const text = encodeURIComponent('Profilimi kontrol et!');
        const url = encodeURIComponent(window.location.href);
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    }
    
    function shareOnTelegram() {
        const text = encodeURIComponent('Profilimi kontrol et!');
        const url = encodeURIComponent(window.location.href);
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    }
    
    function copyToClipboard() {
        profileLink.value = window.location.href;
        profileLink.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Kopyalandı!';
        setTimeout(() => {
            copyBtn.textContent = 'Kopyala';
        }, 2000);
    }
    
    // Modal İşlemleri
    function openModal(modal) {
        modal.style.display = 'flex';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
    }
    
    // Event Listeners
    shareBtn.addEventListener('click', () => openModal(shareModal));
    twitterBtn.addEventListener('click', shareOnTwitter);
    whatsappBtn.addEventListener('click', shareOnWhatsApp);
    telegramBtn.addEventListener('click', shareOnTelegram);
    copyBtn.addEventListener('click', copyToClipboard);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Görüntülenme Sayısı
    userData.stats.views++;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Sayfa Yüklendiğinde
    updateUI();
}); 