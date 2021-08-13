import { useState } from 'react';

import MTabs from '@material-ui/core/Tabs';
import MTab from '@material-ui/core/Tab';

// import styles from '../../styles/elements/text.module.scss';

export default function Tabs(props) {
  const [currentTab, setCurrentTab] = useState(0);

  function handleTabChange(event, newValue) {
    setCurrentTab(newValue);
  };

  console.log(props);

  return (
    <>
      TABS
      <MTabs value={currentTab} onChange={handleTabChange}>
        {/* { props.drop.map(d => {
          <MTab label="d.title"></MTab>
        })} */}
      </MTabs>
    </>
  );
}
