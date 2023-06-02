const { ObjectID } = require('mongoose').Types;
const { Thought, User } = require('../models');
const user = require('../models/User');

const totalUsers = async () => {
    const userNum = await User.aggregate()
        .count('userCount');
    return userNum;
};

const getUserThoughts = async (userID) => 
    User.aggregate([
        { $match: { _id: new ObjectID(userID) } },
        {
            $unwind: "$thoughts",
        },
        {
            $group: {
                _id: new ObjectID(userID),

            }
        },
    ]);

const getUserFriend = async(userID) =>
    User.aggregate([
        { $match: { _id: new ObjectID(userID) } },
        {
            $unwind: "$friends",
        },
        {
            $group: {
                _id: new ObjectID()
            }
        }
    ]);

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //GET a single user by ID
    async getOneUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userID})
                .select('-__v').populate('thoughts');
            
            if(!user){
                return res.status(400).json({message: 'No user with id found.'});
            }

            res.json({
                user,
                thought: ,
            })
        }catch(err){
            console.log(err);
            return res.json(400).json(err);
        }
    },

    //POST create a new user
    async createUser(req, res) {
        try{
            const user = await user.create(req.body);
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE a given user
    async deleteUser(req, res) {
        try{
            const user = await user.delete(req.body);
        }catch(err){
            res.status(500).json(err);
        }
    }
};