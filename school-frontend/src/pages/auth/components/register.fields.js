import {
  MdDriveFileRenameOutline,
  MdEmail,
  MdLock,
  MdOutlinePhone,
  MdMenuBook,
  MdStars,
  MdOutlineSchool,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

export const registerBaseFields = [
  {
    key: "name",
    icon: MdDriveFileRenameOutline,
    type: "text",
    placeholder: "Enter your name",
    valueKey: "name",
    onChangeKey: "onNameChange",
    required: true,
  },
];

export const registerRoleFields = {
  student: {
    columnsClassName: "grid-cols-1 sm:grid-cols-2",
    fields: [
      {
        key: "rollNumber",
        placeholder: "Roll Number",
        valueKey: "rollNumber",
        onChangeKey: "onRollNumberChange",
        required: true,
      },
      {
        key: "classNameValue",
        placeholder: "Class",
        valueKey: "classNameValue",
        onChangeKey: "onClassNameChange",
        required: true,
        wrapperClassName: "sm:col-span-2",
      },
      {
        key: "section",
        placeholder: "Section",
        valueKey: "section",
        onChangeKey: "onSectionChange",
        required: true,
      },
      {
        key: "phone",
        icon: MdOutlinePhone,
        placeholder: "Phone",
        valueKey: "phone",
        onChangeKey: "onPhoneChange",
        inputMode: "numeric",
        maxLength: 10,
        wrapperClassName: "max-w-[210px]",
      },
      {
        key: "parentName",
        placeholder: "Parent Name",
        valueKey: "parentName",
        onChangeKey: "onParentNameChange",
      },
      {
        key: "parentPhone",
        placeholder: "Parent Phone",
        valueKey: "parentPhone",
        onChangeKey: "onParentPhoneChange",
      },
      {
        key: "password",
        icon: MdLock,
        type: "password",
        placeholder: "Password",
        valueKey: "password",
        onChangeKey: "onPasswordChange",
        required: true,
        isPassword: true,
      },
    ],
  },
  teacher: {
    columnsClassName: "grid-cols-1",
    fields: [
      {
        key: "qualification",
        icon: MdOutlineSchool,
        type:"text",
        valueKey:"qualification",
        onChangeKey:"onQualificationChange",
        required: true,
        placeholder: "Qualification",
      },
      {
        key: "subject",
        icon: MdMenuBook,
        type:"text",
        valueKey:"subject",
        onChangeKey:"onSubjectChange",
        placeholder: "Subject",
        required: true,
      },
      {
        key: "className",
        icon: SiGoogleclassroom,
        type:"text",
        valueKey:"className",
        onChangeKey:"onTeacherClassNameChange",
        placeholder: "Class (e.g. LKG, 11th, 12th)",
        wrapperClassName: "sm:col-span-2",
      },
      {
        key: "experience",
        icon: MdStars,
        type:"text",
        valueKey:"experience",
        onChangeKey:"onExperienceChange",
        placeholder: "Experience (years)",
      },
      {
        key: "phone",
        icon: MdOutlinePhone,
        type: "tel",
        valueKey: "phone",
        onChangeKey: "onPhoneChange",
        placeholder: "Phone",
        inputMode: "numeric",
        maxLength: 10,
        wrapperClassName: "max-w-[210px]",
      },
      {
        key: "email",
        icon: MdEmail,
        type: "email",
        placeholder: "Enter your email",
        valueKey: "email",
        onChangeKey: "onEmailChange",
        required: true,
      },
      {
        key: "password",
        icon: MdLock,
        type: "password",
        placeholder: "Create password",
        valueKey: "password",
        onChangeKey: "onPasswordChange",
        required: true,
        isPassword: true,
      },
    ],
  },
  parent: {
    columnsClassName: "grid-cols-1",
    fields: [],
  },
  admin: {
    columnsClassName: "grid-cols-1",
    fields: [],
  },
};

export const getRegisterRoleFields = (role) =>
  registerRoleFields[role] ?? { columnsClassName: "grid-cols-1", fields: [] };
