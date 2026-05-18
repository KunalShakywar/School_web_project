import mongoose from "mongoose";

const academicCalendarSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: String,

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

    type: {
        type: String,
        enum: [
            "holiday",
            "exam",
            "event",
            "vacation",
            "result",
            "meeting"
        ],
        required: true,
    },

    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicSession",
    },

    isPublic: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "AcademicCalendar",
    academicCalendarSchema
);