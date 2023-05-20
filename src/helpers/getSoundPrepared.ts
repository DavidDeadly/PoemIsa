import { Player } from '@react-native-community/audio-toolkit';
import { Observable } from 'rxjs';

export const getSoundPrepared = (path: string) => {
  return new Observable<Player>(subscriber => {
    const sound = new Player(path);

    sound.prepare(preparedError => {
      if (preparedError) {
        subscriber.error(preparedError);
        return;
      }
      subscriber.next(sound);
      subscriber.complete();
    });
  });
};
