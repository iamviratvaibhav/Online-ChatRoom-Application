import mongoose from 'mongoose';

const msgSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true,
        validate: [
            {
                validator: (value) => value.length > 0,
                messages: "messages can't be empty",
            },
        ],
    },
    createdOn: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Message = mongoose.model("Message", msgSchema);
export default Message;

