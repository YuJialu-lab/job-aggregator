module.exports = {
    formatDate: (dateStr) => {
        // 将平台日期字符串转为 JS Date
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    },
    isNewJob: (date) => {
        if (!date) return false;
        const diff = Date.now() - date.getTime();
        return diff < 24 * 60 * 60 * 1000; // 24h 内
    }
};
