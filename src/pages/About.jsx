import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  padding: theme.spacing(4),
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#027BC0",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
}));

const InfoBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
}));

const DeveloperBox = styled(InfoBox)(({}) => ({
  backgroundColor: "#e3f2fd",
  border: "1px solid #027BC0",
}));

const JoinUsBox = styled(InfoBox)(({}) => ({
  backgroundColor: "#fff3e0",
  border: "1px solid #ff9800",
}));

const StyledButton = styled(Button)(({}) => ({
  color: "#ffffff",
  backgroundColor: "#027BC0",
  "&:hover": {
    backgroundColor: "#005b8c",
  },
}));

const About = () => {
  return (
    <AboutContainer sx={{ marginBottom: "2rem" }}>
      <SectionTitle variant="h2">About Us</SectionTitle>

      <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
        Welcome to <strong>Infinite Blog</strong>!
      </Typography>

      <InfoBox>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          At <strong>Infinite Blog</strong>, we are dedicated to sharing
          different perspectives and meaningful content on various topics. Our
          aim is to create a community where ideas are freely shared, and
          creativity flourishes.
        </Typography>
      </InfoBox>

      <SectionTitle variant="h5">Our Purpose</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Inspiration
            </Typography>
            <Typography variant="body2">
              We aim to inspire readers with compelling stories and
              thought-provoking ideas.
            </Typography>
          </InfoBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Information
            </Typography>
            <Typography variant="body2">
              We provide well-researched articles that inform our readers on
              various topics.
            </Typography>
          </InfoBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Community
            </Typography>
            <Typography variant="body2">
              We are building a community where readers can share their thoughts
              and connect with like-minded individuals.
            </Typography>
          </InfoBox>
        </Grid>
      </Grid>

      <SectionTitle variant="h5">Our Values</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Integrity
            </Typography>
            <Typography variant="body2">
              We ensure reliability for our readers by maintaining honesty and
              transparency in all our content.
            </Typography>
          </InfoBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Quality
            </Typography>
            <Typography variant="body2">
              We strive to deliver engaging, well-researched, and meaningful
              articles.
            </Typography>
          </InfoBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Diversity
            </Typography>
            <Typography variant="body2">
              We celebrate diverse perspectives and encourage contributions from
              a wide range of voices.
            </Typography>
          </InfoBox>
        </Grid>
      </Grid>

      <SectionTitle variant="h5">Meet the Developer</SectionTitle>
      <DeveloperBox>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          <strong>Hüseyin Şahin</strong> is the creator of{" "}
          <strong>Infinite Blog</strong>. With a passion for writing and a keen
          interest in technology, I aim to create inspiring and informative
          content. I work to build a platform where our readers can share their
          ideas and enrich it with creative thoughts. I am here to ensure that
          everyone’s voice is heard and to explore different perspectives. My
          goal is to create a community where readers can not only read but also
          share their own stories.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          You can follow my work on GitHub:
          <StyledButton
            href="https://github.com/huseyyinsahin"
            target="_blank"
            variant="contained"
            sx={{ marginLeft: 1 }}
          >
            GitHub Profile
          </StyledButton>
        </Typography>
      </DeveloperBox>

      <SectionTitle variant="h5">Join Us</SectionTitle>
      <JoinUsBox>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Thank you for visiting <strong>Infinite Blog</strong>! We invite you
          to explore our articles, share your thoughts, and publish your own
          writings on our site. If you have any questions or feedback, please
          feel free to contact us through our contact page.
        </Typography>
      </JoinUsBox>
    </AboutContainer>
  );
};

export default About;
