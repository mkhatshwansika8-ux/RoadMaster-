/* ==========================================================================
   RoadMaster — shared UI behaviour (nav, toasts, helpers)
   ========================================================================== */

function rmInitNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const expanded = mobileNav.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
  }
}

function rmToast(message, tone) {
  let host = document.getElementById('rm-toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'rm-toast-host';
    host.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:999;display:flex;flex-direction:column;gap:10px;align-items:center;width:100%;max-width:420px;padding:0 16px;';
    document.body.appendChild(host);
  }
  const el = document.createElement('div');
  const bg = tone === 'error' ? '#C23B2F' : (tone === 'info' ? '#1C222B' : '#2E7D46');
  el.textContent = message;
  el.style.cssText = `background:${bg};color:#fff;padding:13px 18px;border-radius:8px;font-family:'Inter',sans-serif;font-size:0.9rem;box-shadow:0 8px 24px -6px rgba(0,0,0,0.35);width:100%;text-align:center;opacity:0;transform:translateY(8px);transition:opacity .25s ease, transform .25s ease;`;
  host.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

function rmQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function rmStatusPill(status) {
  const map = {
    pending:   { cls: 'pill-amber', label: 'Pending' },
    quoted:    { cls: 'pill-amber', label: 'Quoted' },
    confirmed: { cls: 'pill-green', label: 'Confirmed' },
    completed: { cls: 'pill-neutral', label: 'Completed' },
    cancelled: { cls: 'pill-red', label: 'Cancelled' },
    rejected:  { cls: 'pill-red', label: 'Rejected' }
  };
  const m = map[status] || { cls: 'pill-neutral', label: status };
  return `<span class="pill ${m.cls}"><span class="pill-dot"></span>${m.label}</span>`;
}

function rmVehiclePill(status) {
  const map = {
    available: { cls: 'pill-green', label: 'Available' },
    booked:    { cls: 'pill-red', label: 'Booked' },
    reserved:  { cls: 'pill-amber', label: 'Reserved' }
  };
  const m = map[status] || { cls: 'pill-neutral', label: status };
  return `<span class="pill ${m.cls}"><span class="pill-dot"></span>${m.label}</span>`;
}

function rmCommIcon(actor) {
  if (actor === 'WhatsApp') return '💬';
  if (actor === 'Email') return '✉️';
  if (actor === 'Customer') return '👤';
  if (actor === 'Staff') return '🧑\u200d💼';
  return '⚙️';
}

document.addEventListener('DOMContentLoaded', rmInitNav);
