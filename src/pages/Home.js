import React from "react";
import styled from "styled-components";
import bgPhoto from "../assets/images/bg-photo.jpg";

const HomeWrapper = styled.div`
  background-image: ${({ photo }) => `url(${photo})`};
  height: 100vh;
  width: 100%;
  background-size: cover;
`;

const Home = () => {
  return <HomeWrapper photo={bgPhoto} />;
};

export default Home;
