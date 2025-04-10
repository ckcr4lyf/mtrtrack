const doStuff = async () => {
    const rsp = await fetch("https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=SHT");
    const data = await rsp.json();
    const up = data.data['EAL-SHT'].UP
    const rac = up.filter(i => i.route === 'RAC');
    console.log(`[${new Date().toISOString()}] UP:`, rac.map(r => r.time));
}

const doStuff2 = async () => {
    const rsp = await fetch("https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=UNI");
    const data = await rsp.json();
    const up = data.data['EAL-UNI'].DOWN
    const rac = up.filter(i => i.route === 'RAC');
    console.log(`[${new Date().toISOString()}] DOWN:`, rac.map(r => r.time));
}

doStuff();
doStuff2();

setInterval(async () => {
    try {
        await doStuff();
    } catch (e){
        console.log(`ERROR: ${e}`);
    }

    try {
        await doStuff2();
    } catch (e){
        console.log(`ERROR: ${e}`);
    }

}, 1000 * 60);
