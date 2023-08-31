const NewChatImage = (props: {url: string}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        height: "100%",
      }}
      >
      <div
        style={{
          borderRadius: "20px",
          textAlign: "center",
          display: "block",
          height: "100%",
          width: "100%",
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            content: "",
            position: "absolute",
            backgroundColor: "#fff",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: "0.5",
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            paddingTop: "100%",
            width: "100%",
            cursor: "pointer",
            position: "relative",
            borderRadius: "50%",
            border: "2px dashed #fff",
            boxSizing: "border-box",
            pointerEvents: "none",
            backgroundImage: `url(` + props.url + `)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default NewChatImage;