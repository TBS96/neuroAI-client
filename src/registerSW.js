import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('🔄 New version available. Reload now?')) {
            updateSW(true); // Force reload and apply new SW
        }
    },
    onOfflineReady() {
        console.log('App is ready to work offline');
    }
});