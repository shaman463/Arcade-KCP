import mongoose from 'mongoose';

const gameScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameName: {
      type: String,
      enum: ['snake', 'tictactoe', 'memorygame', 'rockpaper'],
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    gameData: {
      type: Object, // Can store any game-specific data
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const GameScore = mongoose.model('GameScore', gameScoreSchema);

export default GameScore;
