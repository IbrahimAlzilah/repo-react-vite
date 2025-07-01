import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import TodoList from "../components/TodoList";
import UserProfileEditor from "../components/UserProfileEditor";
import SafeCounter from "../components/examples/SafeCounter"; // استيراد مكون SafeCounter
import Divider from "../components/ui/Divider";

function State() {
  const { t } = useContext(LanguageContext);
  useMetadata(`${t.using} useState | ${t.appName}`); // تعيين عنوان الصفحة

  return (
    <>
      <Divider title={t.using + " useState"} />
      <TodoList />
      <SafeCounter />
      <UserProfileEditor />
    </>
  );
}

export default State;
