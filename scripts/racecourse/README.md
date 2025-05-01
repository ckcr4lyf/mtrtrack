# racecourse

The script basically fetches train timings for:

* Shatin
* University

and then filters them for `UP` / `DOWN` + the `RAC` route specifically and logs it.

This can be used to later analyze all the timings to try and guesstimate station opening times, or at the very least first / last train timings.

## guesstimating station times

After running the script, later with some grepping I got the UP / DOWN train timings:

```
cat "racecourse_times_2025-04-06.txt" | grep UP | grep -v '\[\]' > UP_2025-04-06.txt
```

To avoid one-offs I also did it on 13th April. The raw data is available in the txt files in this repo, but basically it looks like:

#### 6th April 2025

* [First Race](https://www.racenet.com.au/results/horse-racing/sha-tin-20250406/graduate-school-alumni-hcp-c5-race-1): `12:45:00`
* First Train UP from Shatin: `10:59:45`
* First Train DOWN from University: `11:25:51`

* [Last Race](https://www.racenet.com.au/results/horse-racing/sha-tin-20250406/wu-yee-sun-and-lee-woo-sing-alumni-hcp-c3-race-10): `17:45:00`
* Last Train UP from Shatin: `18:32:04`
* Last Train DOWN from University: `18:29:08`

#### 13th April 2025

* [First Race](https://www.racenet.com.au/results/horse-racing/sha-tin-20250413/racing-for-charity-griffin-plate-race-1): `12:30:00`
* First Train UP from Shatin: `10:59:25`
* First Train DOWN from University: `11:26:23`

* [Last Race](https://www.racenet.com.au/results/horse-racing/sha-tin-20250413/sustainability-hcp-c3-race-11): `17:50:00`
* Last Train UP from Shatin: `18:34:53`
* Last Train DOWN from University: `18:28:55`

So a decent guess may be the first train is ~90mins before first race (scheduled), and last train is ~40 mins after the last race.

