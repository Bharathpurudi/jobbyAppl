import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobDetail from '../JobDetail'
import FilterItem from '../FilterItem'

import './index.css'

const statusConst = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    profileFetchStatus: statusConst.initial,
    jobsFetchStatus: statusConst.initial,
    searchFilter: '',
    searchedJobName: '',
    salaryFilter: '',
    employmentTypeFilter: [],
    jobsList: [],
  }

  componentDidMount() {
    this.renderProfileDetails()
    this.renderJobDetails()
  }

  renderProfileDetails = async () => {
    this.setState({profileFetchStatus: statusConst.loading})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)

    if (response.ok) {
      this.setState({profileFetchStatus: statusConst.success})
    } else {
      this.setState({profileFetchStatus: statusConst.failure})
    }
  }

  renderSuccessProfile = () => (
    <Link to="/user-profile" className="link-item">
      <div className="profile-container">
        <img
          src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637651836/BharathPurudiPP_vckyod.jpg"
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-name">BHARATH PURUDI</h1>
        <p className="profile-bio">An Aspiring Full Stack Developer</p>
      </div>
    </Link>
  )

  onClickOnRetry = () => {
    this.renderProfileDetails()
  }

  renderFailureProfile = () => (
    <div className="failure-profile-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickOnRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFinalProfile = () => {
    const {profileFetchStatus} = this.state

    switch (profileFetchStatus) {
      case statusConst.success:
        return this.renderSuccessProfile()
      case statusConst.failure:
        return this.renderFailureProfile()
      case statusConst.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderJobDetails = async () => {
    this.setState({jobsFetchStatus: statusConst.loading})
    const {employmentTypeFilter, salaryFilter, searchedJobName} = this.state
    const employFilter = employmentTypeFilter.join()
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employFilter}&minimum_package=${salaryFilter}&search=${searchedJobName}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsUrl, options)

    if (response.ok) {
      const data = await response.json()
      const jobsData = data.jobs
      const updatedJobsList = jobsData.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      if (updatedJobsList.length === 0) {
        this.setState({jobsFetchStatus: statusConst.noJobs})
      } else {
        this.setState({jobsFetchStatus: statusConst.success})
        this.setState({jobsList: updatedJobsList})
      }
    } else {
      this.setState({jobsFetchStatus: statusConst.failure})
    }
  }

  renderJobsOnSuccess = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobDetail key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  retryJobs = () => {
    this.renderJobDetails()
  }

  renderJobsOnFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-msg">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-button" type="button" onClick={this.retryJobs}>
        Retry
      </button>
    </div>
  )

  renderOnNoJobs = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-image"
      />
      <h1 className="failure-msg">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  onFilterOnEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentTypeFilter: [...prevState.employmentTypeFilter, id],
      }),
      this.renderJobDetails,
    )
  }

  onRemovingTheEmploymentFilter = id => {
    const {employmentTypeFilter} = this.state
    const updatedFiltersList = employmentTypeFilter.filter(each => each !== id)
    this.setState(
      {employmentTypeFilter: updatedFiltersList},
      this.renderJobDetails,
    )
  }

  onFilterOnSalaryType = id => {
    this.setState({salaryFilter: id}, this.renderJobDetails)
  }

  onSearchOf = event => {
    this.setState({searchFilter: event.target.value})
  }

  onClickOnSearch = () => {
    const {searchFilter} = this.state
    this.setState({searchedJobName: searchFilter}, this.renderJobDetails)
  }

  renderOnSearchJob = () => {
    const {searchFilter} = this.state
    return (
      <div className="search-box-container">
        <input
          type="search"
          className="search-input"
          onChange={this.onSearchOf}
          placeholder="Search"
          value={searchFilter}
        />
        <button
          className="search-icon-button"
          type="button"
          testid="searchButton"
          onClick={this.onClickOnSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderFinalJobsPage = () => {
    const {jobsFetchStatus} = this.state

    switch (jobsFetchStatus) {
      case statusConst.success:
        return this.renderJobsOnSuccess()
      case statusConst.failure:
        return this.renderJobsOnFailure()
      case statusConst.loading:
        return this.renderLoading()
      case statusConst.noJobs:
        return this.renderOnNoJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="profile-and-jobs-container">
          <div className="profile-and-filters-container">
            {this.renderFinalProfile()}
            <FilterItem
              onFilterOnEmploymentType={this.onFilterOnEmploymentType}
              onFilterOnSalaryType={this.onFilterOnSalaryType}
              onRemovingTheEmploymentFilter={this.onRemovingTheEmploymentFilter}
            />
          </div>
          <div className="jobs-container">
            {this.renderOnSearchJob()}
            {this.renderFinalJobsPage()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
