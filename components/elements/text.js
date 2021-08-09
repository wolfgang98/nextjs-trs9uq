import styles from '../../styles/elements/text.module.scss';

export default function Text(props) {
  const { content } = props;

  return <div className={styles.text}>{content.text}</div>;
}
