'use client';
import { useState } from 'react';
import styles from './grimoire.module.css';

type Page = { id: string; content: JSX.Element };

export default function Grimoire({ pages }: { pages: Page[] }) {
  const [index, setIndex] = useState(0);

  const canPrev = index > 0;
  const canNext = index < pages.length - 1;

  return (
    <div className={styles.wrap}>
      <div className={styles.book}>
        {/* Couverture gauche */}
        <div className={`${styles.cover} ${styles.leftCover}`}>
          <div className={styles.title}>Sheet2Scene • Grimoire</div>
        </div>

        {/* Bloc pages */}
        <div className={styles.pages}>
          {pages.map((p, i) => {
            const open = i <= index;
            return (
              <div
                key={p.id}
                className={`${styles.page} ${open ? styles.open : ''}`}
                style={{ zIndex: 1000 - i }}
                onClick={() => setIndex(i)}
              >
                <div className={styles.paper}>
                  <div className={styles.inner}>{p.content}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Couverture droite */}
        <div className={`${styles.cover} ${styles.rightCover}`} onClick={() => canNext && setIndex(index + 1)}>
          <div className={styles.glyph}>✦</div>
        </div>
      </div>

      {/* Contrôles */}
      <div className={styles.controls}>
        <button className={styles.btn} disabled={!canPrev} onClick={() => setIndex(index - 1)}>← Page</button>
        <span className={styles.pageNo}>{index + 1} / {pages.length}</span>
        <button className={styles.btn} disabled={!canNext} onClick={() => setIndex(index + 1)}>Page →</button>
      </div>
    </div>
  );
}
