import * as fs from 'fs';
import * as readline from 'readline';

import config from './config.js'
import { errorHandler, countUniqueItems, getMostCommon, getDirectoryName, getFilteredFileNames } from './utils.js'

const DIRECTORY_NAME = config.DIRECTORY_NAME

const getFileStatistics = (filesToCheck, directoryName) => {

    return new Promise((res, rej) => {
        try {
            filesToCheck.forEach((fileName) => {
                const ips = []
                const urls = []
                const rd = readline.createInterface({
                    input: fs.createReadStream(directoryName + fileName),
                    output: process.stdout,
                    terminal: false
                })
                rd.on('line', ((line) => {
                    const ip = line.match(config.IP_REGEXP)
                    if (ip && ip.length > 0) {
                        ips.push(ip[0])
                    }
                    const url = line.substring(
                        line.indexOf("GET") + 3,
                        line.lastIndexOf("HTTP")
                    );
                    urls.push(url)
                }))
                rd.on('close', (() => {
                    res({
                        fileName,
                        uniqueIps: countUniqueItems(ips),
                        mostActiveIpd: getMostCommon(ips),
                        mostVisitedUrl: getMostCommon(urls)
                    })
                }))
            })
        } catch (err) {
            rej(err)
        }
    })
}

const execute = async (dirName = DIRECTORY_NAME) => {
    const directoryName = getDirectoryName(dirName)
    try {
        const fileNames = getFilteredFileNames(fs.readdirSync(directoryName))
        const statistics = await getFileStatistics(fileNames, directoryName)
        console.log("STATISTICS:", statistics)
    } catch (err) {
        errorHandler(err)
    }
}

execute()