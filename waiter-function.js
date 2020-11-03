module.exports = function () {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/availability';
    const pool = new Pool({
        connectionString
    });

    async function waiter(x) {

        var name = x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
        const item = await pool.query(`select id from waiters where waiters = $1`, [name])
        if (item.rowCount === 0) {
            await pool.query(`insert into waiters (waiters) values ($1)`, [name]);
        }

    }

    async function getWaiters() {
        const waiterList = await pool.query(`select waiters from waiters`)
        return waiterList.rows
    }

    async function selectedDay(x, y) {
        //console.log(x)
        //console.log(y)
        //var name = x.split(":")
        //console.log(x)
        const nameId = await pool.query(`select id from waiters where waiters = $1`, [x])
        const personId = nameId.rows[0]
        //console.log(personId)

        const yc = y.split(",");

        for (let i = 0; i < yc.length; i++) {
            let day = yc[i]
            //console.log(day)
            const dayId = await pool.query(`select id from weekdays where weekdays =$1`, [day])
            //console.log(dayId.rows[0].id)
            const actualDayId = dayId.rows[0].id
            const id = personId
            await pool.query(`insert into shifts (weekdays_id, waiters_id) values ($1, $2)`, [actualDayId, id])
        }
    }

    async function schedule() {
        const days = await pool.query(`select id from weekdays`)
        const daysId = days.rows
        console.log(daysId)
        const waiters = await pool.query(`select id from waiters`)
        const waitersId = waiters.rows
        console.log(waitersId)
        const schedulesId = await pool.query(`select weekdays_id from shifts`)
        const schedules = schedulesId.rows
        console.log(schedules)

        for (var i = 0; i < schedules.length; i++) {
            var dayId = daysId[i]
            var waiterId = waitersId[i]
            var scheduleId = schedulesId[i]
            console.log(dayId)
            console.log(waiterId)
            console.log(scheduleId)

        }
    }
        
    return {
        waiter,
        getWaiters,
        selectedDay,
        schedule

    }
}