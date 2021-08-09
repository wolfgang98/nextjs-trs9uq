import Head from 'next/head';
import { useRef, useMemo } from 'react';

import Layout from '../components/layout';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <nav />
      <div className={styles.bar}>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          onDragStart={e => e.dataTransfer.setData('text/plain', '')}
        >
          DRAG
        </div>
      </div>
      <div className={styles.content}>
        <Layout className={styles.layout} cols={3} margin={10} />
      </div>
    </div>
  );
}
