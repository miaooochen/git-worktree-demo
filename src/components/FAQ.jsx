import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="faq-title" className="section-header__title">
                        您可能想知道的一切
                    </h2>
                    <p className="section-header__desc">
                        找不到答案？歡迎隨時與我們的支援團隊聯繫。
                    </p>
                </div>

                <div className="faq__list" role="list">
                    {FAQ_ITEMS.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
                                role="listitem"
                            >
                                <button
                                    className="faq__question"
                                    onClick={() => handleToggle(item.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`${item.id}-answer`}
                                    id={`${item.id}-btn`}
                                >
                                    <span className="faq__question-text">{item.question}</span>
                                    <span className="faq__icon" aria-hidden="true">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    id={`${item.id}-answer`}
                                    className="faq__answer"
                                    role="region"
                                    aria-labelledby={`${item.id}-btn`}
                                >
                                    <div className="faq__answer-inner">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
