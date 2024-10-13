import mongoose from "mongoose";

export interface IQuestion extends Document {
  questionNo: Number;
  questionTitle: String;
  questionTitleSlug: String;
  createdAt: Date;
  updatedAt: Date;
}
const questionSchema = new mongoose.Schema<IQuestion>(
  {
    questionNo: { type: Number, required: true },
    questionTitle: { type: String, required: true },
    questionTitleSlug: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export { Question };
