let notifyAudio: HTMLAudioElement | null = null;

export function playSound(NOTIFY_SOUND_SRC: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!notifyAudio) {
      notifyAudio = new Audio(NOTIFY_SOUND_SRC);
      notifyAudio.preload = "auto";
    }

    notifyAudio.currentTime = 0;
    void notifyAudio.play().catch(() => {
      // Браузер может заблокировать autoplay до первого действия пользователя
    });
  } catch {
    // ignore playback errors
  }
}
