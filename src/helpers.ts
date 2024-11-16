export function formatTime(time: number): string {
    return String(time).length > 1 ? `${time}` : `0${time}`;
}