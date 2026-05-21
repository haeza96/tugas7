// =============================================
// script.js - NusantaraHijau Portal SDA
// =============================================

// --- Tanggal otomatis di header ---
const hariList = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const bulanList = ['Januari','Februari','Maret','April','Mei','Juni',
                   'Juli','Agustus','September','Oktober','November','Desember'];

const now   = new Date();
const hari  = hariList[now.getDay()];
const tgl   = now.getDate();
const bulan = bulanList[now.getMonth()];
const tahun = now.getFullYear();

document.getElementById('tanggal').textContent =
  `📅 ${hari}, ${tgl} ${bulan} ${tahun}`;

// --- Aktifkan nav link sesuai hash ---
function updateActiveNav() {
  const hash = window.location.hash || '#';
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}
window.addEventListener('hashchange', updateActiveNav);
updateActiveNav();

// --- Toast notifikasi newsletter ---
function showToast(pesan) {
  const toast = document.getElementById('toast');
  toast.textContent = pesan;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.getElementById('btnNewsletter').addEventListener('click', function () {
  const input = document.getElementById('emailNewsletter');
  const email = input.value.trim();

  if (!email) {
    showToast('⚠️ Masukkan email terlebih dahulu.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️ Format email tidak valid.');
    return;
  }

  showToast('✅ Berhasil! ' + email + ' sudah terdaftar.');
  input.value = '';
});

// --- Smooth scroll untuk nav anchor ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Highlight section aktif saat scroll ---
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = '#' + sec.id;
    }
  });
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === current);
  });
});
