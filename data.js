/* ==========================================================================
   RoadMaster — Demo data layer
   --------------------------------------------------------------------------
   Everything in this file is FRONTEND MOCK DATA for the Stage 1 demo.
   There is no backend and no database. All state lives in localStorage
   under RM_STATE_KEY so a click in one demo page (e.g. staff dashboard)
   is visible in another (e.g. admin dashboard) within the same browser,
   which is what makes the walkthrough feel connected for the CEO demo.

   STRUCTURE NOTE FOR FUTURE BACKEND WORK:
   The shape of RM.bookings, RM.vehicles, RM.drivers below is deliberately
   close to the "recommended database entities" in the Stage 1 written
   blueprint (Booking, Customer, Vehicle, Quotation, CommunicationLog).
   When a real API exists, replace the localStorage read/write functions
   at the bottom of this file with fetch() calls — the rest of the pages
   consume RM.getBookings() / RM.saveBooking() etc., not localStorage
   directly, so the swap is isolated to this file.
   ========================================================================== */

const RM_STATE_KEY = 'roadmaster_demo_state_v1';

const RM_VEHICLES = [
  {
    id: 'VEH-SED-01',
    type: 'Sedan',
    name: 'Sedan (Honda Fit class)',
    capacity: 4,
    crossBorder: true,
    image: 'assets/img/vehicle-sedan.jpg',
    rate: 'E1,000/day',
    status: 'available'
  },
  {
    id: 'VEH-7S-01',
    type: '7-Seater',
    name: '7-Seater (VW Touran)',
    capacity: 7,
    crossBorder: true,
    image: 'assets/img/vehicle-7seater-hero.jpg',
    rate: 'E1,500/day',
    status: 'available'
  },
  {
    id: 'VEH-7S-02',
    type: '7-Seater',
    name: '7-Seater (VW Touran)',
    capacity: 7,
    crossBorder: true,
    image: 'assets/img/vehicle-7seater-2.jpg',
    rate: 'E1,500/day',
    status: 'booked'
  },
  {
    id: 'VEH-TRK-01',
    type: 'Truck',
    name: 'Mini Truck',
    capacity: 2,
    crossBorder: false,
    image: 'assets/img/vehicle-truck.jpg',
    rate: 'Quote based on destination',
    status: 'available'
  },
  {
    id: 'VEH-TRK-02',
    type: 'Truck',
    name: 'Mini Truck',
    capacity: 2,
    crossBorder: false,
    image: 'assets/img/vehicle-truck-2.jpg',
    rate: 'Quote based on destination',
    status: 'reserved'
  }
];

// Drivers — names are NOT in the source assets, so demo driver records
// use role-only labels rather than invented names. See DEMO_NOTES.md.
const RM_DRIVERS = [
  { id: 'DRV-01', label: 'Driver 1', photo: 'assets/img/team-driver-1.jpg', status: 'on trip', vehicle: 'VEH-7S-02' },
  { id: 'DRV-02', label: 'Driver 2', photo: 'assets/img/team-driver-2.jpg', status: 'available', vehicle: null },
  { id: 'DRV-03', label: 'Driver 3', photo: 'assets/img/team-driver-3.jpg', status: 'available', vehicle: null }
];

// Team — only confirmed role labels from the provided assets are used.
const RM_TEAM = [
  { name: 'RoadMaster CEO', role: 'Chief Executive Officer', photo: 'assets/img/team-ceo.jpg' },
  { name: 'RoadMaster Director', role: 'Director', photo: 'assets/img/team-director.jpg' },
  { name: 'Marketing & Communication', role: 'Marketing & Communication', photo: 'assets/img/team-marketing.jpg' },
  { name: 'Jumbo Khumalo', role: 'Brand Influencer', photo: 'assets/img/team-influencer-1.jpg' },
  { name: 'Bukhosibakhe Dlamini', role: 'Brand Influencer', photo: 'assets/img/team-influencer-2.jpg' },
  { name: 'Londelwa Khumalo', role: 'TikTok Moderator & Promoter', photo: 'assets/img/team-tiktok.jpg' },
  { name: 'Ayanda Dlamini', role: 'Brand Influencer', photo: 'assets/img/team-influencer-3.jpg' }
];

