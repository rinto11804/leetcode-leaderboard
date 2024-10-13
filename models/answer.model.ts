import mongoose from "mongoose";

export interface IAnswer extends Document {
  answer: Number;
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const answerSchema = new mongoose.Schema<IAnswer>(
  {
    answer: { type: Number, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Answer = mongoose.models.Answer || mongoose.model("Answer", answerSchema);

export { Answer };
