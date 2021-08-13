import TextElement from '@/components/elements/text';
import TabsElement from '@/components/elements/tabs';

const elements = {
  text: TextElement,
  tabs: TabsElement
}

export default function Element(props) {
  const {type, ...rest} = props;
  const Component = elements[type];

  return (
    <Component {...rest} />
  );
}