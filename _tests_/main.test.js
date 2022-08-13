import { main } from '../main.js'

const testOneMockData = [{ "file": "testlog.log", "mostActiveIpd": "168.41.191.40", "mostVisitedUrl": "http://example.net/faq/", "uniqueIps": 3 }]
const testTwoMockData = [
    {
        "file": 'log1.log',
        "uniqueIps": 11,
        "mostActiveIpd": '168.41.191.40',
        "mostVisitedUrl": '/docs/manage-websites/'
    }
]

test('Read log from testlogs map', async () => {
    const data = await main('testlogs')
    expect(data).toEqual(testOneMockData)
})

test('Read files from default "logs" map', async () => {
    const data = await main()
    expect(data).toEqual(testTwoMockData)
})