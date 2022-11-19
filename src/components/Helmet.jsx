const Helmet = (props) => {
  document.title = "SP-One - " + props.title;

  return <div>{props.children}</div>;
};
export default Helmet;
