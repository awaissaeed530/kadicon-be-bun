wrk.method = "POST"
wrk.body   = [[
{
    "restaurantId": "I2lX2gMNd6RsC3i3IUmu",
    "noOfPersons": 2,
    "tableId": "0vn9tgRVZET0q9nlqksK",
    "startDate": "2023-09-14T15:30:00",
    "endDate": "2023-09-14T17:00:00",
    "customerData": {
        "name": "Awais Saeed",
        "email": "awais@mail.com"
    }
}
]]
wrk.headers["Content-Type"] = "application/json"
