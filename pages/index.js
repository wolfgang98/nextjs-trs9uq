import Layout from '@/components/layout';
import styles from '@/styles/home.module.scss';
import { getBucketById } from '@/lib/api';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

export default function Home({ bucket }) {
  return (
    <div className={styles.home}>
      <div className={styles.nav}>
        <IconButton>
          <HomeIcon />
        </IconButton>
      </div>
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
        <Layout className={styles.layout} cols={3} margin={10} bucket={bucket} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const bucket = (await getBucketById('1') || []);
  return {
    props: { bucket },
  }
}