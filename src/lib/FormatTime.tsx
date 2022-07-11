import { format, parseISO } from 'date-fns';

type Props = {
  dateString: any;
};

const FormatTime = (props: Props) => {
  const date = parseISO(props.dateString);
  return (
    <time dateTime={props.dateString}>{format(date, 'yyyy/MM/dd HH:mm')}</time>
  );
};

export default FormatTime;
