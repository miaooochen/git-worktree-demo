import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie-consent-status';

export function useCookieConsent() {
  const [status, setStatus] = useState(null); // null = not decided, 'accepted', 'declined'
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStatus(saved);
      setVisible(false);
    } else {
      // 頁面載入後 1 秒內顯示 Banner
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (decision) => {
    setAnimatingOut(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, decision);
      setStatus(decision);
      setVisible(false);
      setAnimatingOut(false);
    }, 400); // 與 CSS transition 時間同步
  };

  const accept = () => dismiss('accepted');
  const decline = () => dismiss('declined');

  return { status, visible, animatingOut, accept, decline };
}
