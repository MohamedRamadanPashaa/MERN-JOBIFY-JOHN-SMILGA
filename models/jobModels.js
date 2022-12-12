import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: [50, "Company name should be maximum of 50 characters"],
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxlength: [100, "Company name should be maximum of 100 characters"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: [true, "Please provide a Job Location"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Job should be belong to user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
