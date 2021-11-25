import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-content-container">
      <h1 className="home-title">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary, information and
        reviews. Find the jobs that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-jobs-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
