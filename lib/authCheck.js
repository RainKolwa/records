import { getSession } from 'next-auth/react';

export default async function authCheck({ req, userId }) {
  const session = await getSession({ req });
  if (session?.user?.id !== userId.toString()) {
    throw new Error('User not authorized');
  }
}
