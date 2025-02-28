import Like from '../models/likeModel.js';
import Post from '../models/postModel.js';

export const addLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    const newLike = new Like({
      post: postId,
      user: userId
    });

    await newLike.save();
    res.status(201).json(newLike);
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ message: 'Error adding like', error: error.message });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const like = await Like.findOneAndDelete({ post: postId, user: userId });
    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.status(200).json({ message: 'Like removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing like', error });
  }
};

export const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ post: postId })
      .populate('user', 'username _id')
      .exec();
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching likes', error });
  }
};