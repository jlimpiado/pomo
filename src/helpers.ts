export function formatTime(time: number): string {
    return String(time).length > 1 ? `${time}` : `0${time}`;
}

export function getSeconds(seconds: number): number {
    return seconds % 60;
}

export function getMinutes(seconds: number): number {
    return Math.floor(seconds / 60);
}

export function minutesToSeconds(minutes: number): number {
    return minutes * 60;
}