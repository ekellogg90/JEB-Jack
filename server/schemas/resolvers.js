const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // console.log(context);
            // console.log(args);
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('wins')
            }
            throw AuthenticationError;
        },
        leaderBoard: async () => {
            return User.find();
        },
    },

    Mutation: {
        signup: async (parent, { username, password }) => {
            const user = await User.create({ username, password, wins: 0 });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            console.log("Token: ", token);
            return { token, user };
        },
        addWin: async (parent, { id }) => {
            return User.findOneAndUpdate(
                { _id: id },
                { $inc: { wins: 1 } },
                { new: true }
            )
        }
    },
};

module.exports = resolvers;
