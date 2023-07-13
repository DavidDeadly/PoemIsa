import { useLikes } from '@/hooks/useLikes';
import { usePoemsStore } from '@/hooks/usePoemsStore';

export const useLikePoem = ({
  usersLiked = [],
  poemId
}: {
  usersLiked?: string[];
  poemId?: string;
}) => {
  const { likePoem, unlikePoem } = usePoemsStore();
  const { isLiked, toggleLike } = useLikes({
    usersLiked,
    idToLike: poemId,
    doOnLike: likePoem,
    doOnUnlike: unlikePoem
  });

  return {
    isLiked,
    toggleLike
  };
};
