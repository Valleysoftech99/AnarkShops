(() => {
  'use strict';

  const APP_KEY = 'anarkshop-app-v2';
  const OLD_LISTS_KEY = 'anarkshop-data-v1';
  const OLD_THEME_KEY = 'anarkshop-theme-v1';
  const $ = id => document.getElementById(id);
  const AVATARS = [
    { id: 'flor', emoji: '🌸' }, { id: 'calavera', emoji: '💀' },
    { id: 'auto', emoji: '🚗' }, { id: 'guitarra', emoji: '🎸' },
    { id: 'sol', emoji: '☀️' }, { id: 'nube', emoji: '☁️' },
    { id: 'libro', emoji: '📚' }
  ];
  const AVATAR_LABELS = { es:{flor:'Flor',calavera:'Calavera',auto:'Auto',guitarra:'Guitarra',sol:'Sol',nube:'Nube',libro:'Libro'}, en:{flor:'Flower',calavera:'Skull',auto:'Car',guitarra:'Guitar',sol:'Sun',nube:'Cloud',libro:'Book'} };
  const COPY = {
    es: {
      menu:'Abrir menú',home:'Inicio',profile:'Perfil',appTitle:'Lista de {name}',homeEyebrow:'Compras más simples',greeting:'Hola, {name}',homeIntro:'Organiza tus compras y lleva el control mientras recorres la tienda.',lists:'Tus listas',createList:'Crear nueva lista',emptyHomeTitle:'Tu próxima compra empieza aquí',emptyHome:'Crea una lista y agrega todo lo que necesitas.',items:'artículos',item:'artículo',purchased:'comprados',draft:'Borrador · falta guardar',back:'Volver',share:'Compartir',deleteList:'Eliminar lista',saveList:'Guardar lista',editList:'Editar lista',prepare:'Preparando lista',shopping:'Lista para comprar',addItem:'Agregar artículo',clear:'Limpiar',spent:'Gastado hasta ahora',pasteList:'Pegar una lista',emptyList:'Lista vacía',pasteHint:'Pega aquí una lista de WhatsApp o un documento, o agrega artículos uno por uno.',shareTitle:'Compartir lista',whatsapp:'Compartir por WhatsApp',copyLink:'Compartir enlace de la app',copyDone:'Enlace copiado',copyFail:'No se pudo copiar el enlace',linkHint:'El enlace lleva una copia de esta lista. Al abrirlo, se importa en la app.',newListTitle:'Crear nueva lista',listName:'Nombre de la lista',listNamePlaceholder:'Ej. Compras de la semana',cancel:'Cancelar',create:'Crear lista',pasteTitle:'Pegar lista de compras',pasteLabel:'Pega texto, un artículo por renglón',pastePlaceholder:'Leche\nPan\n2 x Yogur',pasteHelp:'También reconoce cantidades como «2 x Leche» o «Leche - 2».',addToList:'Agregar a la lista',itemName:'Artículo',itemPlaceholder:'Ej. Leche entera',quantity:'Cantidad',brand:'Marca (opcional)',brandPlaceholder:'Ej. La Serenísima',price:'Precio unitario (opcional)',save:'Guardar',add:'Agregar artículo',editItem:'Editar artículo',delete:'Eliminar',rename:'Cambiar nombre',renameTitle:'Cambiar nombre',emptyPasteError:'Pega al menos un artículo, uno por renglón',qtyError:'La cantidad debe ser mayor que cero',priceError:'Ingresa un precio válido',listCreated:'Lista creada',listSaved:'Lista guardada. ¡A comprar!',itemAdded:'Artículo agregado',itemUpdated:'Artículo actualizado',itemRemoved:'Artículo eliminado',listRemoved:'Lista eliminada',nameUpdated:'Nombre actualizado',nothingBought:'Todavía no hay artículos comprados',clearBoughtConfirm:'¿Quitar {count} artículos comprados de la lista?',deleteConfirm:'¿Eliminar la lista «{name}» y sus artículos?',noProfile:'Cuéntanos cómo quieres aparecer en AnarkShop.',username:'Tu nombre',usernamePlaceholder:'Ej. Alex',chooseAvatar:'Elige un avatar',theme:'Tema',dark:'Oscuro F1',pastel:'Pasteles',language:'Idioma',spanish:'Español',english:'Inglés',start:'Empezar',saveProfile:'Guardar perfil',install:'Instalar AnarkShop',installHint:'Añádela a tu pantalla de inicio para abrirla como una app.',installSafari:'En Safari, toca Compartir y elige “Agregar a pantalla de inicio”.',installBrowser:'Abre el menú del navegador y elige “Instalar app” o “Agregar a pantalla principal”.',installing:'Instalación iniciada',chooseProfile:'Completa tu perfil para continuar.',profileSaved:'Perfil actualizado',imported:'Lista compartida importada',badImport:'No se pudo abrir la lista compartida',qtyUnit:'CANT.',priceUnit:'PRECIO / UNIDAD'
    },
    en: {
      menu:'Open menu',home:'Home',profile:'Profile',appTitle:'{name}’s Lists',homeEyebrow:'Shopping made simpler',greeting:'Hi, {name}',homeIntro:'Organize your shopping and keep track as you walk through the store.',lists:'Your lists',createList:'Create new list',emptyHomeTitle:'Your next shop starts here',emptyHome:'Create a list and add everything you need.',items:'items',item:'item',purchased:'bought',draft:'Draft · needs saving',back:'Back',share:'Share',deleteList:'Delete list',saveList:'Save list',editList:'Edit list',prepare:'Preparing list',shopping:'Shopping list',addItem:'Add item',clear:'Clear',spent:'Spent so far',pasteList:'Paste a list',emptyList:'This list is empty',pasteHint:'Paste a WhatsApp list or text document here, or add items one by one.',shareTitle:'Share list',whatsapp:'Share on WhatsApp',copyLink:'Share app link',copyDone:'Link copied',copyFail:'Could not copy link',linkHint:'The link contains a copy of this list. Opening it imports the list into the app.',newListTitle:'Create a new list',listName:'List name',listNamePlaceholder:'E.g. Weekly groceries',cancel:'Cancel',create:'Create list',pasteTitle:'Paste shopping list',pasteLabel:'Paste text, one item per line',pastePlaceholder:'Milk\nBread\n2 x Yogurt',pasteHelp:'Quantities like “2 x Milk” or “Milk - 2” are also recognized.',addToList:'Add to list',itemName:'Item',itemPlaceholder:'E.g. Whole milk',quantity:'Quantity',brand:'Brand (optional)',brandPlaceholder:'E.g. Acme',price:'Unit price (optional)',save:'Save',add:'Add item',editItem:'Edit item',delete:'Delete',rename:'Rename',renameTitle:'Change list name',emptyPasteError:'Paste at least one item, one per line',qtyError:'Quantity must be greater than zero',priceError:'Enter a valid price',listCreated:'List created',listSaved:'List saved. Happy shopping!',itemAdded:'Item added',itemUpdated:'Item updated',itemRemoved:'Item removed',listRemoved:'List deleted',nameUpdated:'Name updated',nothingBought:'No items have been checked yet',clearBoughtConfirm:'Remove {count} checked items from the list?',deleteConfirm:'Delete “{name}” and its items?',noProfile:'Choose how you want to appear in AnarkShop.',username:'Your name',usernamePlaceholder:'E.g. Alex',chooseAvatar:'Choose an avatar',theme:'Theme',dark:'F1 dark',pastel:'Pastels',language:'Language',spanish:'Spanish',english:'English',start:'Get started',saveProfile:'Save profile',install:'Install AnarkShop',installHint:'Add it to your home screen to open it like an app.',installSafari:'In Safari, tap Share, then choose “Add to Home Screen”.',installBrowser:'Open your browser menu and choose “Install app” or “Add to Home screen”.',installing:'Installation started',chooseProfile:'Complete your profile to continue.',profileSaved:'Profile updated',imported:'Shared list imported',badImport:'Could not open the shared list',qtyUnit:'QTY.',priceUnit:'PRICE / UNIT'
    }
  };

  const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  const defaultTheme = () => localStorage.getItem(OLD_THEME_KEY) === 'pastel' ? 'pastel' : 'dark_f1';
  function normalizeItem(item) {
    if (typeof item === 'string') item = { name: item };
    if (!item || typeof item !== 'object') return null;
    const name = String(item.name ?? item.item ?? item.product ?? '').trim();
    if (!name) return null;
    const q = String(item.quantity ?? item.qty ?? '1').replace(',', '.');
    const numericQty = Number(q);
    return { id: String(item.id || uid()), name, quantity: Number.isFinite(numericQty) && numericQty > 0 ? String(q) : '1', brand: String(item.brand || ''), price: item.price == null || item.price === '' || !Number.isFinite(Number(item.price)) ? null : Number(item.price), done: Boolean(item.checked ?? item.done ?? false) };
  }
  function normalizeList(list) {
    return { id: String(list.id || uid()), name: String(list.name || 'Lista').trim(), saved: list.saved !== false, createdAt: list.createdAt || new Date().toISOString(), updatedAt: list.updatedAt || list.createdAt || new Date().toISOString(), items: (Array.isArray(list.items) ? list.items : []).map(normalizeItem).filter(Boolean) };
  }
  function loadState() {
    let stored;
    try { stored = JSON.parse(localStorage.getItem(APP_KEY) || 'null'); } catch {}
    if (stored && Array.isArray(stored.lists)) {
      const userProfile=stored.userProfile && typeof stored.userProfile.name==='string' && stored.userProfile.name.trim() ? stored.userProfile : null;
      return { profile:userProfile, lists:stored.lists.filter(l=>l&&typeof l==='object').map(normalizeList) };
    }
    let legacy = [];
    try { legacy = JSON.parse(localStorage.getItem(OLD_LISTS_KEY) || '[]'); } catch {}
    return { profile: null, lists: Array.isArray(legacy) ? legacy.filter(l=>l&&typeof l==='object').map(normalizeList) : [] };
  }
  const state = loadState();
  let currentId = null;
  let activeMode = 'shop';
  let deferredInstallPrompt = null;
  let toastTimer = null;
  let modalSubmit = null;
  let profileDraft = null;

  const isPhone = /iPhone|iPod|Android.*Mobile/i.test(navigator.userAgent) || matchMedia('(max-width: 600px) and (pointer: coarse)').matches;
  const isIOS = /iPhone|iPod/i.test(navigator.userAgent);
  const icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/><path d="m7 6 2 2 3-3"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1Z"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15l-1 5Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'
  };
  const t = (key, vars = {}) => {
    const dict = COPY[state.profile?.language === 'en' ? 'en' : 'es'];
    return String(dict[key] ?? COPY.es[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const avatarEmoji = id => AVATARS.find(a => a.id === id)?.emoji || '☀️';
  const currentList = () => state.lists.find(l => l.id === currentId);

  function persist() {
    const payload = { userProfile: state.profile, lists: state.lists };
    try { localStorage.setItem(APP_KEY, JSON.stringify(payload)); localStorage.setItem(OLD_LISTS_KEY, JSON.stringify(state.lists)); }
    catch { toast(state.profile?.language === 'en' ? 'Could not save. Check available storage.' : 'No se pudo guardar. Revisa el espacio disponible.'); }
  }
  function applyTheme(theme) {
    const clean = theme === 'pastel' ? 'pastel' : 'dark_f1';
    document.documentElement.dataset.theme = clean;
    document.querySelector('meta[name="theme-color"]').content = clean === 'pastel' ? '#FFF5F7' : '#0B0E14';
    if (state.profile) state.profile.theme = clean;
  }
  function applyLanguage() {
    const lang = state.profile?.language === 'en' ? 'en' : 'es';
    document.documentElement.lang = lang;
    const name = state.profile?.name?.trim() || 'AnarkShop';
    $('brandName').textContent = t('appTitle', { name });
    document.title = t('appTitle', { name });
    document.querySelector('meta[name="apple-mobile-web-app-title"]').content = name;
    $('homeEyebrow').textContent = t('homeEyebrow');
    $('homeGreeting').textContent = t('greeting', { name });
    $('homeIntro').textContent = t('homeIntro');
    $('listsHeading').textContent = t('lists');
    $('createListLabel').textContent = t('createList');
    $('backBtn').setAttribute('aria-label', t('back'));
    $('shareBtn').setAttribute('aria-label', t('share'));
    $('deleteCurrentBtn').setAttribute('aria-label', t('deleteList'));
    $('deleteCurrentBtn').title = t('deleteList');
    $('addItemBtn').setAttribute('aria-label', t('addItem'));
    $('clearBoughtBtn').textContent = t('clear');
    $('spentLabel').textContent = t('spent');
    $('homeNav').lastChild.textContent = t('home');
    $('profileNav').lastChild.textContent = t('profile');
    $('drawerCaption').textContent = state.profile?.language === 'en' ? 'Shopping lists' : 'Listas de compras';
    $('menuBtn').setAttribute('aria-label', t('menu'));
  }
  function formatDate(value) {
    try { return new Intl.DateTimeFormat(state.profile?.language === 'en' ? 'en-US' : 'es-AR', { day:'numeric', month:'short' }).format(new Date(value)); }
    catch { return ''; }
  }
  function formatMoney(value) {
    const locale = state.profile?.language === 'en' ? 'en-US' : 'es-AR';
    const currency = state.profile?.language === 'en' ? 'USD' : 'ARS';
    return new Intl.NumberFormat(locale, { style:'currency', currency:'ARS', maximumFractionDigits:2 }).format(Number(value) || 0);
  }
  function touch(list) { list.updatedAt = new Date().toISOString(); }
  function toast(message) { const node = $('toast'); node.textContent = message; node.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('show'), 2400); }

  function renderHome() {
    applyLanguage();
    $('listCount').textContent = `${state.lists.length} ${state.lists.length === 1 ? t('item') : t('items')}`;
    const host = $('listStack');
    if (!state.lists.length) {
      host.innerHTML = `<div class="empty"><div class="empty-icon">${icons.bag}</div><strong>${t('emptyHomeTitle')}</strong>${t('emptyHome')}</div>`;
      return;
    }
    host.innerHTML = state.lists.slice().sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(list => {
      const done = list.items.filter(i => i.done).length;
      const meta = list.saved ? `${list.items.length} ${list.items.length === 1 ? t('item') : t('items')} · ${done} ${t('purchased')}` : t('draft');
      return `<article class="list-card"><div class="list-symbol">${icons.bag}</div><button class="list-open" data-action="open-list" data-id="${escapeHtml(list.id)}"><span class="list-title">${escapeHtml(list.name)}</span><span class="list-meta">${meta} · ${formatDate(list.updatedAt)}</span></button><div class="card-actions"><button class="small-btn" data-action="rename-list" data-id="${escapeHtml(list.id)}" aria-label="${t('rename')}">${icons.edit}</button><button class="small-btn" data-action="delete-list" data-id="${escapeHtml(list.id)}" aria-label="${t('deleteList')}">${icons.trash}</button></div></article>`;
    }).join('');
  }
  function renderDetail() {
    const list = currentList();
    if (!list) return goHome();
    const editing = activeMode === 'edit';
    $('detailView').classList.toggle('editing', editing);
    $('items').classList.toggle('edit-mode', editing);
    $('modeBtn').textContent = editing ? t('saveList') : t('editList');
    $('detailTitle').textContent = list.name;
    $('detailSub').textContent = `${editing ? t('prepare') : t('shopping')} · ${list.items.length} ${list.items.length === 1 ? t('item') : t('items')}`;
    $('deleteCurrentBtn').hidden = editing;
    $('clearBoughtBtn').textContent = t('clear');
    const host = $('items');
    if (!list.items.length) {
      host.innerHTML = `<div class="empty"><div class="empty-icon">${icons.bag}</div><strong>${t('emptyList')}</strong><p>${t('pasteHint')}</p><button class="primary" data-action="paste-list">${t('pasteList')}</button></div>`;
    } else {
      host.innerHTML = list.items.map((item, index) => {
        const compact = !editing && item.done;
        const check = editing ? '' : `<input class="check" type="checkbox" ${item.done ? 'checked' : ''} data-action="check-item" data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}">`;
        const quantity = editing
          ? `<label class="qty-inline"><span>${t('quantity')}</span><input type="text" inputmode="decimal" value="${escapeHtml(item.quantity)}" data-action="edit-quantity" data-id="${escapeHtml(item.id)}" aria-label="${t('quantity')} ${escapeHtml(item.name)}"></label>`
          : compact ? '' : `<div class="qty-stepper"><button type="button" data-action="step-qty" data-step="-1" data-id="${escapeHtml(item.id)}" aria-label="−">−</button><output>${escapeHtml(item.quantity)}</output><button type="button" data-action="step-qty" data-step="1" data-id="${escapeHtml(item.id)}" aria-label="+">+</button></div>`;
        const meta = compact ? '' : `<div class="item-meta">${quantity}${item.brand ? `<span>${escapeHtml(item.brand)}</span>` : ''}</div>`;
        const price = !editing && item.done && item.price == null
          ? `<label class="item-price-entry"><span>${t('priceUnit')}</span><input class="unit-price-input" inputmode="decimal" placeholder="$ 0,00" value="" data-action="edit-price" data-id="${escapeHtml(item.id)}" aria-label="${t('price')} ${escapeHtml(item.name)}"></label>`
          : `<div class="item-price ${item.price == null ? 'empty-price' : ''}">${item.price == null ? '—' : formatMoney(Number(item.price) * numberQty(item.quantity))}</div>`;
        const actions = compact ? '' : `<div class="item-edit"><button data-action="edit-item" data-id="${escapeHtml(item.id)}">${t('editItem')}</button><button data-action="remove-item" data-id="${escapeHtml(item.id)}">${t('delete')}</button></div>`;
        return `<article class="item ${compact ? 'compact done' : ''}">${check}<div class="item-main"><div class="item-name">${compact ? '' : `${index + 1}. `}${escapeHtml(item.name)}</div>${meta}</div>${price}${actions}</article>`;
      }).join('');
    }
    updateSummary(list);
  }
  function updateSummary(list) {
    const bought = list.items.filter(i => i.done);
    const total = bought.reduce((sum, item) => sum + (item.price == null ? 0 : Number(item.price) * numberQty(item.quantity)), 0);
    $('totalSpent').textContent = formatMoney(total);
    $('progressText').textContent = `${bought.length}/${list.items.length} ${t('purchased')}`;
    $('progressFill').style.width = `${list.items.length ? bought.length / list.items.length * 100 : 0}%`;
  }
  function numberQty(value) { const n = Number(String(value ?? '1').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : 1; }
  function openList(id) {
    currentId = id; activeMode = state.lists.find(l => l.id === id)?.saved === false ? 'edit' : 'shop';
    $('homeView').classList.remove('active'); $('detailView').classList.add('active');
    renderDetail(); window.scrollTo(0,0);
  }
  function goHome() {
    currentId = null; $('detailView').classList.remove('active'); $('homeView').classList.add('active');
    $('homeNav').setAttribute('aria-current','page'); $('profileNav').removeAttribute('aria-current'); renderHome(); window.scrollTo(0,0);
  }
  function deleteList(id) {
    const list = state.lists.find(l => l.id === id); if (!list) return;
    if (!confirm(t('deleteConfirm', { name:list.name }))) return;
    state.lists = state.lists.filter(l => l.id !== id); persist();
    if (currentId === id) goHome(); else renderHome();
    toast(t('listRemoved'));
  }
  function removeItem(id) {
    const list = currentList(); if (!list) return;
    list.items = list.items.filter(i => i.id !== id); touch(list); persist(); renderDetail();
  }

  function showModal(title, content, options = {}) {
    $('modalTitle').textContent = title;
    $('modalForm').innerHTML = content;
    $('modalBackdrop').classList.add('open');
    $('modalBackdrop').dataset.locked = String(Boolean(options.locked));
    $('closeModal').hidden = Boolean(options.locked);
    $('modalBackdrop').onclick = event => { if (event.target === $('modalBackdrop') && !options.locked) closeModal(); };
    modalSubmit = options.submit || null;
    setTimeout(() => $('modalForm').querySelector('input,textarea,select')?.focus(), 30);
  }
  function closeModal() {
    $('modalBackdrop').classList.remove('open'); $('closeModal').hidden = false; modalSubmit = null;
  }
  function avatarChoices(selected) {
    const lang=state.profile?.language==='en'?'en':'es';
    return `<div class="avatar-grid">${AVATARS.map(a => `<button class="avatar-option" type="button" data-avatar="${a.id}" aria-pressed="${a.id === selected}"><span class="emoji">${a.emoji}</span><small>${AVATAR_LABELS[lang][a.id]}</small></button>`).join('')}</div>`;
  }
  function themeChoices(selected) {
    return `<div class="theme-row"><button type="button" class="theme-option" data-profile-theme="dark_f1" aria-pressed="${selected === 'dark_f1'}">${t('dark')}</button><button type="button" class="theme-option" data-profile-theme="pastel" aria-pressed="${selected === 'pastel'}">${t('pastel')}</button></div>`;
  }
  function showProfileModal(onboarding = false) {
    profileDraft = { name: state.profile?.name || '', avatar: state.profile?.avatar || 'sol', theme: state.profile?.theme || defaultTheme(), language: state.profile?.language || 'es' };
    const installed = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
    const installBox = onboarding && isPhone && !installed ? `<div class="install-box"><button class="secondary" type="button" data-action="install-app">${t('install')}</button><p class="field-hint">${t('installHint')}</p><p class="field-hint" id="installFallback" hidden></p></div>` : '';
    const content = `<p class="welcome-copy">${onboarding ? t('noProfile') : ''}</p>
      <div class="field"><label for="profileName">${t('username')}</label><input id="profileName" maxlength="40" required placeholder="${t('usernamePlaceholder')}" value="${escapeHtml(profileDraft.name)}"></div>
      <div class="field"><label>${t('chooseAvatar')}</label>${avatarChoices(profileDraft.avatar)}</div>
      <div class="field"><label>${t('theme')}</label>${themeChoices(profileDraft.theme)}</div>
      <div class="field"><label for="profileLanguage">${t('language')}</label><select id="profileLanguage"><option value="es" ${profileDraft.language === 'es' ? 'selected' : ''}>${t('spanish')}</option><option value="en" ${profileDraft.language === 'en' ? 'selected' : ''}>${t('english')}</option></select></div>
      ${installBox}<div class="modal-actions">${onboarding ? '' : `<button type="button" class="secondary" data-action="close-modal">${t('cancel')}</button>`}<button class="primary" type="submit">${onboarding ? t('start') : t('saveProfile')}</button></div>`;
    showModal(onboarding ? 'AnarkShop' : t('profile'), content, {
      locked: onboarding,
      submit: () => {
        const name = $('profileName').value.trim(); if (!name) { $('profileName').focus(); toast(t('chooseProfile')); return; }
        profileDraft.name = name; profileDraft.language = $('profileLanguage').value;
        state.profile = { ...profileDraft }; applyTheme(state.profile.theme); persist(); closeModal(); updateProfileUI(); if (currentId) renderDetail(); else goHome();
        if (onboarding) { try { localStorage.setItem('anarkshop-profile-onboarded','1'); } catch {} }
        if (!onboarding) toast(t('profileSaved'));
      }
    });
  }
  function updateProfileUI() {
    if (!state.profile) return;
    $('drawerAvatar').textContent = avatarEmoji(state.profile.avatar);
    $('drawerName').textContent = state.profile.name;
    applyTheme(state.profile.theme); applyLanguage();
  }
  function openDrawer() { $('drawerRoot').classList.add('drawer-open'); $('menuBtn').setAttribute('aria-expanded','true'); }
  function closeDrawer() { $('drawerRoot').classList.remove('drawer-open'); $('menuBtn').setAttribute('aria-expanded','false'); }

  function showCreateModal() {
    showModal(t('newListTitle'), `<div class="field"><label for="listName">${t('listName')}</label><input id="listName" maxlength="70" required placeholder="${t('listNamePlaceholder')}"></div><div class="modal-actions"><button type="button" class="secondary" data-action="close-modal">${t('cancel')}</button><button class="primary" type="submit">${t('create')}</button></div>`, {
      submit: () => { const name = $('listName').value.trim(); if (!name) return; const now = new Date().toISOString(); const list = { id:uid(), name, saved:false, createdAt:now, updatedAt:now, items:[] }; state.lists.unshift(list); persist(); closeModal(); renderHome(); openList(list.id); toast(t('listCreated')); }
    });
  }
  function showPasteModal() {
    showModal(t('pasteTitle'), `<div class="field"><label for="pasteText">${t('pasteLabel')}</label><textarea id="pasteText" required placeholder="${t('pastePlaceholder')}"></textarea><div class="field-hint">${t('pasteHelp')}</div></div><div class="modal-actions"><button type="button" class="secondary" data-action="close-modal">${t('cancel')}</button><button class="primary" type="submit">${t('addToList')}</button></div>`, {
      submit: () => { const list = currentList(); const added = parseLines($('pasteText').value); if (!list || !added.length) { toast(t('emptyPasteError')); return; } list.items.push(...added); touch(list); persist(); closeModal(); renderDetail(); }
    });
  }
  function parseLines(text) {
    return text.split(/\r?\n/).map(s => s.trim()).filter(Boolean).map(line => {
      line = line.replace(/^(?:[-*•☐☑✅▫️✔️]+\s*|\d+[.)]\s*)/u, '').trim();
      let name = line, quantity = '1';
      let match = line.match(/^(\d+(?:[.,]\d+)?)\s*[x×*]\s*(.+)$/i);
      if (match) { quantity = match[1].replace(',', '.'); name = match[2].trim(); }
      else { match = line.match(/^(.+?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*$/i); if (match) { name = match[1].trim(); quantity = match[2].replace(',', '.'); } else { match = line.match(/^(.+?)\s*(?:-|—|:)\s*(\d+(?:[.,]\d+)?)\s*$/); if (match) { name = match[1].trim(); quantity = match[2].replace(',', '.'); } } }
      return normalizeItem({ name, quantity });
    }).filter(Boolean);
  }
  function showItemModal(id = null) {
    const list = currentList(); if (!list) return;
    const item = id ? list.items.find(i => i.id === id) : null;
    showModal(item ? t('editItem') : t('addItem'), `<div class="field"><label for="itemName">${t('itemName')}</label><input id="itemName" required maxlength="100" placeholder="${t('itemPlaceholder')}" value="${escapeHtml(item?.name || '')}"></div><div class="form-grid"><div class="field"><label for="itemQty">${t('quantity')}</label><input id="itemQty" inputmode="decimal" value="${escapeHtml(item?.quantity || '1')}"></div><div class="field"><label for="itemBrand">${t('brand')}</label><input id="itemBrand" maxlength="60" placeholder="${t('brandPlaceholder')}" value="${escapeHtml(item?.brand || '')}"></div></div><div class="field"><label for="itemPrice">${t('price')}</label><input id="itemPrice" inputmode="decimal" placeholder="0,00" value="${item?.price == null ? '' : escapeHtml(item.price)}"></div><div class="modal-actions"><button type="button" class="secondary" data-action="close-modal">${t('cancel')}</button><button class="primary" type="submit">${t('save')}</button></div>`, {
      submit: () => {
        const name = $('itemName').value.trim(); let quantity = $('itemQty').value.trim().replace(',', '.'); const rawPrice = $('itemPrice').value.trim().replace(',', '.');
        const price = rawPrice === '' ? null : Number(rawPrice);
        if (!name) return;
        if (!quantity) quantity = '1';
        if (!Number.isFinite(Number(quantity)) || Number(quantity) <= 0) { toast(t('qtyError')); return; }
        if (price !== null && (!Number.isFinite(price) || price < 0)) { toast(t('priceError')); return; }
        const data = { name, quantity, brand:$('itemBrand').value.trim(), price };
        if (item) Object.assign(item, data); else list.items.push({ id:uid(), ...data, done:false });
        touch(list); persist(); closeModal(); renderDetail(); toast(item ? t('itemUpdated') : t('itemAdded'));
      }
    });
  }
  function showRenameModal(id) {
    const list = state.lists.find(l => l.id === id); if (!list) return;
    showModal(t('renameTitle'), `<div class="field"><label for="renameName">${t('listName')}</label><input id="renameName" maxlength="70" required value="${escapeHtml(list.name)}"></div><div class="modal-actions"><button type="button" class="secondary" data-action="close-modal">${t('cancel')}</button><button class="primary" type="submit">${t('save')}</button></div>`, {
      submit: () => { const name = $('renameName').value.trim(); if (!name) return; list.name = name; touch(list); persist(); closeModal(); renderHome(); if (currentId === list.id) renderDetail(); toast(t('nameUpdated')); }
    });
  }
  function showShareModal() {
    showModal(t('shareTitle'), `<div class="share-actions"><button type="button" class="primary" data-action="share-whatsapp">${t('whatsapp')}</button><button type="button" class="secondary" data-action="share-link">${t('copyLink')}</button><p class="field-hint">${t('linkHint')}</p></div>`, {});
  }
  function shareText(list) {
    return [`🛒 ${list.name}`, ...list.items.map(item => `${item.done ? '✅' : '▫️'} ${item.name} · ${item.quantity}${item.brand ? ` · ${item.brand}` : ''}${item.price != null ? ` · ${formatMoney(Number(item.price) * numberQty(item.quantity))}` : ''}`)].join('\n');
  }
  function encodePayload(value) {
    const bytes = new TextEncoder().encode(JSON.stringify(value)); let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }
  function decodePayload(value) {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
    const binary = atob(normalized); const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function sharedLink(list) {
    const payload = { name:list.name, items:list.items.map(({name,quantity,brand,price}) => ({name,quantity,brand,price,checked:false})) };
    const url = new URL(location.href); url.search = ''; url.hash = ''; url.searchParams.set('importList', encodePayload(payload)); return url.toString();
  }
  async function shareLink() {
    const list = currentList(); if (!list) return;
    const url = sharedLink(list);
    if (navigator.share) {
      try { await navigator.share({ title:list.name, text:t('linkHint'), url }); closeModal(); return; } catch (error) { if (error?.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(url); closeModal(); toast(t('copyDone')); }
    catch { const field = document.createElement('textarea'); field.value = url; document.body.append(field); field.select(); const copied = document.execCommand('copy'); field.remove(); closeModal(); toast(copied ? t('copyDone') : t('copyFail')); }
  }
  function importSharedList() {
    const params = new URLSearchParams(location.search); const encoded = params.get('importList'); if (!encoded) return false;
    params.delete('importList'); const remaining=params.toString(); const clean = `${location.pathname}${remaining ? `?${remaining}` : ''}${location.hash}`; history.replaceState({}, '', clean);
    try {
      const payload = decodePayload(encoded);
      if (!payload || typeof payload !== 'object' || !Array.isArray(payload.items)) throw new Error('Bad payload');
      const name = String(payload.name || payload.title || 'Lista compartida').trim() || 'Lista compartida';
      const titleKey = name.toLocaleLowerCase();
      const items = payload.items.map(normalizeItem).filter(item => item && item.name.toLocaleLowerCase() !== titleKey).map(item => ({ ...item, done:false }));
      const now = new Date().toISOString(); const list = { id:uid(), name, saved:true, createdAt:now, updatedAt:now, items };
      state.lists.unshift(list); persist(); openList(list.id); toast(t('imported')); return true;
    } catch { toast(t('badImport')); return false; }
  }

  function handleClick(event) {
    const button = event.target.closest('[data-action]'); if (!button) return;
    const action = button.dataset.action; const id = button.dataset.id;
    if (action === 'close-modal') return closeModal();
    if (action === 'open-list') return openList(id);
    if (action === 'create-list') return showCreateModal();
    if (action === 'paste-list') return showPasteModal();
    if (action === 'edit-item') return showItemModal(id);
    if (action === 'remove-item') return removeItem(id);
    if (action === 'rename-list') return showRenameModal(id);
    if (action === 'delete-list') return deleteList(id);
    if (action === 'delete-current') return deleteList(currentId);
    if (action === 'share') return showShareModal();
    if (action === 'share-whatsapp') { const list=currentList(); if (list) { window.open(`https://wa.me/?text=${encodeURIComponent(shareText(list))}`, '_blank', 'noopener,noreferrer'); closeModal(); } return; }
    if (action === 'share-link') return shareLink();
    if (action === 'install-app') return installApp();
    if (action === 'step-qty') {
      const item=currentList()?.items.find(i=>i.id===id); if (!item) return;
      const next=Math.max(0.1, Math.round((numberQty(item.quantity)+Number(button.dataset.step))*100)/100); item.quantity=String(next); touch(currentList()); persist(); renderDetail(); return;
    }
  }
  function handleChange(event) {
    const target = event.target;
    if (target.matches('[data-action="check-item"]')) {
      const list=currentList(), item=list?.items.find(i=>i.id===target.dataset.id); if (!list||!item) return;
      item.done=target.checked; touch(list); persist(); renderDetail();
      if (item.done && item.price == null) setTimeout(()=>$('items').querySelector(`[data-action="edit-price"][data-id="${CSS.escape(item.id)}"]`)?.focus(), 20);
      return;
    }
    if (target.matches('[data-action="edit-quantity"]')) {
      const list=currentList(), item=list?.items.find(i=>i.id===target.dataset.id); if (!item) return;
      const raw=target.value.trim().replace(',','.');
      if (!Number.isFinite(Number(raw))||Number(raw)<=0) { target.value=item.quantity; toast(t('qtyError')); return; }
      item.quantity=raw; touch(list); persist(); return;
    }
    if (target.matches('[data-action="edit-price"]')) {
      const list=currentList(), item=list?.items.find(i=>i.id===target.dataset.id); if (!item) return;
      const raw=target.value.trim().replace(',','.');
      if (raw!==''&&(!Number.isFinite(Number(raw))||Number(raw)<0)) { target.value=''; item.price=null; }
      else item.price=raw===''?null:Number(raw);
      touch(list); persist(); updateSummary(list);
    }
  }
  function handleInput(event) {
    const target=event.target;
    if (target.matches('[data-action="edit-quantity"]')) {
      const item=currentList()?.items.find(i=>i.id===target.dataset.id); if (!item) return;
      const raw=target.value.trim().replace(',','.'); if (raw===''||/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)) { item.quantity=raw||'1'; touch(currentList()); persist(); }
    }
    if (target.matches('[data-action="edit-price"]')) {
      const list=currentList(), item=list?.items.find(i=>i.id===target.dataset.id); if (!item) return;
      const raw=target.value.trim().replace(',','.');
      if (raw===''||/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)) { item.price=raw===''?null:Number(raw); touch(list); persist(); updateSummary(list); }
    }
  }
  async function installApp() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt(); const choice=await deferredInstallPrompt.userChoice;
      if (choice?.outcome==='accepted') toast(t('installing')); deferredInstallPrompt=null; return;
    }
    const fallback=$('installFallback'); if (!fallback) return;
    fallback.hidden=false; fallback.textContent=isIOS?t('installSafari'):t('installBrowser');
  }
  function initEvents() {
    document.addEventListener('click', handleClick);
    document.addEventListener('change', handleChange);
    document.addEventListener('input', handleInput);
    $('modalForm').addEventListener('submit', event => { event.preventDefault(); modalSubmit?.(); });
    $('closeModal').addEventListener('click', closeModal);
    $('modalBackdrop').addEventListener('click', event => { if (event.target === $('modalBackdrop') && $('modalBackdrop').dataset.locked !== 'true') closeModal(); });
    $('menuBtn').addEventListener('click', openDrawer);
    $('drawerScrim').addEventListener('click', closeDrawer);
    $('homeNav').addEventListener('click', () => { closeDrawer(); goHome(); });
    $('profileNav').addEventListener('click', () => { closeDrawer(); showProfileModal(false); });
    $('createListBtn').addEventListener('click', showCreateModal);
    $('backBtn').addEventListener('click', goHome);
    $('shareBtn').addEventListener('click', showShareModal);
    $('deleteCurrentBtn').addEventListener('click', () => deleteList(currentId));
    $('addItemBtn').addEventListener('click', () => showItemModal());
    $('modeBtn').addEventListener('click', () => {
      const list=currentList(); if (!list) return;
      if (activeMode==='edit') { list.saved=true; activeMode='shop'; toast(t('listSaved')); }
      else { list.saved=false; activeMode='edit'; }
      touch(list); persist(); renderDetail();
    });
    $('clearBoughtBtn').addEventListener('click', () => {
      const list=currentList(); if (!list) return; const count=list.items.filter(i=>i.done).length;
      if (!count) return toast(t('nothingBought'));
      if (!confirm(t('clearBoughtConfirm',{count}))) return;
      list.items=list.items.filter(i=>!i.done); touch(list); persist(); renderDetail();
    });
    $('modalForm').addEventListener('click', event => {
      const avatar=event.target.closest('[data-avatar]'); if (avatar) { profileDraft.avatar=avatar.dataset.avatar; $('modalForm').querySelectorAll('[data-avatar]').forEach(b=>b.setAttribute('aria-pressed',String(b===avatar))); }
      const theme=event.target.closest('[data-profile-theme]'); if (theme) { profileDraft.theme=theme.dataset.profileTheme; $('modalForm').querySelectorAll('[data-profile-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b===theme))); }
    });
    window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredInstallPrompt=event; });
    window.addEventListener('appinstalled', () => { deferredInstallPrompt=null; });
    window.addEventListener('keydown', event => { if (event.key==='Escape') { closeDrawer(); if (!$('closeModal').hidden) closeModal(); } });
  }

  function initialize() {
    initEvents();
    if (state.profile) { state.profile.theme=state.profile.theme==='pastel'?'pastel':'dark_f1'; state.profile.language=state.profile.language==='en'?'en':'es'; applyTheme(state.profile.theme); updateProfileUI(); }
    else applyTheme(defaultTheme());
    renderHome();
    const imported=importSharedList();
    if (!state.profile) showProfileModal(true);
    else if (!imported) goHome();
    if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
  initialize();
})();
