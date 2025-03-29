type DirectionData = {
    seq: string,
    dest: string,
    plat: string,
    time: string,
    ttnt: string,
    valid: string,
    source: string,
}

type LineData = {
    curr_time: string,
    sys_time: string,
    UP: DirectionData[],
    DOWN: DirectionData[],
}

export type MtrResponse = {
    data: Record<string, LineData>,
    isdelay: 'N' | 'Y',
    status: number,
}