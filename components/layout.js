import { useRef, useMemo, useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';

import Text from './elements/text';
import styles from '../styles/layout.module.scss';

export default function Layout(props) {
  const { cols, margin } = props;

  const container = useRef(null);

  const [layout, setLayout] = useState([]);
  const [size, setSize] = useState(null);

  const rowHeight = useMemo(() => size / cols, [size, cols]);
  const width = useMemo(() => size, [size, cols, margin]);

  function handleDrop(layout, layoutItem, _event) {
    const item = {
      i: String(layout.length),
      x: layoutItem.x,
      y: layoutItem.y,
      w: 1,
      h: 1
    };

    layout.pop();
    setLayout([...layout, item]);
    return false;
  }

  function handleLayoutChange(layout) {
    setLayout(layout);
    localStorage.setItem('layout', JSON.stringify(layout));
  }

  useEffect(() => {
    const update = () => {
      setSize(container.current?.clientWidth);
    };

    update();
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, [container]);

  useEffect(() => {
    if (!localStorage) return;
    const data = localStorage.getItem('layout');
    const parsed = JSON.parse(data);
    if (parsed) {
      setLayout(parsed);
    } else {
      setLayout([
        { i: 'a', x: 0, y: 0, w: 1, h: 1 },
        { i: 'b', x: 1, y: 0, w: 1, h: 1 },
        { i: 'c', x: 2, y: 0, w: 1, h: 1 }
      ]);
    }
  }, []);

  return (
    <div className={styles.container} ref={container}>
      {container.current && (
        <GridLayout
          className={styles.layout}
          layout={layout}
          cols={cols}
          rowHeight={rowHeight}
          width={width}
          margin={[margin, margin]}
          containerPadding={[0, 0]}
          isDroppable={true}
          onDrop={handleDrop}
          onLayoutChange={handleLayoutChange}
        >
          {layout.map(e => (
            <div key={e.i} className={styles.item}>
              <Text content={{ text: `${e.x}/${e.y}` }} />
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
}
