const mongoose = require('mongoose');

const ReelCommentSchema = new mongoose.Schema({
    comment_user_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming user ID is stored as ObjectId
    required: true
  },
  username:{ 
    type:String,
    required:true
  },
  profilepic: {
    type:String,
    required:true
  },
  comment: {
    type:String,
    required:true
  },

  timestamp: String
});

const ReelCommentModel = mongoose.model('ReelComment', ReelCommentSchema);

module.exports = ReelCommentModel;
