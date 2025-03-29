/**
 * This is a Node.JS program to scrape data for various line/stations and log averages
 */
import { fetchData, getAverages } from './public/index.mjs'

const routesToGet = [
    {
        line: 'ISL',
        sta: 'ADM',
        direction: 'UP'
    },
    {
        line: 'EAL',
        sta: 'ADM',
        direction: 'UP'
    },
    {
        line: 'SIL',
        sta: 'ADM',
        direction: 'UP'
    },
    {
        line: 'TKL',
        sta: 'TIK',
        direction: 'UP'
    },
]

for (const route of routesToGet){
    const data = await fetchData(route.line, route.sta);
    getAverages(data, route.line, route.sta, route.direction);

    setInterval(async () => {
        const data = await fetchData(route.line, route.sta);
        getAverages(data, route.line, route.sta, route.direction);
    }, 1000 * 60);
}