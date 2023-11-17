import mongoose from "mongoose";

// Define the task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true,
});

// Create and export the Task model using the task schema
export default mongoose.model("Task", taskSchema);
