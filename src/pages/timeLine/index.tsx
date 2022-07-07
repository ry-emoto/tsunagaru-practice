import { GetStaticProps } from 'next';
import { SWRConfig } from 'swr';
import prisma from '../../lib/prisma';
import CommonMenu from '../../components/common/CommonMenu';
import TimeLine from '../../components/timeLine/TimeLine';

type Props = {
  fallback: any;
};

const index = (props: Props) => {
  return (
    <SWRConfig value={props.fallback}>
      <CommonMenu>
        <TimeLine />
      </CommonMenu>
    </SWRConfig>
  );
};

export default index;

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.post.findMany({
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: { user: true },
  });
  const post = JSON.parse(JSON.stringify(data));
  return {
    props: {
      fallback: {
        '/api/post': post,
      },
    },
  };
};
