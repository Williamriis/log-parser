export const errorHandler = (error) => {
    console.log(error)
}

export const countUniqueItems = (iterable) => {
    return new Set(iterable).size;
}

export const getMostCommon = (arr) => {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

export const getDirectoryName = (dirName) => {
    if (!dirName || typeof dirName !== 'string') {
        return 'logs/'
    }

    try {
        if (dirName.endsWith('/')) {
            return dirName
        } else {
            return dirName + '/'
        }
    } catch (err) {
        return DIRECTORY_NAME + '/'
    }
}

export const getFilteredFileNames = (nameArray, filterHidden = true) => {
    return !filterHidden ? nameArray : nameArray.filter(name => !name.startsWith('.'))
}