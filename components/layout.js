import React, { useRef, useMemo, useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import Paper from '@material-ui/core/Paper';

import Element from '@/components/elements/element';
import styles from '@/styles/layout.module.scss';

export default function Layout({cols, margin, bucket}) {
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

  function handleLayoutChange(_layout) {
    const updated = layout.map(l => {
      const element = _layout.find(e => e.i === l.i);
      return {
        ...l,
        x: element.x,
        y: element.y,
        w: element.w,
        h: element.h,
      }
    });
    setLayout(updated);
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
    console.log(cols, margin, bucket);

    const nodes = bucket.nodes.map(n => ({
      i: n.id,
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
      drop: n.drop,
    }));
    
    setLayout(
      nodes
    );
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
            <Paper key={e.i} className={styles.item} elevation={4}>
              <Element type={e.drop.type} {...e} />
            </Paper>
          ))}
        </GridLayout>
      )}
    </div>
  );
}