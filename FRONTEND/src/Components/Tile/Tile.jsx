import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons/";
import "./Tile.css";
function Tile(props) {
  const Content = {
    width: props.Width,
    height: props.Height,
  };
  const Anchor = {
    textDecoration: "none",
    color: "black",
    display: "inline-block",
  };
  return (
    <>
      <Link to={props.Href} style={Anchor}>
        <div className='Tile' style={Content}>
          <div className='T-Details'>
            <h2>{props.title}</h2>
          </div>
          <div className='iconnav'>
            <ChevronRight></ChevronRight>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Tile;
