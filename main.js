import * as fs from 'fs';
import * as readline from 'readline';

import config from './config.js'
import { errorHandler, countUniqueItems, getMostCommon, getDirectoryName, getFilteredFileNames } from './utils.js'

const DIRECTORY_NAME = process.env.DIRECTORY ? process.env.DIRECTORY : config.DIRECTORY_NAME
const PARSE_HIDDEN = process.env.PARSE_HIDDEN

const parseFile = (file, directoryName) => {
    return new Promise((res, rej) => {
        try {
            const ips = []
            const urls = []
            const rd = readline.createInterface({
                input: fs.createReadStream(directoryName + file),
                output: process.stdout,
                terminal: false
            })
            rd.on('line', ((line) => {
                const ip = line.match(config.IP_REGEXP)
                if (ip && ip.length > 0) {
                    ips.push(ip[0])
                }
                const url = line.substring(
                    line.indexOf("GET") + 4,
                    line.lastIndexOf(" HTTP")
                );
                urls.push(url)
            }))
            rd.on('close', (() => {
                res({
                    file,
                    uniqueIps: countUniqueItems(ips),
                    mostActiveIpd: getMostCommon(ips),
                    mostVisitedUrl: getMostCommon(urls)
                })
            }))
        } catch (err) {
            rej(err)
        }
    })
}

const getFileStatistics = async (filesToCheck, directoryName) => {
    const statistics = []
    for await (const file of filesToCheck) {
        statistics.push(await parseFile(file, directoryName))
    }
    return statistics
}

const main = async () => {
    const directoryName = getDirectoryName(DIRECTORY_NAME)
    try {
        const fileNames = getFilteredFileNames(fs.readdirSync(directoryName), PARSE_HIDDEN)
        const statistics = await getFileStatistics(fileNames, directoryName)
        console.log("STATISTICS:", statistics)
    } catch (err) {
        errorHandler(err)
    }
}

main()