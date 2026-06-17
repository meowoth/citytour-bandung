const {
  WA_NUMBER,
  validateBookingForm,
  formatBookingDate,
  buildWhatsAppMessage,
  buildWhatsAppURL,
  getTodayDateString,
} = require('../src/booking');

const VALID_FORM = {
  nama: 'Budi',
  wa: '081234567890',
  tanggal: '2026-07-01',
  layanan: 'City Tour',
  tujuan: 'Tangkuban Perahu',
  mobil: 'Innova Reborn',
  pax: '4',
  jam: '08:00',
  catatan: 'Tolong jemput di hotel',
};

describe('validateBookingForm', () => {
  test('returns valid when all required fields are provided', () => {
    const result = validateBookingForm(VALID_FORM);
    expect(result.valid).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  test('returns invalid when nama is empty', () => {
    const result = validateBookingForm({ ...VALID_FORM, nama: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('Nama');
  });

  test('returns invalid when wa is empty', () => {
    const result = validateBookingForm({ ...VALID_FORM, wa: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('WhatsApp');
  });

  test('returns invalid when tanggal is missing', () => {
    const result = validateBookingForm({ ...VALID_FORM, tanggal: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('Tanggal');
  });

  test('returns invalid when layanan is missing', () => {
    const result = validateBookingForm({ ...VALID_FORM, layanan: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('Layanan');
  });

  test('returns invalid when tujuan is missing', () => {
    const result = validateBookingForm({ ...VALID_FORM, tujuan: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('Tujuan');
  });

  test('returns invalid when mobil is missing', () => {
    const result = validateBookingForm({ ...VALID_FORM, mobil: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('Pilihan Mobil');
  });

  test('lists all missing fields when form is completely empty', () => {
    const result = validateBookingForm({
      nama: '', wa: '', tanggal: '', layanan: '', tujuan: '', mobil: '',
    });
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual([
      'Nama', 'WhatsApp', 'Tanggal', 'Layanan', 'Tujuan', 'Pilihan Mobil',
    ]);
  });

  test('treats undefined fields as missing', () => {
    const result = validateBookingForm({});
    expect(result.valid).toBe(false);
    expect(result.missing).toHaveLength(6);
  });
});

describe('formatBookingDate', () => {
  test('returns date with time when jam is provided', () => {
    expect(formatBookingDate('2026-07-01', '08:00')).toBe('2026-07-01 pukul 08:00');
  });

  test('returns only date when jam is empty', () => {
    expect(formatBookingDate('2026-07-01', '')).toBe('2026-07-01');
  });

  test('returns only date when jam is undefined', () => {
    expect(formatBookingDate('2026-07-01')).toBe('2026-07-01');
  });

  test('returns empty string when tanggal is empty', () => {
    expect(formatBookingDate('', '08:00')).toBe('');
  });

  test('returns empty string when tanggal is undefined', () => {
    expect(formatBookingDate(undefined)).toBe('');
  });
});

describe('buildWhatsAppMessage', () => {
  test('includes all provided fields', () => {
    const msg = buildWhatsAppMessage(VALID_FORM);
    expect(msg).toContain('*Nama:* Budi');
    expect(msg).toContain('*WhatsApp:* 081234567890');
    expect(msg).toContain('*Tanggal:* 2026-07-01 pukul 08:00');
    expect(msg).toContain('*Layanan:* City Tour');
    expect(msg).toContain('*Tujuan:* Tangkuban Perahu');
    expect(msg).toContain('*Mobil:* Innova Reborn');
    expect(msg).toContain('*Penumpang:* 4 orang');
    expect(msg).toContain('*Catatan:* Tolong jemput di hotel');
  });

  test('omits pax line when pax is empty', () => {
    const msg = buildWhatsAppMessage({ ...VALID_FORM, pax: '' });
    expect(msg).not.toContain('Penumpang');
  });

  test('omits catatan line when catatan is empty', () => {
    const msg = buildWhatsAppMessage({ ...VALID_FORM, catatan: '' });
    expect(msg).not.toContain('Catatan');
  });

  test('includes header and footer lines', () => {
    const msg = buildWhatsAppMessage(VALID_FORM);
    expect(msg).toContain('PEMESANAN BANDUNG PRIVATE TOUR & TRAVEL');
    expect(msg).toContain('Mohon dikonfirmasi ketersediaan dan harganya');
  });

  test('date shown without time when jam is empty', () => {
    const msg = buildWhatsAppMessage({ ...VALID_FORM, jam: '' });
    expect(msg).toContain('*Tanggal:* 2026-07-01');
    expect(msg).not.toContain('pukul');
  });
});

describe('buildWhatsAppURL', () => {
  test('returns URL with correct phone number', () => {
    const url = buildWhatsAppURL(VALID_FORM);
    expect(url).toMatch(`https://wa.me/${WA_NUMBER}?text=`);
  });

  test('URL-encodes the message body', () => {
    const url = buildWhatsAppURL(VALID_FORM);
    expect(url).toContain(encodeURIComponent('*Nama:* Budi'));
  });
});

describe('getTodayDateString', () => {
  test('returns a string in YYYY-MM-DD format', () => {
    const today = getTodayDateString();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('returns correct date for a fixed time', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-15T12:00:00Z'));
    expect(getTodayDateString()).toBe('2026-01-15');
    jest.useRealTimers();
  });
});

describe('WA_NUMBER', () => {
  test('is a non-empty string of digits', () => {
    expect(WA_NUMBER).toMatch(/^\d+$/);
    expect(WA_NUMBER.length).toBeGreaterThan(0);
  });
});
