const Header = () => {
  return (
    <div>
      <p className="text-center pt-3 pb-3 h1">Eats by Jeets</p>
      <div className="d-flex justify-content-evenly">
        <i className="bi bi-list" role="button"></i>
        <i className="bi bi-house-door-fill" role="button"></i>
        <i className="bi bi-person-fill" role="button"></i>
      </div>
    </div>
  );
};

const AddRecButton = () => {
  return (
    <div className="d-grid gap-2 col-10 mx-auto pt-3 pb-3">
      <button className="btn btn-dark" type="button">
        Add new rec
      </button>
    </div>
  );
};

const Content = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  if (posts) {
    return (
      <>
        {posts.map((post) => (
          <Card key={post[0]} data={post} />
        ))}
      </>
    );
  }
  return <div>No posts!</div>;
};

const Card = ({ data }) => {
  return (
    <div className="card mx-auto col-11 mb-3" style={{ maxWidth: "500px" }}>
      <div className="post-header col-12 py-2 px-3">
        <div className="row mb-2">
          <div className="col-3 pe-1">
            <img
              src={data[7]}
              className="img-thumbnail rounded-circle shadow"
              style={{ width: "60px", height: "60px" }}
              alt="profile picture"
            />
          </div>
          <div className="col-7 float-start px-1">
            <h4 className="mb-0">{data[5]}</h4>
            {data[6]}
          </div>
          <div className="col-2 float-end text-end post-number ps-1">
            {data[4]}
          </div>
        </div>
        <div className="row">
          <div className="col-5 float-start card-text">
            <h6>{data[1]}</h6>
          </div>
          <div className="col-3 text-center">
            <h6>
              {data[2] + " "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                stroke="currentColor"
                fill="#f1c644"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </h6>
          </div>
          <div className="col-4 float-end text-end card-text">
            <h6>
              View rec{" "}
              <i
                className="bi bi-arrow-right"
                style={{ fontSize: "1em", lineHeight: "1em" }}
                role="button"
              ></i>
            </h6>
          </div>
        </div>
      </div>
      <img className="card-img" src={data[8]} alt="food item picture" />
      <div className="row card-body px-3">
        <div className="col-2 pe-1">
          <img
            src={data[7]}
            className="img-thumbnail rounded-circle shadow"
            style={{ width: "40px", height: "40px" }}
            alt="profile picture"
          />
        </div>
        <div className="col-10 px-1">
          <p className="card-text">{data[3]}</p>
        </div>
      </div>
      <div className="d-flex justify-content-around pb-2">
        <i className="bi bi-heart" role="button"></i>
        <i className="bi bi-chat-text" role="button"></i>
        <i className="bi bi-bookmark-plus" role="button"></i>
        <i className="bi bi-share" role="button"></i>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <AddRecButton />
      <Content />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