function seedBookings() {
  const now = Date.now();
  return [
    {
      ref: 'RM-2026-0001',
      customer: { name: 'Thandiwe Nkambule', phone: '+268 7612 3456', email: 'thandiwe.n@example.com', pref: 'whatsapp' },
      service: '7-Seater', vehicleId: 'VEH-7S-01',
      pickup: 'Manzini', destination: 'Mbabane', passengers: 5,
      travelDate: '2026-09-03', returnDate: '', tripType: 'One-way',
      status: 'confirmed', price: 'E1,500',
      driverId: 'DRV-01',
      createdAt: now - 86400000 * 3,
      log: [
        { time: '3 days ago', actor: 'System', text: 'Booking request received.' },
        { time: '3 days ago', actor: 'Staff', text: 'Quotation created (E1,500).' },
        { time: '3 days ago', actor: 'WhatsApp', text: 'Quotation sent to customer.' },
        { time: '2 days ago', actor: 'Customer', text: 'Quotation opened.' },
        { time: '2 days ago', actor: 'Customer', text: 'Quotation accepted.' },
        { time: '2 days ago', actor: 'WhatsApp', text: 'Booking confirmation sent.' },
        { time: '1 day ago', actor: 'Staff', text: 'Driver and vehicle assigned.' }
      ]
    },
    {
      ref: 'RM-2026-0002',
      customer: { name: 'Sipho Dlamini', phone: '+268 7899 2211', email: '', pref: 'whatsapp' },
      service: 'Sedan', vehicleId: 'VEH-SED-01',
      pickup: 'Matsapha', destination: 'Ngwenya Border', passengers: 2,
      travelDate: '2026-09-05', returnDate: '2026-09-05', tripType: 'Return',
      status: 'pending', price: '',
      driverId: null,
      createdAt: now - 3600000 * 5,
      log: [
        { time: '5 hours ago', actor: 'System', text: 'Booking request received.' }
      ]
    },
    {
      ref: 'RM-2026-0003',
      customer: { name: 'Neo Trading (Pty) Ltd', phone: '+268 7344 9080', email: 'accounts@neotrading-demo.co.sz', pref: 'email', company: 'Neo Trading (Pty) Ltd', contact: 'Lindiwe Shongwe', orderRef: 'PO-4471' },
      service: 'Cross-border', vehicleId: 'VEH-7S-01',
      pickup: 'Manzini', destination: 'Maputo, Mozambique', passengers: 6,
      travelDate: '2026-09-10', returnDate: '2026-09-12', tripType: 'Return',
      status: 'quoted', price: 'E1,500/day',
      driverId: null,
      createdAt: now - 3600000 * 20,
      log: [
        { time: '20 hours ago', actor: 'System', text: 'Booking request received.' },
        { time: '18 hours ago', actor: 'Staff', text: 'Quotation created (E1,500/day, 3 days).' },
        { time: '18 hours ago', actor: 'Email', text: 'Quotation sent to customer.' }
      ]
    },
    {
      ref: 'RM-2026-0004',
      customer: { name: 'Nomvula Simelane', phone: '+268 7601 5567', email: 'nomvula.s@example.com', pref: 'both' },
      service: 'Truck', vehicleId: 'VEH-TRK-01',
      pickup: 'Manzini', destination: 'Siteki', passengers: 0,
      travelDate: '2026-08-29', returnDate: '', tripType: 'One-way',
      status: 'completed', price: 'E1,200',
      driverId: 'DRV-02',
      createdAt: now - 86400000 * 6,
      log: [
        { time: '6 days ago', actor: 'System', text: 'Booking request received.' },
        { time: '6 days ago', actor: 'Staff', text: 'Quotation created (E1,200).' },
        { time: '6 days ago', actor: 'WhatsApp', text: 'Quotation sent to customer.' },
        { time: '6 days ago', actor: 'Email', text: 'Quotation sent to customer.' },
        { time: '5 days ago', actor: 'Customer', text: 'Quotation accepted.' },
        { time: '5 days ago', actor: 'Staff', text: 'Driver and vehicle assigned.' },
        { time: '4 days ago', actor: 'System', text: 'Trip completed.' }
      ]
    }
  ];
}

