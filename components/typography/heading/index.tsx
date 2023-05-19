const Heading = ({ size = 1, children }) => {
  const HeadingTag = `h${size}`;
  return <HeadingTag>{children}</HeadingTag>;
};

export default Heading;
