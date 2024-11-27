export function formatTime(time: number): string {
    return String(time).length > 1 ? `${time}` : `0${time}`;
}

export function getSeconds(ms: number): number {
    return ms % 60;
}

export function getMinutes(ms: number): number {
    return Math.floor(ms / 60);
}