import { GetServerSideProps } from 'next';
import CommonMenu from '../../components/common/CommonMenu';
import MyPage from '../../components/myPage/MyPage';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';

type Props = {
  user: any;
};

const index = (props: Props) => {
  return (
    <CommonMenu>
      <MyPage user={props.user} />
    </CommonMenu>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req });
  const data = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: {
      _count: {
        select: { post: true, like: true, bookmark: true, comment: true },
      },
    },
  });

  const user = JSON.parse(JSON.stringify(data));
  return {
    props: { user },
  };
};
