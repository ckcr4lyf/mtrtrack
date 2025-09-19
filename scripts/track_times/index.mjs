import { fetchData, getAverages, getTimes } from '../../public/index.mjs'
import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'poiasd',
  password: process.env.POSTGRES_PASSWORD,
  database: 'poiasd'
});

await client.connect();

const routesToGet = [
    {
        line: 'ISL',
        sta: 'ADM',
        direction: 'UP'
    },
    // {
    //     line: 'EAL',
    //     sta: 'ADM',
    //     direction: 'UP'
    // },
    // {
    //   line: 'EAL',
    //   sta: 'UNI',
    //   direction: 'DOWN'
    // },
    // {
    //     line: 'SIL',
    //     sta: 'ADM',
    //     direction: 'UP'
    // },
    // {
    //     line: 'TKL',
    //     sta: 'TIK',
    //     direction: 'UP'
    // },
]

for (const route of routesToGet){
  await getAndInsertTimes(route);

    setInterval(async () => {
      await getAndInsertTimes(route);
    }, 1000 * 60);
}

async function getAndInsertTimes(route){
  const data = await fetchData(route.line, route.sta);
  const times = getTimes(data, route.line, route.sta, route.direction);
  console.log('\nCurrent time: ', new Date().toISOString());
  for (const time of times){
    // console.log(`${time.route},${time.time},${time.utcTime.getTime()}`);
    console.log(`[SEQ: ${time.seq}] Got time as: ${time.utcTime.toISOString()}`);
    await updateOrInsertTime(time);
  }
}


async function updateOrInsertTime(timeDetails){
  // const now = new Date();
  const min = new Date(timeDetails.utcTime.getTime() - 1000 * 30);
  const max = new Date(timeDetails.utcTime.getTime() + 1000 * 30);
  
  const result = await client.query('SELECT * FROM train_times WHERE route = $1 AND time BETWEEN $2 AND $3', [timeDetails.route, min, max]);
  if (result.rows.length > 0){
    console.log('Existing Record: ', result.rows);
  }
  
  if (result.rows.length === 0){
    const result2 = await client.query(`INSERT INTO train_times (route, time) VALUES ($1, $2)`, [timeDetails.route, timeDetails.utcTime]);
    console.log(`Inserted new record (Time: ${timeDetails.utcTime.toISOString()})`);
  } else {
    const result3 = await client.query(`UPDATE train_times SET time = $1 WHERE route = $2 AND time BETWEEN $3 AND $4`, [timeDetails.utcTime, timeDetails.route, min, max]);
    console.log(`Updated existing record (from ${result.rows[0].time.toISOString()} to ${timeDetails.utcTime.toISOString()})`);
  }
}

// await client.end();