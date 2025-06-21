function Card({ title, action, className = "", children }) {
  const cardStyle = {
    padding: "0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className={`card ${className}`} style={cardStyle}>
      {title && (
        <div className={`card-header ${action ? "justify-between" : "justify-center"}`}>
          <h2 className="card-title">{title}</h2>
          {action && action}
        </div>
      )}
      <div className={`card-body ${className}`}>
        {children}{" "}
        {/* هنا يتم عرض المحتوى الذي تم تمريره بين علامات <Card></Card> */}
      </div>
    </div>
  );
}

export default Card;
