import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";

const UseList = ({ data, loading = false }) => {
  return (
    <>
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} animation="wave" />
          ))
        : data.map((item) => (
            <div key={item.id} className="text-start">
              {item.name}
            </div>
          ))}
    </>
  );
};

UseList.propTypes = {
  loading: PropTypes.bool,
};

export default UseList;
