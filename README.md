# MTR Tracking

Some utilities i use to track MTR frequencies and other stuff.

API Docs: https://opendata.mtr.com.hk/doc/Next_Train_API_Spec_v1.7.pdf

## MTR API Secrets

The response for East Rail Line is different to others. E.g.:

Island Line (ADM)
```json
{
    "seq": "1",
    "dest": "CHW",
    "plat": "3",
    "time": "2025-03-29 17:25:28",
    "ttnt": "1",
    "valid": "Y",
    "source": "-"
}
```

vs

East Rail Line (SHT)
```json
{
    "seq": "2",
    "dest": "LOW",
    "plat": "2",
    "time": "2025-03-29 17:27:59",
    "ttnt": "3",
    "valid": "Y",
    "source": "-",
    "route": "",
    "timeType": "A"
}
```

There is a undocumented `route` field in the response! This is empty for the "default" trains (via Fo Tan), however it is populated with `RAC` for trains via racecourse.
