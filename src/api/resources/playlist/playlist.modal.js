import mongoose from 'mongoose';

const {Schema} = mongoose;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Playlist must have Name']
  },

  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});




export default mongoose.model('Playlist', playlistSchema);
