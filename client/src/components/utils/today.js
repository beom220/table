function useFullDate(value){
    const year = new Date(value).getFullYear();
    const month = ("0" + (1 + new Date(value).getMonth())).slice(-2);
    const date = ("0" + new Date(value).getDate()).slice(-2);
    return `${year}.${month}.${date}`;
}


function useTimeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 7) {
        return `${betweenTimeDay}일전`;
    }

    const betweenTimeWeek = Math.floor(betweenTime / 60 / 24 / 7);
    if (betweenTimeWeek < 365 / 7 ) {
        return `${betweenTimeWeek}주전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export { useTimeForToday, useFullDate}