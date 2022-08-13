import config from './config.js'

export const errorHandler = (error) => {
    console.log('Error parsing log: ', error)
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
        return config.DIRECTORY_NAME + '/'
    }

    try {
        if (dirName.endsWith('/')) {
            return dirName
        } else {
            return dirName + '/'
        }
    } catch (err) {
        return config.DIRECTORY_NAME + '/'
    }
}

export const getFilteredFileNames = (nameArray, parseHidden = false) => {
    return parseHidden ? nameArray : nameArray.filter(name => !name.startsWith('.'))
}