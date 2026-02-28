import { useState, useEffect } from 'react';

const STORAGE_KEY = 'theme-preference';

/**
 * useTheme — 管理全站主題切換
 *
 * 策略：
 *   - 深色主題 (dark) 為預設，不在 <html> 設定屬性
 *   - 淺色主題 (light) 時設定 [data-theme="light"]
 *
 * 優先順序：localStorage > prefers-color-scheme > 預設 (dark)
 */
function useTheme() {
    const getInitialTheme = () => {
        // 1. 讀取 localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;

        // 2. 讀取系統偏好
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        // 3. 預設深色
        return 'dark';
    };

    const [theme, setTheme] = useState(() => {
        // SSR-safe：只在 client 執行
        if (typeof window === 'undefined') return 'dark';
        return getInitialTheme();
    });

    // 每次 theme 變化時，更新 <html> 的 data-theme 屬性
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
}

export default useTheme;
