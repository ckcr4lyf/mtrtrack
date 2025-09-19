import { fetchData, getAverages, getTimes } from '../public/index.mjs'

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
    const times = getTimes(data, route.line, route.sta, route.direction);

    for (const time of times){
      console.log(`${time.route},${time.time}`);
    }

    setInterval(async () => {
      const data = await fetchData(route.line, route.sta);
      const times = getTimes(data, route.line, route.sta, route.direction);
  
      for (const time of times){
        console.log(`${time.route},${time.time}`);
      }
    }, 1000 * 60);
}