import { useCallback, useState } from 'react';
import { audioEngine } from '@/services/audioEngine';

export function useAudio() {
  const [sfxEnabled, setSfxEnabled] = useState(audioEngine.sfxEnabled);

  const initAudio = useCallback(async () => {
    await audioEngine.init();
  }, []);

  const toggleSfx = useCallback(async () => {
    await audioEngine.init();
    const next = audioEngine.toggle();
    audioEngine.toggleSfx(next);
    setSfxEnabled(next);
    return next;
  }, []);

  const playClick   = useCallback(async () => { await audioEngine.init(); audioEngine.click(); }, []);
  const playHover   = useCallback(async () => { await audioEngine.init(); audioEngine.hover(); }, []);
  const playCmd     = useCallback(async () => { await audioEngine.init(); audioEngine.cmd(); }, []);
  const playUnfurl  = useCallback(async () => { await audioEngine.init(); audioEngine.unfurl(); }, []);
  const playSuccess = useCallback(async () => { await audioEngine.init(); audioEngine.success(); }, []);
  const playFanfare = useCallback(async () => { await audioEngine.init(); audioEngine.fanfare(); }, []);

  return { sfxEnabled, initAudio, toggleSfx, playClick, playHover, playCmd, playUnfurl, playSuccess, playFanfare };
}
