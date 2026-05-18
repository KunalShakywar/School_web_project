import { model, Schema } from "mongoose";


const teacherAssignableSchema = new Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    },

    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },

    sectionId: {
        type: Schema.Types.ObjectId,
        ref: "Section"
    },

    subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },    
    streamId: {
        type: Schema.Types.ObjectId,
        ref: "Stream",
        default: null
    },
});

export default model("TeacherClass", teacherAssignableSchema)