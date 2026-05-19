(function () {
    const player      = document.getElementById('player');
    const vid         = document.getElementById('vid');
    const clickZone   = document.getElementById('click-zone');
    const uiOverlay   = document.getElementById('ui-overlay');
    const ppRipple    = document.getElementById('pp-ripple');
    const ppRippleIco = ppRipple.querySelector('svg');
    const spinner     = document.getElementById('spinner');
    const progWrap    = document.getElementById('progress-wrap');
    const progFill    = document.getElementById('progress-fill');
    const timeDisp    = document.getElementById('time-display');
    const btnPlay     = document.getElementById('btn-play');
    const icoPlay     = document.getElementById('ico-play');
    const icoPause    = document.getElementById('ico-pause');
    const btnRew      = document.getElementById('btn-rew');
    const btnFwd      = document.getElementById('btn-fwd');
    const btnVol      = document.getElementById('btn-vol');
    const icoVol      = document.getElementById('ico-vol');
    const icoMute     = document.getElementById('ico-mute');
    const volSlider   = document.getElementById('vol-slider');
    const btnSpeed    = document.getElementById('btn-speed');
    const btnFs       = document.getElementById('btn-fs');
    const icoFsEnter  = document.getElementById('ico-fs-enter');
    const icoFsExit   = document.getElementById('ico-fs-exit');
    const ringL       = document.getElementById('ring-l');
    const ringR       = document.getElementById('ring-r');
    
    const HIDE_DELAY  = 3000;
    let hideTimer = null;
    let uiVisible = true;
    let isSeeking = false;
    let lastTap   = 0;
    let tapTimer  = null;
    
    /* ── FORMAT TIME ── */
    function fmt(s) {
        if (!isFinite(s) || s < 0) return '0:00';
        const h   = Math.floor(s / 3600);
        const m   = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
        return `${m}:${String(sec).padStart(2,'0')}`;
    }
    
    /* ── PROGRESS ── */
    vid.addEventListener('timeupdate', () => {
        if (isSeeking || !vid.duration) return;
        const pct = (vid.currentTime / vid.duration) * 100;
        progFill.style.width = pct + '%';
        timeDisp.textContent = fmt(vid.currentTime) + ' / ' + fmt(vid.duration);
    });
    vid.addEventListener('loadedmetadata', () => {
        timeDisp.textContent = '0:00 / ' + fmt(vid.duration);
    });
    
    /* ── PP RIPPLE ── */
    function showRipple(nowPlaying) {
        ppRippleIco.innerHTML = nowPlaying
        ? '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>'
        : '<path d="M8 5v14l11-7z"/>';
        ppRipple.classList.remove('show');
        void ppRipple.offsetWidth; // reflow trigger
        ppRipple.classList.add('show');
        ppRipple.addEventListener('animationend', () => ppRipple.classList.remove('show'), { once: true });
    }
    
    /* ── PLAY / PAUSE ── */
    function syncPlayUI() {
        const playing = !vid.paused && !vid.ended;
        icoPlay.style.display  = playing ? 'none' : '';
        icoPause.style.display = playing ? '' : 'none';
    }
    function togglePlay() {
        vid.paused || vid.ended ? vid.play() : vid.pause();
    }
    
    vid.addEventListener('play',  () => { syncPlayUI(); showRipple(true);  resetHideTimer(); });
    vid.addEventListener('pause', () => { syncPlayUI(); showRipple(false); showUI(); clearTimeout(hideTimer); });
    vid.addEventListener('ended', () => { syncPlayUI(); showUI(); clearTimeout(hideTimer); });
    btnPlay.addEventListener('click', e => { e.stopPropagation(); togglePlay(); });
    
    /* ── UI VISIBILITY ── */
    function showUI() {
        uiVisible = true;
        uiOverlay.classList.remove('hidden');
        player.classList.add('show-cursor');
    }
    function hideUI() {
        if (isSeeking) return;
        uiVisible = false;
        uiOverlay.classList.add('hidden');
        player.classList.remove('show-cursor');
    }
    function resetHideTimer() {
        clearTimeout(hideTimer);
        if (!vid.paused) hideTimer = setTimeout(hideUI, HIDE_DELAY);
    }
    function onActivity() { showUI(); resetHideTimer(); }
    
    player.addEventListener('mousemove',  onActivity);
    player.addEventListener('touchstart', onActivity, { passive: true });
    
    /* ── CLICK ZONE (single / double tap) ── */
    clickZone.addEventListener('click', e => {
        const now  = Date.now();
        const rect = player.getBoundingClientRect();
        const x    = (e.clientX - rect.left) / rect.width;
        
        if (now - lastTap < 300) {
            clearTimeout(tapTimer);
            if      (x < 0.35) { seek(-10); showSeekRing('l'); }
            else if (x > 0.65) { seek( 10); showSeekRing('r'); }
            lastTap = 0;
        } else {
            lastTap = now;
            tapTimer = setTimeout(() => {
                if (uiVisible) togglePlay();
                else           onActivity();
            }, 300);
        }
    });
    
    /* ── SEEK ── */
    function seek(delta) {
        vid.currentTime = Math.max(0, Math.min(vid.duration || 0, vid.currentTime + delta));
        onActivity();
    }
    function seekFromEvent(e) {
        const rect = progWrap.getBoundingClientRect();
        const x    = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const pct  = Math.max(0, Math.min(1, x / rect.width));
        vid.currentTime = pct * (vid.duration || 0);
        progFill.style.width = (pct * 100) + '%';
    }
    progWrap.addEventListener('mousedown', e => {
        isSeeking = true; seekFromEvent(e); showUI();
        const mv = e2 => seekFromEvent(e2);
        const up = ()  => { isSeeking = false; document.removeEventListener('mousemove', mv); resetHideTimer(); };
        document.addEventListener('mousemove', mv);
        document.addEventListener('mouseup', up, { once: true });
    });
    progWrap.addEventListener('touchstart', e => { isSeeking = true; seekFromEvent(e); }, { passive: true });
    progWrap.addEventListener('touchmove',  seekFromEvent, { passive: true });
    progWrap.addEventListener('touchend',   () => { isSeeking = false; resetHideTimer(); });
    
    /* ── SEEK RINGS ── */
    function showSeekRing(side) {
        const ring = side === 'l' ? ringL : ringR;
        const rect = player.getBoundingClientRect();
        ring.style.left = (side === 'l' ? rect.width * 0.2 : rect.width * 0.8) + 'px';
        ring.style.top  = (rect.height / 2) + 'px';
        ring.classList.remove('pop');
        void ring.offsetWidth;
        ring.classList.add('pop');
        ring.addEventListener('animationend', () => ring.classList.remove('pop'), { once: true });
    }
    
    btnRew.addEventListener('click', e => { e.stopPropagation(); seek(-10); showSeekRing('l'); });
    btnFwd.addEventListener('click', e => { e.stopPropagation(); seek( 10); showSeekRing('r'); });
    
    /* ── VOLUME ── */
    function updateVolIcon() {
        const muted = vid.muted || +volSlider.value === 0;
        icoVol.style.display  = muted ? 'none' : '';
        icoMute.style.display = muted ? '' : 'none';
    }
    function toggleMute() {
        if (+volSlider.value > 0) {
            volSlider.dataset.prev = volSlider.value;
            volSlider.value = 0; vid.volume = 0;
        } else {
            volSlider.value = volSlider.dataset.prev || 100;
            vid.volume = volSlider.value / 100;
        }
        updateVolIcon();
    }
    btnVol.addEventListener('click', e => { e.stopPropagation(); toggleMute(); });
    volSlider.addEventListener('input', () => { vid.volume = volSlider.value / 100; updateVolIcon(); });
    
    /* ── BUFFERING ── */
    vid.addEventListener('waiting', () => spinner.classList.add('visible'));
    vid.addEventListener('playing', () => spinner.classList.remove('visible'));
    vid.addEventListener('canplay', () => spinner.classList.remove('visible'));
    
    /* ── SPEED ── */
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let speedIdx = 2;
    btnSpeed.addEventListener('click', e => {
        e.stopPropagation();
        speedIdx = (speedIdx + 1) % speeds.length;
        vid.playbackRate = speeds[speedIdx];
        btnSpeed.title = speeds[speedIdx] + '×';
        const t = document.createElement('div');
        t.textContent = speeds[speedIdx] + '×';
        Object.assign(t.style, {
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            color:'#fff', fontSize:'26px', fontWeight:'700',
            background:'rgba(0,0,0,0.6)', padding:'10px 22px',
            borderRadius:'8px', pointerEvents:'none', zIndex:'50',
            animation:'ripplePop 0.7s ease-out forwards'
        });
        player.appendChild(t);
        setTimeout(() => t.remove(), 700);
        onActivity();
    });
    
    /* ── FULLSCREEN ── */
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            (player.requestFullscreen || player.webkitRequestFullscreen || player.mozRequestFullScreen).call(player);
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen).call(document);
        }
    }
    document.addEventListener('fullscreenchange', () => {
        const fs = !!document.fullscreenElement;
        icoFsEnter.style.display = fs ? 'none' : '';
        icoFsExit.style.display  = fs ? '' : 'none';
        if (fs) tryLockLandscape();
    });
    btnFs.addEventListener('click', e => { e.stopPropagation(); toggleFullscreen(); onActivity(); });
    
    /* ── KEYBOARD ── */
    document.addEventListener('keydown', e => {
        onActivity();
        switch (e.code) {
            case 'Space': case 'KeyK': e.preventDefault(); togglePlay(); break;
            case 'ArrowLeft':  seek(-10); showSeekRing('l'); break;
            case 'ArrowRight': seek( 10); showSeekRing('r'); break;
            case 'ArrowUp':    vid.volume = Math.min(1, vid.volume+0.1); volSlider.value = vid.volume*100; updateVolIcon(); break;
            case 'ArrowDown':  vid.volume = Math.max(0, vid.volume-0.1); volSlider.value = vid.volume*100; updateVolIcon(); break;
            case 'KeyF': toggleFullscreen(); break;
            case 'KeyM': toggleMute(); break;
        }
    });
    
    /* ── BACK ── */
    document.getElementById('btn-back').addEventListener('click', e => { location.href = 'browse.html'; });
    
    /* ── LANDSCAPE LOCK ── */
    function tryLockLandscape() {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(() => {});
        }
    }
    // Browsers require a user gesture — lock on first interaction
    document.addEventListener('click',      tryLockLandscape, { once: true });
    document.addEventListener('touchstart', tryLockLandscape, { once: true, passive: true });
    
    /* ── LANDSCAPE HINT CLICK ── */
    const landscapeHint = document.getElementById('landscape-hint');
    landscapeHint.addEventListener('click', () => {
        tryLockLandscape();
        toggleFullscreen();
    });
    
    /* ── AUTO FULLSCREEN ON ROTATION ── */
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            const isLandscape = window.innerHeight < window.innerWidth;
            const isFullscreen = !!document.fullscreenElement;
            
            if (isLandscape && !isFullscreen && document.fullscreenElement === null) {
                // Hanya auto fullscreen jika user sudah dalam fullscreen sebelumnya
                if (player.fullscreenEnabled) {
                    (player.requestFullscreen || player.webkitRequestFullscreen || player.mozRequestFullScreen).call(player).catch(() => {});
                }
            } else if (!isLandscape && isFullscreen) {
                (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen).call(document);
            }
        }, 100);
    });
    
    /* ── INIT ── */
    syncPlayUI();
    updateVolIcon();
    showUI();
    
})();