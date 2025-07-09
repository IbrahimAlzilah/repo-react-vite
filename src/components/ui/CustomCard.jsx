import PropTypes from "prop-types";

function CustomCard({
  title,
  action,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  footer,
  children,
}) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className={`card-header flex items-center ${
            action ? "justify-between" : "justify-center"
          } ${headerClassName}`}
        >
          {title && <h2 className="card-title">{title}</h2>}
          {action && <>{action}</>}
        </div>
      )}
      <div className={`card-body text-inherit ${bodyClassName}`}>{children}</div>
      {footer && <div className={`card-footer ${footerClassName}`}>{footer}</div>}
    </div>
  );
}

CustomCard.propTypes = {
  title: PropTypes.node,
  action: PropTypes.node,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footer: PropTypes.node,
  footerClassName: PropTypes.string,
  children: PropTypes.node,
};

export default CustomCard;

// How to Use the Enhanced CustomCard Component
// Props explained:
// title: The card’s title (can be string or JSX).
// action: An element (e.g., button) to show in the header.
// className: Extra classes for the card container.
// headerClassName, bodyClassName, footerClassName: Style specific sections.
// footer: Content for the card’s footer.
// children: The main content of the card.

// import CustomCard from './path/to/CustomCard';
// function Example() {
//   return (
//     <CustomCard
//       title="User Profile"
//       action={<button>Edit</button>}
//       className="my-custom-card"
//       headerClassName="bg-gray-100"
//       bodyClassName="p-4"
//       footer={<span>Last updated: Today</span>}
//       footerClassName="bg-gray-50"
//       id="profile-card" // Example of an extra prop
//       data-testid="profile-card" // Another extra prop
//     >
//       <p>This is the card body content.</p>
//     </CustomCard>
//   );
// }
