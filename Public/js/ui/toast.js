/* ============================================================
   Toasts + diálogo de confirmação — estilizados com Tailwind
   Substituem os alert()/confirm() nativos.
   Expõe: window.showToast(msg, type) e window.confirmDialog(msg, opts)
   ============================================================ */
(function () {
    const ICONS = {
        success: 'fa-circle-check',
        error: 'fa-circle-exclamation',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    // Acento por tipo; o corpo é sempre branco para máxima legibilidade.
    const THEME = {
        success: { accent: 'border-l-emerald-500', icon: 'text-emerald-600 bg-emerald-50' },
        error:   { accent: 'border-l-red-500',     icon: 'text-red-600 bg-red-50' },
        warning: { accent: 'border-l-amber-500',   icon: 'text-amber-600 bg-amber-50' },
        info:    { accent: 'border-l-[#e8552b]',   icon: 'text-[#e8552b] bg-[#fdeee8]' }
    };

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function getRoot() {
        let root = document.getElementById('toast-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'toast-root';
            root.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-[min(92vw,360px)] pointer-events-none';
            document.body.appendChild(root);
        }
        return root;
    }

    function showToast(message, type = 'info', opts = {}) {
        if (!message) return;
        const theme = THEME[type] || THEME.info;
        const icon = ICONS[type] || ICONS.info;
        const duration = opts.duration != null ? opts.duration : 3800;

        const el = document.createElement('div');
        el.className =
            'pointer-events-auto flex items-start gap-3 rounded-xl bg-white border border-[#e8e4dd] ' +
            theme.accent + ' border-l-4 px-4 py-3 ' +
            'shadow-[0_18px_40px_-22px_rgba(28,27,31,0.45)] ' +
            'translate-x-8 opacity-0 transition-all duration-300 ease-out';
        el.setAttribute('role', type === 'error' ? 'alert' : 'status');
        el.innerHTML =
            '<span class="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full ' + theme.icon + '">' +
                '<i class="fa-solid ' + icon + ' text-sm"></i>' +
            '</span>' +
            '<p class="flex-1 text-sm leading-snug text-[#1c1b1f]">' + escapeHtml(message) + '</p>' +
            '<button type="button" class="flex-none text-[#6e6a72] hover:text-[#1c1b1f] transition-colors" aria-label="Fechar">' +
                '<i class="fa-solid fa-xmark"></i>' +
            '</button>';

        getRoot().appendChild(el);
        requestAnimationFrame(() => {
            el.classList.remove('translate-x-8', 'opacity-0');
            el.classList.add('translate-x-0', 'opacity-100');
        });

        let timer;
        const dismiss = () => {
            clearTimeout(timer);
            el.classList.add('translate-x-8', 'opacity-0');
            el.addEventListener('transitionend', () => el.remove(), { once: true });
        };
        el.querySelector('button').addEventListener('click', dismiss);
        timer = setTimeout(dismiss, duration);
        return { dismiss };
    }

    function confirmDialog(message, opts = {}) {
        return new Promise((resolve) => {
            const title = opts.title || 'Confirmar ação';
            const confirmText = opts.confirmText || 'Confirmar';
            const cancelText = opts.cancelText || 'Cancelar';
            const danger = !!opts.danger;

            const confirmColor = danger ? 'bg-red-500 hover:bg-red-600' : 'bg-[#e8552b] hover:bg-[#d8471f]';
            const iconWrap = danger ? 'text-red-600 bg-red-50' : 'text-[#e8552b] bg-[#fdeee8]';
            const icon = danger ? 'fa-triangle-exclamation' : 'fa-circle-question';

            const overlay = document.createElement('div');
            overlay.className =
                'fixed inset-0 z-[9999] flex items-center justify-center bg-[#1c1b1f]/55 ' +
                'backdrop-blur-[2px] px-4 opacity-0 transition-opacity duration-200';
            overlay.innerHTML =
                '<div class="dialog-card w-full max-w-sm rounded-2xl bg-white p-6 ' +
                    'shadow-[0_18px_40px_-22px_rgba(28,27,31,0.45)] translate-y-2 scale-95 transition-transform duration-200">' +
                    '<span class="mb-4 flex h-12 w-12 items-center justify-center rounded-full ' + iconWrap + '">' +
                        '<i class="fa-solid ' + icon + ' text-lg"></i>' +
                    '</span>' +
                    '<h3 class="mb-1 text-lg font-bold text-[#1c1b1f]" style="font-family:\'Space Grotesk\',sans-serif;">' + escapeHtml(title) + '</h3>' +
                    '<p class="mb-6 text-sm leading-relaxed text-[#6e6a72]">' + escapeHtml(message) + '</p>' +
                    '<div class="flex justify-end gap-3">' +
                        '<button type="button" data-act="cancel" class="rounded-lg bg-[#f7f6f3] px-4 py-2.5 text-sm font-semibold text-[#1c1b1f] hover:bg-[#efece6] transition-colors">' + escapeHtml(cancelText) + '</button>' +
                        '<button type="button" data-act="ok" class="rounded-lg ' + confirmColor + ' px-4 py-2.5 text-sm font-semibold text-white transition-colors">' + escapeHtml(confirmText) + '</button>' +
                    '</div>' +
                '</div>';

            document.body.appendChild(overlay);
            const card = overlay.querySelector('.dialog-card');
            requestAnimationFrame(() => {
                overlay.classList.remove('opacity-0');
                card.classList.remove('translate-y-2', 'scale-95');
            });

            const close = (value) => {
                overlay.classList.add('opacity-0');
                card.classList.add('translate-y-2', 'scale-95');
                overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
                document.removeEventListener('keydown', onKey);
                resolve(value);
            };
            function onKey(e) { if (e.key === 'Escape') close(false); }

            overlay.querySelector('[data-act="ok"]').addEventListener('click', () => close(true));
            overlay.querySelector('[data-act="cancel"]').addEventListener('click', () => close(false));
            overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });
            document.addEventListener('keydown', onKey);
        });
    }

    function inferType(msg) {
        const s = String(msg).toLowerCase();
        if (/sucesso|realizad|adicionad|deletad|exclu[ií]d|atualizad|cadastrad/.test(s)) return 'success';
        if (/erro|incorret|n[ãa]o foi|n[ãa]o poss[ií]vel|ops|preencha|obrigat|inv[áa]lid|m[ií]nimo|proseguir|prosseguir|empreenchido|insira|coloque/.test(s)) return 'error';
        return 'info';
    }

    window.showToast = showToast;
    window.confirmDialog = confirmDialog;

    // Rede de segurança: qualquer alert() remanescente vira um toast com tipo inferido.
    window.alert = function (msg) { showToast(msg, inferType(msg)); };
})();
