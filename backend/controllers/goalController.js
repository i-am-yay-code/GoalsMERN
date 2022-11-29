const asyncHandler = require('express-async-handler');


// @desc Get goals
// @route GET /api/goals
// @access Priate
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get goals" });
})

// @desc Set goal
// @route POST /api/goals
// @access Priate
const setGoal = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please, set a text field")
    }
    res.status(200).json({ message: "Set goal" })
})


// @desc Update goals
// @route PUT /api/goals
// @access Priate
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})


// @desc Delete goal
// @route DELETE /api/goals
// @access Priate
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete ${req.params.id}` })
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}