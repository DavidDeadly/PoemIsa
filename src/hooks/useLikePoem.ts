import { useLikes } from '@/hooks/useLikes';
import { usePoemsStore } from '@/hooks/usePoemsStore';

export const useLikePoem = ({
  likes = [],
  poemId
}: {
  likes?: string[];
  poemId?: string;
}) => {
  const { likePoem, unlikePoem } = usePoemsStore();
  const { isLiked, numLikes, toggleLike } = useLikes({
    likes,
    idToLike: poemId,
    doOnLike: likePoem,
    doOnUnlike: unlikePoem
  });

  return {
    isLiked,
    numLikes,
    toggleLike
  };
};
