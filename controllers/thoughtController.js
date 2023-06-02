const { Thought, User } = require('../models');

module.exports = {
    //Get all thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Get a single thought
    async getOneThought(req, res){
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');        

            if(!thought){
                return res.json(404).json({ message: 'No thought at that ID.' });
            }

            res.json(thought);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Create a thought
    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res){
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                res.status(404).json({message:"No thought found at that ID!"});
            }

            await User.deleteMany({ _id: { $in: thought.username }});
            res.json({ message: "Successfully destroyed thought."});
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if(!thought){
                res.status(404).json({ message: 'No thought at this id!' });
            }

            res.json(thought);
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
};