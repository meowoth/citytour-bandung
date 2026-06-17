// Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Set min date for date input
const dateInput = document.getElementById('f-tanggal');
if (dateInput) { const today = new Date().toISOString().split('T')[0]; dateInput.min = today; }

// WA Booking
function pesanViaWA() {
  const nama = document.getElementById('f-nama').value.trim();
  const wa = document.getElementById('f-wa').value.trim();
  const tanggal = document.getElementById('f-tanggal').value;
  const layanan = document.getElementById('f-layanan').value;
  const tujuan = document.getElementById('f-tujuan').value.trim();
  const mobil = document.getElementById('f-mobil').value;
  const pax = document.getElementById('f-pax').value;
  const jam = document.getElementById('f-jam').value;
  const catatan = document.getElementById('f-catatan').value.trim();

  if (!nama || !wa || !tanggal || !layanan || !tujuan || !mobil) {
    alert('Mohon lengkapi semua field yang diperlukan (Nama, WhatsApp, Tanggal, Layanan, Tujuan, dan Pilihan Mobil).');
    return;
  }

  const msg = [
    '🚗 *PEMESANAN BANDUNG PRIVATE TOUR & TRAVEL*',
    '─────────────────────────',
    `👤 *Nama:* ${nama}`,
    `📱 *WhatsApp:* ${wa}`,
    `📅 *Tanggal:* ${tanggal}${jam ? ` pukul ${jam}` : ''}`,
    `🎯 *Layanan:* ${layanan}`,
    `📍 *Tujuan:* ${tujuan}`,
    `🚙 *Mobil:* ${mobil}`,
    pax ? `👥 *Penumpang:* ${pax} orang` : '',
    catatan ? `📝 *Catatan:* ${catatan}` : '',
    '─────────────────────────',
    'Mohon dikonfirmasi ketersediaan dan harganya. Terima kasih! 🙏'
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/6282214454752?text=${encodeURIComponent(msg)}`, '_blank');
}
