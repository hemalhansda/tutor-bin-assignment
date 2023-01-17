const mongoose = require("mongoose");
const autoPopulate = require("mongoose-autopopulate");
const {toJSON, paginate} = require("./plugins");
const User = require("./user.model");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: { 
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: User,
    _id: false,
    autopopulate: {
        maxDepth: 0
    }
},
  active: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// add plugin that converts mongoose to json
todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);
todoSchema.plugin(autoPopulate);

/**
 * @typedef Todo
 */
const Todo = mongoose.model("todo-list", todoSchema);

module.exports = Todo;
