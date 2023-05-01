<template>
  <div class="about">
    <h1>About</h1>
    <!-- <div class="visual-border" /> -->
    <div class="resume">
      <div class="section">
        <h3>Experience</h3>
        <div class="text">
          <p>
            <span><b>Front-End Engineer</b></span>
            <br />
            <span><i>Curriculum Associates, 2022 - present</i></span>
          </p>
          <p>
            <span><b>Front-End Engineer</b></span>
            <br />
            <span><i>F1V, 2020 - 2022</i></span>
          </p>
        </div>
      </div>
      <div class="section">
        <h3>Education</h3>
        <div class="text">
          <p>
            <span><b>Associates Degree - Engineering Science</b></span>
            <br />
            <span><i>Great Bay Community College, 2012 - 2016</i></span>
          </p>
          <p>
            <span><b>Nanodegree - React</b></span>
            <br />
            <span><i>Udacity, 2020</i></span>
          </p>
          <p>
            <span><b>Nanodegree - Front-End Web Development</b></span>
            <br />
            <span><i>Udacity, 2020</i></span>
          </p>
          <p>
            <span><b>Data Science Foundations</b></span>
            <br />
            <span><i>Brilliant, 2020 - present</i></span>
          </p>
        </div>
      </div>
      <div class="section">
        <h3>Skills / Knowledge</h3>
        <div class="text">
          <ul>
            <li>MERN Stack</li>
            <li>Calculus and statistics concepts</li>
            <li>Written and verbal communication</li>
            <li>Judgement calls</li>
            <li>Time management</li>
            <li>Goal-oriented</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>

  ul {
    margin: 0;
  }
  p {
    margin: 0 10px 10px 10px;
  }

  .visual-border {
    height: 20px;
    width: 800px;
    margin: 0 auto 0 auto;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,21,173,1) 100%);
  }
  .about h1 {
    text-align: center;
    margin: 40px 0 40px 0;
  }
  .about .resume {
    width: 800px;
    padding: 40px 40px 0 40px;
    margin: 0 auto 80px auto;
    background: #333333;
    border-radius: 10px;
    /* border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px; */
  }
  .about .resume .section {
    padding-bottom: 40px;
  }
  .about .resume .text {
    padding: 20px 0 0px 20px;
    border-top: 4px solid #555555;
    border-left: 4px solid #555555;
    border-top-left-radius: 5px;
  }

</style>