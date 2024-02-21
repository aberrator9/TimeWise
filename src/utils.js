Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function isTomorrow(today, day) {
    return day - today === 1 || day - today === -6;
}

function HHMM(date) {
    return date && typeof date.getMonth === 'function' 
        ? date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
        : '00:00';
}

function convertTo12Hr(timeStr) {
    const split = timeStr.split(':');

    let hrs = parseInt(split[0]).clamp(0, 24)
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs === 0 ? 12 : hrs > 12 ? hrs - 12 : hrs;
    
    const mins = parseInt(split[1]).clamp(0, 59).toString().padStart(2, '0')

    return `${hrs}:${mins} ${ampm}`;
}

export { isTomorrow, HHMM, convertTo12Hr }