import mongoose from 'mongoose';

  const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    image: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  export default mongoose.model('Post', postSchema);