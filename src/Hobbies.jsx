import { useSelector } from "react-redux";

const Hobbies = () => {
  const hobbies = useSelector((state) => state.hobbies);
  console.log(hobbies);
  return (
    <>
      <h3>Hobbies</h3>
    </>
  );
};

export default Hobbies;
