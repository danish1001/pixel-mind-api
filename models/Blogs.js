const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  blogHeading: {
    type: String,
    require: true
  },
  BlogContent: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isApprovedByAdmin: {  /// seeking for Admin approval
    type: Boolean,
    default: false
  },
  isApprovedByEmployee: { /// seeking for Employee approval
    type: Boolean,
    default: false
  },
  finalApproval: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Blog", BlogSchema);