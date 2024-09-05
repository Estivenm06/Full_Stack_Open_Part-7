const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
    transform: (doc, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)