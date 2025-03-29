/**
 * Contains functions to call MTR API and return data around train lines etc. 
 * with both web & Node.JS compatibility
 */

/**
 * 
 * @param {string} line 
 * @param {string} station 
 * @returns {import('./types').MtrResponse}
 */
export const fetchData = async (line, station) => {
    const response = await fetch(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`);
    return response.json();
}

/**
 * 
 * @param {import('./types').MtrResponse} data 
 * @param {string} line 
 * @param {string} station 
 * @param {'UP' | 'DOWN'} direction 
 */
export const getAverages = (data, line, station, direction) => {
    const mtrRoute = data.data[`${line}-${station}`];
    const ups = mtrRoute[direction];
    const destinations = {};

    for (const up of ups){
        if (destinations[up.dest] === undefined){
            destinations[up.dest] = [];
        }
    
        destinations[up.dest].push(up.time);
    };
    
    for (const dst of Object.keys(destinations).sort()){
        if (destinations[dst].length === 0){
            continue;
        }
    
        let base = new Date(destinations[dst][0]);
    
        const intervals = destinations[dst].map(element => {
            const d = new Date(element);
            let interval = d.getTime() - base.getTime();
            base = d ;
            return interval;
        });
    
        console.log(`${mtrRoute.curr_time},${station}-${dst} (${direction}),${calculateAverage(intervals)}`);
    }
}

/**
 * 
 * @param {number[]} intervals 
 * @returns {string | number}
 */
function calculateAverage(intervals){
    const final = intervals.reduce((acc, current) => {
        if (current !== 0){
            acc.sum += current;
            acc.count++;
        }

        return acc;
    }, {
        sum: 0,
        count: 0,
    });

    if (final.count === 0){
        return 'N/A';
    }

    return (final.sum / final.count) / (1000);
}
