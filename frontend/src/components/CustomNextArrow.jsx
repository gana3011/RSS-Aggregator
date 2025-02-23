const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`}
        style={{
          ...style,
          display: "block",
          right: "-40px", 
          zIndex: 10,
          fontSize: "24px",
          cursor: "pointer",
          color: "white",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
        onClick={onClick}
      >
        ▶
      </div>
    );
  };

export default CustomNextArrow;