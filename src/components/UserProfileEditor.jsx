import React, { useState } from "react";
import CustomCard from "./ui/CustomCard";
import CustomButton from "./ui/CustomButton";
import { Divider } from "@mui/material";

const restored = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-restore"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3.06 13a9 9 0 1 0 .49 -4.087" />
    <path d="M3 4.001v5h5" />
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
);

const userData = {
  firstName: "ابراهيم",
  lastName: "الزيلة",
  email: "Ibrahim@gamil.com",
};

function UserProfileEditor() {
  // State with Objects
  const [user, setUser] = useState(userData);

  // دالة لتحديث حقل معين في الكائن
  const handleNameChange = (event) => {
    const newFirstName = event.target.value;
    // يجب أن ننسخ الكائن القديم ثم نغير الخاصية المطلوبة
    setUser({ ...user, firstName: newFirstName });
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setUser({ ...user, email: newEmail });
  };

  return (
    <>
      <CustomCard
        title="تعديل ملف المستخدم"
        action={
          <CustomButton
            text={restored}
            icon={restored}
            onClick={() => setUser(userData)}
          />
        }
      >
        <div className="form-group">
          <label>الاسم الأول</label>
          <input
            type="text"
            value={user.firstName}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label>الاسم الأخير</label>
          <input
            type="text"
            value={user.lastName}
            // onChange هنا نستخدم arrow function مختصرة
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" value={user.email} onChange={handleEmailChange} />
        </div>
        <Divider />
        <h3 className="mt-2">البيانات الحالية:</h3>
        <p>
          الاسم: {user.firstName} {user.lastName}
        </p>
        <p>البريد الإلكتروني: {user.email}</p>
      </CustomCard>
    </>
  );
}

export default UserProfileEditor;
