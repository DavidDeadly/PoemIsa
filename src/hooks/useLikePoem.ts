import { useLikes } from '@/hooks/useLikes';
import { likePoem, unlikePoem } from '@/services/Poems';

export const useLikePoem = ({
  likes = [],
  poemId
}: {
  likes?: string[];
  poemId?: string;
}) => {
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
