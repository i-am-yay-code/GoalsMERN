const asyncHandler = require('express-async-handler');
const { request } = require('http');
const User = require("../models/userModel")

const Goal = require('../models/goalModel')


// @desc Get goals
// @route GET /api/goals
// @access Priate
const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json({ message: goals });
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

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json({ message: goal })
})


// @desc Update goals
// @route PUT /api/goals
// @access Priate
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id);

    //Check for user exists
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    //Make sure the logged user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({ message: `Updated goal ${updatedGoal}` })
})


// @desc Delete goal
// @route DELETE /api/goals
// @access Priate
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    //Check for user exists
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    //Make sure the logged user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const result = await Goal.findByIdAndDelete(req.params.id);


    res.status(200).json({ deleted: req.params.id })
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}