import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import TodoList from "../components/todo-list";
import UserProfileEditor from "../components/UserProfileEditor";
import SafeCounter from "../components/examples/SafeCounter"; // استيراد مكون SafeCounter
import CustomDivider from "../components/ui/CustomDivider";

function State() {
  const { t } = useContext(LanguageContext);
  useMetadata(`${t.using} useState | ${t.appName}`); // تعيين عنوان الصفحة

  return (
    <>
      <CustomDivider title={t.using + " useState"} />
      <TodoList />
      <SafeCounter />
      <UserProfileEditor />
    </>
  );
}

export default State;
