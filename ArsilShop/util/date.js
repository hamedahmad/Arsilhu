export function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: ('0' + date.getDate()).slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
}