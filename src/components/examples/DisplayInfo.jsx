import Card from "../ui/Card";
import Button from "../ui/Button";

function DisplayInfo({ title, value, unit, isActive, details, onReset }) {
  return (
    <Card title={title} className="text-center">
      <p>
        القيمة: {value} {unit}
      </p>
      <p className={isActive ? "text-green-500" : "text-red-500"}>
        نشط: {isActive ? "نعم" : "لا"}
      </p>
      {details && (
        <p>
          <bdi>
            التفاصيل: {details.description} (رمز: {details.code})
          </bdi>
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-2">
        <Button text=" إعادة تعيين" onClick={onReset} color="#1a1a1a" />
      </div>
      {/* <button className="text-xs mt-1" onClick={onReset}>
        إعادة تعيين
      </button> */}
    </Card>
  );
}

export default DisplayInfo;
