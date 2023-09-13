- [x] Postgres & ORM integration
- [x] Create Reservation
- [x] Schedule Table for calculating time slots
- [x] Time slots
- [ ] Migrate data from firestore to postgres



# Results

### Get Time Slots
#### 4 Threads with 1000 connections for 10s

```
Running 10s test @ http://localhost:3000/schedule/slots
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   351.61ms   29.18ms 517.08ms   89.22%
    Req/Sec   772.87    478.20     2.48k    70.63%
  27627 requests in 10.04s, 30.01MB read
Requests/sec:   2753.02
Transfer/sec:      2.99MB

Running 10s test @ https://europe-west3-kadi-dev.cloudfunctions.net/getTimeSlotsByDate
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.05s   464.25ms   2.00s    57.95%
    Req/Sec   165.28    100.77     0.97k    90.62%
  5306 requests in 10.08s, 6.01MB read
  Socket errors: connect 0, read 2, write 0, timeout 833
  Non-2xx or 3xx responses: 2
Requests/sec:    526.36
Transfer/sec:    610.62KB
```

#### 16 Threads with 1000 connections for 30s
```
Running 30s test @ http://localhost:3000/schedule/slots
  16 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   335.75ms   19.85ms 417.09ms   83.91%
    Req/Sec   209.07    144.76   616.00     68.07%
  88298 requests in 30.10s, 95.91MB read
Requests/sec:   2933.47
Transfer/sec:      3.19MB

Running 30s test @ https://europe-west3-kadi-dev.cloudfunctions.net/getTimeSlotsByDate
  16 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   412.05ms  156.26ms   1.93s    89.19%
    Req/Sec   112.76     58.21   414.00     62.39%
  50725 requests in 30.10s, 57.47MB read
  Socket errors: connect 0, read 0, write 0, timeout 1278
  Non-2xx or 3xx responses: 17
Requests/sec:   1685.29
Transfer/sec:      1.91MB
```

### Create Reservation
#### 4 Threads with 1000 connections for 10s

```
Running 10s test @ http://localhost:3000/reservation
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   707.20ms   61.66ms   1.05s    93.80%
    Req/Sec   619.10    547.07     1.78k    57.23%
  13394 requests in 10.03s, 7.45MB read
Requests/sec:   1335.58
Transfer/sec:    760.39KB

Running 10s test @ https://europe-west3-kadi-dev.cloudfunctions.net/createReservation
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.86s    59.09ms   1.92s    66.67%
    Req/Sec    28.90     27.08   141.00     83.12%
  507 requests in 10.04s, 165.69KB read
  Socket errors: connect 0, read 0, write 0, timeout 504
Requests/sec:     50.49
Transfer/sec:     16.50KB
```
