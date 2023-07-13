import { useEffect, useState } from 'react';
import { useNotify, useUser } from '@/hooks';

type UseLikes = {
  usersLiked: string[];
  idToLike?: string;
  doOnLike: (idToLike: string, userId: string) => Promise<void>;
  doOnUnlike: (idToLike: string, userId: string) => Promise<void>;
};

export const useLikes = ({
  usersLiked,
  idToLike,
  doOnLike,
  doOnUnlike
}: UseLikes) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { user } = useUser();
  const notify = useNotify();

  const unlike = (id: string, userId: string) => {
    setIsLiked(false);

    doOnUnlike(id, userId).catch(err => {
      like(id, userId);
      notify.error('Hubo un error al romper corazón.');
      console.log('Error unliking post: ', err.message);
    });
  };

  const like = (id: string, userId: string) => {
    setIsLiked(true);

    return doOnLike(id, userId).catch(err => {
      unlike(id, userId);
      notify.error('Hubo un error al entregar tu corazón .');
      console.log('Error liking post: ', err.message);
    });
  };

  const toggleLike = () => {
    const userId = user?.uid;
    if (!userId || !idToLike) return null;

    if (isLiked) {
      unlike(idToLike, userId);
      return;
    }

    like(idToLike, userId);
  };

  useEffect(() => {
    if (!user?.uid) return;

    const alreadyLiked = usersLiked.includes(user.uid);

    setIsLiked(alreadyLiked);
  }, [usersLiked, user]);

  return {
    isLiked,
    toggleLike
  };
};
