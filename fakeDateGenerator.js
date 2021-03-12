let faker = require("faker")

let db = {
    users: []
}

for (let i = 0; i < 100; ++i){
    db.users.push({
        id: i+1,
        name: faker.name.findName(),
        color: faker.commerce.color()
    })
}

console.log(JSON.stringify(db))