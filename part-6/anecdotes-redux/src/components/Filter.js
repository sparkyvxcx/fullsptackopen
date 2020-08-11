import React from "react";
import { filterChange } from "../reducers/filterReducer";
// import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

const Filter = (props) => {
  // const dispatch = useDispatch();
  // const searchTerm = useSelector((state) => state.term);
  const searchTerm = props.term;

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    // dispatch(filterChange(event.target.value));
    props.filterChange(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="search" onChange={handleChange} value={searchTerm} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    term: state.term,
  };
};

const ConnectFilter = connect(mapStateToProps, { filterChange })(Filter);

export default ConnectFilter;
