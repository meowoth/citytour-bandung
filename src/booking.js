/**
 * Booking module – form validation, WhatsApp message building, and date helpers.
 */

const WA_NUMBER = '6282214454752';

function validateBookingForm({ nama, wa, tanggal, layanan, tujuan, mobil }) {
  const missing = [];
  if (!nama)    missing.push('Nama');
  if (!wa)      missing.push('WhatsApp');
  if (!tanggal) missing.push('Tanggal');
  if (!layanan) missing.push('Layanan');
  if (!tujuan)  missing.push('Tujuan');
  if (!mobil)   missing.push('Pilihan Mobil');
  return { valid: missing.length === 0, missing };
}

function formatBookingDate(tanggal, jam) {
  if (!tanggal) return '';
  return jam ? `${tanggal} pukul ${jam}` : tanggal;
}

function buildWhatsAppMessage({ nama, wa, tanggal, layanan, tujuan, mobil, pax, jam, catatan }) {
  const lines = [
    '\u{1F697} *PEMESANAN BANDUNG PRIVATE TOUR & TRAVEL*',
    '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
    `\u{1F464} *Nama:* ${nama}`,
    `\u{1F4F1} *WhatsApp:* ${wa}`,
    `\u{1F4C5} *Tanggal:* ${formatBookingDate(tanggal, jam)}`,
    `\u{1F3AF} *Layanan:* ${layanan}`,
    `\u{1F4CD} *Tujuan:* ${tujuan}`,
    `\u{1F699} *Mobil:* ${mobil}`,
    pax ? `\u{1F465} *Penumpang:* ${pax} orang` : '',
    catatan ? `\u{1F4DD} *Catatan:* ${catatan}` : '',
    '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
    'Mohon dikonfirmasi ketersediaan dan harganya. Terima kasih! \u{1F64F}'
  ].filter(Boolean).join('\n');
  return lines;
}

function buildWhatsAppURL(formData) {
  const msg = buildWhatsAppMessage(formData);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WA_NUMBER,
    validateBookingForm,
    formatBookingDate,
    buildWhatsAppMessage,
    buildWhatsAppURL,
    getTodayDateString,
  };
}
