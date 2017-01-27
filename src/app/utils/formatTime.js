export function formatTime(seconds){
    seconds = parseFloat(seconds);
    if (Number.isNaN(seconds)) {
        return '00:00';
    }
    const minuteString = ('00' + Math.floor(seconds / 60).toString()).slice(-2);
    const secondString = ('00' + Math.round(seconds % 60).toString()).slice(-2);
    return minuteString + ':' + secondString;
}