import { useEffect, useState } from 'react';
import { useNotify, useUser } from '@/hooks';

type UseLikes = {
  likes: string[];
  idToLike?: string;
  doOnLike: (idToLike: string, userId: string) => Promise<any>;
  doOnUnlike: (idToLike: string, userId: string) => Promise<any>;
};

export const useLikes = ({
  likes,
  idToLike,
  doOnLike,
  doOnUnlike
}: UseLikes) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numLikes, setNumLikes] = useState<number>(0);
  const { user } = useUser();
  const notify = useNotify();

  const unlike = () => {
    setIsLiked(false);
    setNumLikes(num => num - 1);
  };

  const like = () => {
    setIsLiked(true);
    setNumLikes(num => num + 1);
  };

  const toggleLike = () => {
    const userId = user?.uid;
    if (!userId || !idToLike) return null;

    if (isLiked) {
      unlike();
      return doOnUnlike(idToLike, userId).catch(err => {
        like();
        notify.error('Hubo un error al romper corazón.');
        console.log('Error unliking post: ', err.message);
      });
    }

    like();
    return doOnLike(idToLike, userId).catch(err => {
      unlike();
      notify.error('Hubo un error al entregar tu corazón .');
      console.log('Error liking post: ', err.message);
    });
  };

  useEffect(() => {
    if (!user?.uid) return;

    const alreadyLiked = likes.includes(user?.uid);

    setIsLiked(alreadyLiked);
    setNumLikes(likes.length);
  }, [likes, user]);

  return {
    isLiked,
    numLikes,
    toggleLike
  };
};
