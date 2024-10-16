export function stringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split("-");
    const dateObject = new Date(`${year}-${month}-${day}`);
    return dateObject;
}