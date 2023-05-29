const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [thoughtSchema],
        friends: [
            {
                type: Schema.type.ObjectID,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

// Virtual to return the length of friends list
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

const user = model('user', userSchema);

module.exports = user;