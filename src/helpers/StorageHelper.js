export function getLocalStorageData(key) {
    let data = localStorage.getItem(key);

    if (data !== null) {
        return (data);
    } else {
        return null;
    }
}