function loadState() {
  try {
    const raw = localStorage.getItem(RM_STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.vehicleStatus) {
        parsed.vehicleStatus = {};
        RM_VEHICLES.forEach(v => { parsed.vehicleStatus[v.id] = v.status; });
      }
      if (!parsed.driverStatus) {
        parsed.driverStatus = {};
        RM_DRIVERS.forEach(d => { parsed.driverStatus[d.id] = d.status; });
      }
      return parsed;
    }
  } catch (e) { /* fall through to seed */ }
  const vehicleStatus = {};
  RM_VEHICLES.forEach(v => { vehicleStatus[v.id] = v.status; });
  const driverStatus = {};
  RM_DRIVERS.forEach(d => { driverStatus[d.id] = d.status; });
  const seeded = { bookings: seedBookings(), nextRef: 5, vehicleStatus, driverStatus };
  saveState(seeded);
  return seeded;
}

function saveState(state) {
  localStorage.setItem(RM_STATE_KEY, JSON.stringify(state));
}

const RM = {
  vehicles: RM_VEHICLES,
  drivers: RM_DRIVERS,
  team: RM_TEAM,

  getBookings() {
    return loadState().bookings;
  },

  getBooking(ref) {
    return loadState().bookings.find(b => b.ref === ref) || null;
  },

  createBooking(details) {
    const state = loadState();
    const ref = `RM-2026-${String(state.nextRef).padStart(4, '0')}`;
    const booking = Object.assign({
      ref,
      status: 'pending',
      price: '',
      driverId: null,
      vehicleId: null,
      createdAt: Date.now(),
      log: [{ time: 'Just now', actor: 'System', text: 'Booking request received.' }]
    }, details);
    state.bookings.unshift(booking);
    state.nextRef += 1;
    saveState(state);
    return booking;
  },

  updateBooking(ref, patch, logEntry) {
    const state = loadState();
    const b = state.bookings.find(x => x.ref === ref);
    if (!b) return null;
    Object.assign(b, patch);
    if (logEntry) b.log.push(Object.assign({ time: 'Just now' }, logEntry));
    saveState(state);
    return b;
  },

  addLog(ref, entry) {
    const state = loadState();
    const b = state.bookings.find(x => x.ref === ref);
    if (!b) return null;
    b.log.push(Object.assign({ time: 'Just now' }, entry));
    saveState(state);
    return b;
  },

  vehicleById(id) {
    return RM_VEHICLES.find(v => v.id === id) || null;
  },
  driverById(id) {
    return RM_DRIVERS.find(d => d.id === id) || null;
  },

  // Driver status mirrors the vehicle-status pattern above: assigning a
  // driver to a booking in the staff dashboard marks them "on trip" here,
  // so the Admin dashboard's Drivers tab reflects it live too.
  getDriversWithStatus() {
    const state = loadState();
    return RM_DRIVERS.map(d => Object.assign({}, d, { status: state.driverStatus[d.id] || d.status }));
  },

  setDriverStatus(driverId, status) {
    const state = loadState();
    state.driverStatus[driverId] = status;
    saveState(state);
  },

  // Vehicle availability is shared, mutable state -- assigning a vehicle
  // to a booking in the staff dashboard flips it here, and the public
  // Vehicles page (and admin dashboard) read the same value, so
  // availability visibly changes as bookings move through the system.
  getVehiclesWithStatus() {
    const state = loadState();
    return RM_VEHICLES.map(v => Object.assign({}, v, { status: state.vehicleStatus[v.id] || v.status }));
  },

  setVehicleStatus(vehicleId, status) {
    const state = loadState();
    state.vehicleStatus[vehicleId] = status;
    saveState(state);
  },

  resetDemoData() {
    localStorage.removeItem(RM_STATE_KEY);
    loadState();
  }
};
