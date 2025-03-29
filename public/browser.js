import { fetchData, getAverages } from './index.mjs'

window.fetchData = fetchData;
window.getAverages = getAverages;

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
        line: 'EAL',
        sta: 'SHT',
        direction: 'UP'
    },
    {
        line: 'EAL',
        sta: 'UNI',
        direction: 'DOWN'
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
];

const stringToColour = (str) => {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }

async function getMultiple(){

    /**
     * @type {import('./types').FrequencyData[]}
     */

    // lets hoe i don't get ratelimited by MTR :pray:
    const dataPromises = routesToGet.map(async(route) => {
        const data = await fetchData(route.line, route.sta);
        const avgs = getAverages(data, route.line, route.sta, route.direction);
        return avgs;
    });

    const averages = (await Promise.all(dataPromises)).flat();
    averages.sort((a, b) => {
        if (a.line === b.line){
            if (a.station === b.station){
                return a.destination < b.destination
            }

            return a.station < b.station
        }

        return a.line < b.line
    });

    if (data === undefined || data.length !== averages.length + 1){
        data = [];
        for (let i = 0; i < averages.length + 1; i++){
            data.push([]);
        }
    }

    if (uplot.series.length !== data.length){
        console.log(`length mismatch, gonna reset series`);
        for (let i = 1; i < uplot.series.length; i++){
            uplot.delSeries(1);
        }
    }

    if (initialFlag === true || uplot.series.length !== data.length){
        for (let i = 0; i < averages.length; i++){
            const avg = averages[i];
            const label = `${avg.station} - ${avg.destination} (${avg.direction})`;
            uplot.addSeries({
                show: true,
                spanGaps: false,
                label: label,
                value: (self, rawValue) => rawValue,
                width: 1,
                stroke: stringToColour(label),
            })
        }

        initialFlag = false;
    }

    data[0].push((Date.now() / 1000).toFixed(0));

    for (let i = 0; i < averages.length; i++){
        data[i + 1].push(averages[i].average);
    }
    
    uplot.setData(data);
}

window.getMultiple = getMultiple;
getMultiple();
