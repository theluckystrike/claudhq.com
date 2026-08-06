/*
 * microtools/cta.js - one-line, site-wide promo strip for the paid tools.
 *
 * Dropped into a shared layout so a single edit reaches every page on a site:
 *
 *   <script src="/kit/cta.js"
 *           data-mt-cta
 *           data-tool="recipe-scaler-pro"
 *           data-href="/pro/"
 *           data-text="Scaling more than one recipe? The Pro version batches 50 and exports a merged shopping list."
 *           data-action="See Pro"
 *           data-placement="inline"></script>
 *
 * Behaviour that matters:
 *   - Hides itself if the visitor already owns a licence for the named tool. Nobody should
 *     be sold something they have already bought.
 *   - Hides itself on the tool page it points at, to avoid a CTA linking to the current page.
 *   - Dismissible, and the dismissal sticks for 30 days.
 *   - Appends a source parameter so referrals are attributable in analytics without cookies.
 *   - Renders nothing until the licence check resolves, so a paying visitor never sees a flash
 *     of the sales pitch.
 *
 * placement: "inline"  - inserts where the script tag sits
 *            "footer"  - appends to <body>, sits in normal document flow at the end
 *            "sticky"  - fixed strip pinned to the bottom of the viewport
 */
(function () {
  'use strict';

  var self = document.currentScript;
  if (!self || !self.hasAttribute('data-mt-cta')) return;

  var cfg = {
    tool: self.getAttribute('data-tool') || '',
    href: self.getAttribute('data-href') || '',
    text: self.getAttribute('data-text') || '',
    action: self.getAttribute('data-action') || 'Take a look',
    placement: self.getAttribute('data-placement') || 'inline',
    source: self.getAttribute('data-source') || 'sitecta',
    medium: self.getAttribute('data-medium') || 'cta',
    campaign: self.getAttribute('data-campaign') || 'microtools'
  };
  if (!cfg.href || !cfg.text) return;

  var DISMISS_KEY = 'mt_cta_x_' + (cfg.tool || cfg.href);
  var DISMISS_DAYS = 30;

  function dismissed() {
    try {
      var v = localStorage.getItem(DISMISS_KEY);
      if (!v) return false;
      if (Date.now() - Number(v) > DISMISS_DAYS * 864e5) {
        localStorage.removeItem(DISMISS_KEY);
        return false;
      }
      return true;
    } catch (e) { return false; }
  }

  /* Do not advertise a page the visitor is already on. Origin has to match too, or an
     offsite target that happens to share a path would silently suppress the strip. */
  function onTargetPage() {
    try {
      var target = new URL(cfg.href, location.href);
      if (target.origin !== location.origin) return false;
      return target.pathname.replace(/\/+$/, '') === location.pathname.replace(/\/+$/, '');
    } catch (e) { return false; }
  }

  function styles() {
    if (document.getElementById('mt-cta-style')) return;
    var s = document.createElement('style');
    s.id = 'mt-cta-style';
    s.textContent = [
      '.mt-cta{--c-bg:#f4f6f8;--c-fg:#14161a;--c-mut:#5c636e;--c-line:#e0e4e9;--c-acc:#1c6ef2;',
      'font:inherit;background:var(--c-bg);color:var(--c-fg);border:1px solid var(--c-line);',
      'border-radius:10px;padding:.85rem 1rem;margin:1.75rem 0;display:flex;gap:.9rem;',
      'align-items:center;flex-wrap:wrap;line-height:1.5}',
      '@media(prefers-color-scheme:dark){.mt-cta{--c-bg:#171b21;--c-fg:#eef1f5;--c-mut:#98a1ad;',
      '--c-line:#2a2f37;--c-acc:#4d8dff}}',
      '.mt-cta-t{flex:1 1 16rem;min-width:0;font-size:.9375rem}',
      '.mt-cta-a{font-weight:600;color:var(--c-acc);text-decoration:none;white-space:nowrap;',
      'border:1px solid var(--c-acc);border-radius:7px;padding:.42rem .85rem;font-size:.875rem}',
      '.mt-cta-a:hover{background:var(--c-acc);color:#fff}',
      '.mt-cta-a:focus-visible{outline:2px solid var(--c-acc);outline-offset:2px}',
      '.mt-cta-x{background:none;border:0;color:var(--c-mut);font:inherit;font-size:1.05rem;',
      'line-height:1;cursor:pointer;padding:.3rem .35rem;border-radius:5px}',
      '.mt-cta-x:hover{color:var(--c-fg)}',
      '.mt-cta-sticky{position:fixed;left:1rem;right:1rem;bottom:1rem;margin:0;z-index:9999;',
      'box-shadow:0 6px 24px rgba(0,0,0,.16)}',
      '@media(max-width:480px){.mt-cta{padding:.75rem .85rem}.mt-cta-t{font-size:.875rem}}'
    ].join('');
    document.head.appendChild(s);
  }

  function render() {
    styles();
    var box = document.createElement('aside');
    box.className = 'mt-cta' + (cfg.placement === 'sticky' ? ' mt-cta-sticky' : '');
    box.setAttribute('aria-label', 'Related paid tool');

    var t = document.createElement('span');
    t.className = 'mt-cta-t';
    t.textContent = cfg.text;

    var a = document.createElement('a');
    a.className = 'mt-cta-a';
    /* This CTA is embedded in other people's reading. Opening in a new tab means a
       visitor who follows it has not lost the page they came for. */
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = cfg.action;
    try {
      var u = new URL(cfg.href, location.href);
      /* Gumroad only records attribution when all three of utm_source, utm_medium and
         utm_campaign are present on the landing. Any one missing and it stores nothing.
         src is kept as a second channel in case a sale-ping webhook is ever added. */
      u.searchParams.set('utm_source', cfg.source);
      u.searchParams.set('utm_medium', cfg.medium);
      u.searchParams.set('utm_campaign', cfg.campaign);
      u.searchParams.set('src', cfg.source);
      /* Keep the full absolute URL. Taking only the path dropped the origin, which sent
         every offsite target (a checkout on another host, say) to a 404 on this one. */
      a.href = u.href;
    } catch (e) { a.href = cfg.href; }

    var x = document.createElement('button');
    x.className = 'mt-cta-x';
    x.type = 'button';
    x.setAttribute('aria-label', 'Dismiss');
    x.textContent = '×';
    x.addEventListener('click', function () {
      try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) { /* ignore */ }
      box.remove();
    });

    box.appendChild(t);
    box.appendChild(a);
    box.appendChild(x);

    if (cfg.placement === 'inline' && self.parentNode) self.parentNode.insertBefore(box, self);
    else document.body.appendChild(box);
  }

  function maybeRender() {
    if (dismissed() || onTargetPage()) return;
    /* If the licence kit is present and the visitor already owns this tool, stay silent. */
    if (cfg.tool && window.MTLicense && typeof window.MTLicense.check === 'function') {
      window.MTLicense.check(cfg.tool).then(function (r) { if (!r.unlocked) render(); });
      return;
    }
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', maybeRender);
  else maybeRender();
})();
