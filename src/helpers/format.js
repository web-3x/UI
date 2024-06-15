import moment from "moment"

export function formatNumber(value, minFraction = 0, maxFraction = 3 ){
    try {
        var formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: minFraction,
            maximumFractionDigits: maxFraction
        });
        return formatter.format(value);
    } catch (error) {
        console.log(error)
        return value
    }
}

export function formatDateTime(time, format="YYYY-MM-DD HH:mm:ss") {
    return moment(time).utcOffset("Asean/Ho_Chi_Minh").format(format)
}

export function formatTransactionStatus(value) {
    switch (value) {
        case 0:
            return 'Chờ xử lý'
        case 1:
            return 'Thành công'
        case 2:
            return 'Thất bại'
        case "all":
            return 'Tất cả'
        default:
            return 'N/A'
    }
}