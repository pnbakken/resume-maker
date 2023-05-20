const Heading = ({ size = 1, children, className = "" }) => {
  const HeadingTag = `h${size}`;
  return <HeadingTag className={className}>{children}</HeadingTag>;
};

export default Heading;
