import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        I Was Mad At <br className="max-md:hidden" />
        <span className="orange_gradient">Edit Later</span>
      </h1>
      <p className="desc text-center">Edit Later</p>
      <Feed />
    </section>
  );
};
export default Home;
