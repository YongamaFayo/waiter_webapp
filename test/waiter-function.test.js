const assert = require('assert');
const WaiterFunction = require("../waiter-function");

describe("waiter availability app", function(){

    const waiterFunction = WaiterFunction()

    const pg = require("pg");
    const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/availability';
	const pool = new Pool({
		connectionString
    });

    beforeEach(async function () {
        await pool.query("delete from shifts");    
        await pool.query("delete from waiters");
        await pool.query("delete from weekdays");
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["sunday"])
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["monday"])
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["tuesday"])
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["wednsday"])
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["thursday"])
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["friday"])
        await pool.query(`insert into weekdays (weekdays) values ($1)`, ["saturday"])
    });

    it("should be able to add a name to the waiters table", async function(){
        await waiterFunction.waiter("Jason")
        const result = await pool.query(`select count(*) from waiters`)
        const results = result.rows[0].count

        let funResults = await waiterFunction.getWaiters()
        funResults = funResults.length

        assert.equal(funResults, results)
    })

    it("should be able to add a name to the waiters table and return it", async function(){
        await waiterFunction.waiter("charl")

        const result = await waiterFunction.getWaiters()
        const results = result[0].waiters

        assert.deepEqual("Charl", results)
    })

    it("should be able to assign a waiter to a specific day", async function(){
        await waiterFunction.waiter("charl")
        await waiterFunction.selectedDay("charl",["monday","tuesday","friday"])

        const result = await pool.query("select count(*) from shifts");
        const results = result.rows[0].count
       // const funResult = await 
        assert.equal(3,results)
    })

    it("should be able to return all waiters assigned to specific days", async function(){
        await waiterFunction.waiter("charl")
        await waiterFunction.selectedDay("charl",["monday","tuesday","saturday"])
        await waiterFunction.waiter("charles")
        await waiterFunction.selectedDay("charles",["sunday","tuesday","friday"])
        await waiterFunction.waiter("charly")
        await waiterFunction.selectedDay("charly",["sunday","saturday","friday"])
        await waiterFunction.waiter("chark")
        await waiterFunction.selectedDay("chark",["monday","wednsday","thursday"])

        const results =  await waiterFunction.schedule()

        assert.equal(results,3)
    })

})