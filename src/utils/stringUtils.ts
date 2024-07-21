export const capitalizeEveryWord = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const getFirstLastNameFromDisplayName = (displayName: string): {firstName: string, lastName: string} => {
    const nameArray = displayName.split("$$$");
    return { firstName: nameArray[0], lastName: nameArray[1] };
}