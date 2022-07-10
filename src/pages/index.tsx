import { GetServerSideProps } from 'next';
import CommonMenu from '../components/common/CommonMenu';
import prisma from '../lib/prisma';
import Home from '../components/home/Home';

type Props = {
  users: any;
};

const index = (props: Props) => {
  // オブジェクトの昇順ソート
  const sortUsers = props.users.sort(function (a: any, b: any) {
    return a._count.post + a._count.comment + a._count.like >
      b._count.post + b._count.comment + b._count.like
      ? -1
      : 1;
  });

  return (
    <CommonMenu>
      <Home users={sortUsers} />
    </CommonMenu>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.user.findMany({
    include: {
      _count: {
        select: { post: true, like: true, bookmark: true, comment: true },
      },
    },
  });

  const users = JSON.parse(JSON.stringify(data));
  return {
    props: { users },
  };
};
