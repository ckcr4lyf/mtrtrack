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

