import { useCookieConsent } from '../hooks/useCookieConsent';

export default function CookieConsent() {
  const { visible, animatingOut, accept, decline } = useCookieConsent();

  if (!visible && !animatingOut) return null;

  return (
    <div
      className={`cookie-banner${animatingOut ? ' cookie-banner--exit' : ' cookie-banner--enter'}`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie 同意通知"
    >
      <div className="cookie-banner__inner">
        <div className="cookie-banner__content">
          <span className="cookie-banner__icon">🍪</span>
          <div className="cookie-banner__text">
            <p className="cookie-banner__title">我們使用 Cookie</p>
            <p className="cookie-banner__desc">
              我們使用 Cookie 來提升您的瀏覽體驗、分析網站流量，並提供個人化內容。
              您可以選擇接受所有 Cookie，或僅保留必要的功能性 Cookie。
            </p>
          </div>
        </div>
        <div className="cookie-banner__actions">
          <button
            id="cookie-decline-btn"
            className="btn btn--sm cookie-banner__btn-secondary"
            onClick={decline}
          >
            僅必要 Cookie
          </button>
          <button
            id="cookie-accept-btn"
            className="btn btn--sm btn--primary cookie-banner__btn-primary"
            onClick={accept}
          >
            接受所有 Cookie
          </button>
        </div>
      </div>
    </div>
  );
}
