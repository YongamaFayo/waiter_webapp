const WaitersApp = require("./waiter-function")
const waitersApp = WaitersApp()

module.exports = function waiterRoutes() {
    async function newWaiter(req, res, next) {
        var newWaiter = req.body.name
        try {
            if (newWaiter === "") {
                req.flash('error', 'Enter name')
            } else if (!(/[a-zA-z]$/.test(newWaiter))) {
                req.flash('error', 'enter a proper name')
            } else {
                var msg = await waitersApp.waiter(newWaiter)
                req.flash('pass', msg)
            }
            res.render("index")
        } catch (err) {
            next(err)
        }
    }

    async function home(req, res, next) {
        try {
            res.render("index")
        } catch (err) {
            next(err)
        }
    }

    async function waiterList(req, res, next) {
        try {
            const waiters = await waitersApp.getWaiters()
            res.render("waiters", {
                list: waiters
            })
        } catch (err) {
            next(err)
        }
    }

    async function selectDays(req, res, next) {
        var user = req.params.user
        var days = req.body.day

        try {
            if (days === undefined) {
                req.flash('error', 'select day')
            } else {

                await waitersApp.selectedDay(user, days)
            }

            const daysList = await waitersApp.waitersDays(user)
            res.render("waiter", {
                waiter: user,
                daysList
            })
        } catch (err) {
            next(err)
        }
    }

    async function getUserInfo(req, res, next) {
        var user = req.params.user
        try {
            const daysList = await waitersApp.waitersDays(user)
            res.render("waiter", {
                waiter: user,
                daysList
            })
        } catch (err) {
            next(err)
        }
    }

    async function postDays(req, res, next) {
        try {
            var days = await waitersApp.schedule()
            res.render("days", {
                list: days,
            })
        } catch (err) {
            next(err)
        }
    }

    async function reset_waiters(req, res, next) {
        try {
            await waitersApp.clearWaiters()
            res.render("days")
        } catch (err) {
            next(err)
        }
    }


    return {
newWaiter,
home,
waiterList,
selectDays,
getUserInfo,
postDays,
reset_waiters
    }
}