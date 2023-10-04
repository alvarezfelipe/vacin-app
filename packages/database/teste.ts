const {createVaccine} = require("./schemas/crud/vaccine");

const a = createVaccine({
    name: "Covid2",
    batche: "12739182093"
})

console.log(a)