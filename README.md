howto
-----
install node
clone repo
`npm i`
`grunt serve`
if you do not have a grunt, do:
`npm i -g grunt, grunt-cli`

also for user administration:
you require MongoDb


Credits
--------
[syzer](https://github.com/syzer)

[DaftMonk](https://github.com/DaftMonk/)

add yourself here!

TODO
----
[ ] main -> rest prices count
[ ] recommendation drugs
[ ] price upload display

```js
db.addUser(
{ user: "tph-prices",
  pwd: "tph-prices1",
  roles: [
    { role: "readWrite", db: "tphprices-dev" }
  ]
})
```

API
---
rest

curl http://localhost:9000/api/things
