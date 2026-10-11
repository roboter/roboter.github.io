window.circuitflow = {
    initSidebarDrag: function () {
        const transparentImg = new Image();
        transparentImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E";

        document.addEventListener('dragstart', function (e) {
            const tile = e.target && e.target.closest ? e.target.closest('.component-tile') : null;
            if (tile && e.dataTransfer) {
                // Completely suppress browser native snapshot of the sidebar button
                try {
                    e.dataTransfer.setData('text/plain', tile.getAttribute('data-footprint-id') || 'component');
                    e.dataTransfer.setDragImage(transparentImg, 0, 0);
                } catch (err) { }
                e.dataTransfer.effectAllowed = 'copy';
            }
        });
    },
    canvasRect: { left: 260, top: 36, width: 880, height: 745 },
    getCanvasRect: function () {
        if (!window.circuitflow.canvasRect) {
            const el = document.querySelector('.circuitflow-canvas-container');
            if (el) {
                const r = el.getBoundingClientRect();
                window.circuitflow.canvasRect = { left: r.left, top: r.top, width: r.width, height: r.height };
            }
        }
        return window.circuitflow.canvasRect || { left: 260, top: 36, width: 880, height: 745 };
    },
    initCanvasTracker: function (dotNetHelper) {
        function update() {
            const el = document.querySelector('.circuitflow-canvas-container');
            if (el) {
                const r = el.getBoundingClientRect();
                window.circuitflow.canvasRect = { left: r.left, top: r.top, width: r.width, height: r.height };
                if (dotNetHelper) {
                    try {
                        dotNetHelper.invokeMethodAsync('OnCanvasRectChanged', r.left, r.top, r.width, r.height);
                    } catch (e) { }
                }
            }
        }
        window.addEventListener('resize', update, { passive: true });
        window.addEventListener('scroll', update, { passive: true });
        if (window.ResizeObserver) {
            const observer = new ResizeObserver(update);
            const el = document.querySelector('.circuitflow-canvas-container');
            if (el) observer.observe(el);
        }
        update();
    },
    initGlobalShortcuts: function (dotNetHelper) {
        document.addEventListener('keydown', function (e) {
            const activeEl = document.activeElement;
            const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT');
            
            const isCmdOrCtrl = e.metaKey || e.ctrlKey;
            const keyLower = e.key ? e.key.toLowerCase() : '';

            // Handle +/- stepping for focused numeric property inputs
            if (isInput && !isCmdOrCtrl) {
                if ((e.key === '+' || e.key === '=' || e.key === '-') && (activeEl.type === 'number' || (activeEl.classList && activeEl.classList.contains('prop-input')))) {
                    const step = parseFloat(activeEl.step) || 1.0;
                    const curVal = parseFloat(activeEl.value) || 0.0;
                    const isPlus = e.key === '+' || e.key === '=';
                    const newVal = isPlus ? curVal + step : curVal - step;
                    const stepStr = activeEl.step || '';
                    const decimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
                    const rounded = parseFloat(newVal.toFixed(decimals > 0 ? decimals : 4));
                    activeEl.value = decimals > 0 ? rounded.toFixed(decimals) : rounded.toString();
                    activeEl.dispatchEvent(new Event('input', { bubbles: true }));
                    activeEl.dispatchEvent(new Event('change', { bubbles: true }));
                    e.preventDefault();
                    return;
                }
            }

            // Handle Cmd/Ctrl shortcuts that need browser preventDefault (e.g. Cmd+D bookmark, Cmd+A select all)
            if (isCmdOrCtrl) {
                if (keyLower === 'a' || keyLower === 'd' || keyLower === 's' || keyLower === 'o' || keyLower === 'z' || keyLower === 'y') {
                    if (!isInput || (keyLower !== 'a' && keyLower !== 'z' && keyLower !== 'y')) {
                        e.preventDefault();
                    }
                    if (!isInput && dotNetHelper) {
                        try {
                            dotNetHelper.invokeMethodAsync('OnGlobalKeyDown', keyLower, true, !!e.shiftKey);
                        } catch (err) { }
                    }
                }
            } else if (!isInput && dotNetHelper) {
                if (e.key === 'Delete' || e.key === 'Backspace' || e.key === 'Escape' ||
                    keyLower === 'r' || keyLower === 't' || keyLower === 's' || keyLower === 'v' || keyLower === 'j' ||
                    e.key === '+' || e.key === '=' || e.key === '-' || e.key === '0') {
                    e.preventDefault();
                    try {
                        dotNetHelper.invokeMethodAsync('OnGlobalKeyDown', e.key, false, false);
                    } catch (err) { }
                }
            }
        });
    },
    downloadFile: function (fileName, contentType, base64Data) {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    },

    openFile: function (acceptExtensions) {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = acceptExtensions;
            input.style.display = 'none';

            input.onchange = function () {
                if (!input.files || input.files.length === 0) {
                    resolve(null);
                    return;
                }
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = function () {
                    const bytes = new Uint8Array(reader.result);
                    let binary = '';
                    const len = bytes.byteLength;
                    const chunk = 8192;
                    for (let i = 0; i < len; i += chunk) {
                        binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, len)));
                    }
                    const base64 = btoa(binary);
                    resolve({
                        fileName: file.name,
                        base64Content: base64
                    });
                };
                reader.onerror = function () {
                    resolve(null);
                };
                reader.readAsArrayBuffer(file);
            };

            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        });
    },

    getPlatformInfo: function () {
        const ua = navigator.userAgent || '';
        const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(ua) && !('ontouchend' in document);
        const isIPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isIOS = /iPhone|iPod/.test(ua) || isIPad;
        const isWindows = /Win32|Win64|Windows|WinCE/.test(ua);
        const isLinux = /Linux/.test(ua) && !/Android/.test(ua);

        let osName = 'Web Browser';
        let osVersion = '';
        let icon = '⚡';

        if (isMac) {
            icon = '🍏';
            osName = 'macOS';
            const match = ua.match(/Mac OS X (\d+[._]\d+([._]\d+)?)/);
            if (match) osVersion = match[1].replace(/_/g, '.');
        } else if (isIPad) {
            icon = '📱';
            osName = 'iPadOS';
            const match = ua.match(/OS (\d+[._]\d+)/);
            if (match) osVersion = match[1].replace(/_/g, '.');
        } else if (isWindows) {
            icon = '🪟';
            osName = 'Windows';
            if (/NT 10\.0/.test(ua)) osVersion = '11 / 10';
        } else if (isLinux) {
            icon = '🐧';
            osName = 'Linux';
        }

        const isApple = isMac || isIPad || isIOS;
        const hasHardwareKeyboard = window.matchMedia && window.matchMedia('(pointer: fine)').matches && !isIPad;

        return {
            platformName: osName,
            osVersionDisplay: osVersion ? `${osName} ${osVersion}` : osName,
            icon: icon,
            isApple: isApple,
            isTablet: isIPad,
            isHardwareKeyboardAttached: isApple && !isIPad ? true : !!hasHardwareKeyboard,
            keyboardStatus: (isApple && !isIPad) ? 'Apple Keyboard Active' : (isIPad ? (hasHardwareKeyboard ? 'Hardware Keyboard Connected' : 'Touch / On-Screen Keyboard') : 'Keyboard Active')
        };
    }
};
