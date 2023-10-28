export const formatTime = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
