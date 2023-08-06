import axios from "axios";
import { url_main } from "../components/env";

export const timeAgo = (timestamp: string) => {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDifference < minute) {
        return 'Now';
    } else if (timeDifference < hour) {
        const minutesAgo = Math.floor(timeDifference / minute);
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < day) {
        const hoursAgo = Math.floor(timeDifference / hour);
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < month) {
        const daysAgo = Math.floor(timeDifference / day);
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < year) {
        const monthsAgo = Math.floor(timeDifference / month);
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else {
        const yearsAgo = Math.floor(timeDifference / year);
        return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
    }
}


interface TimestampObj {
    createdAt: string;
}
export const compareTimestamps = (a: TimestampObj, b: TimestampObj) => {
    const timestampA = new Date(a.createdAt);
    const timestampB = new Date(b.createdAt);
    return timestampB.getTime() - timestampA.getTime();
};

export const checkPrivileges = async () => {
    try {
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        };
        await axios.get(url_main + 'admin', { headers });
        return true;
    } catch (err) {
        return false;
    }
}