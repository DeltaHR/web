export default function formatTime(seconds: number): string {
    if (seconds < 60) {
        return `${seconds}s`;
      }
    
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
    
      const formattedHours = hours > 0 ? `${hours}h ` : '';
      const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}min ` : '';
      const formattedSeconds = remainingSeconds > 0 ? `${remainingSeconds}s` : '';
    
      return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
}