import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStar, BsBriefcase} from 'react-icons/bs'
import {GoLinkExternal, GoLocation} from 'react-icons/go'
import Header from '../Header'

import SimilarItem from '../SimilarItem'
import './index.css'

const statusConst = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificJobDetail extends Component {
  state = {fetchingStatus: statusConst.initial, specificJobDetails: {}}

  componentDidMount() {
    this.getTheSpecificJobDetail()
  }

  getTheSpecificJobDetail = async () => {
    this.setState({fetchingStatus: statusConst.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.setState({specificJobDetails: data})
      this.setState({fetchingStatus: statusConst.success})
    } else {
      this.setState({fetchingStatus: statusConst.failure})
    }
  }

  renderOnSuccess = () => {
    const {specificJobDetails} = this.state
    const jobDetails = specificJobDetails.job_details
    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      packagePerAnnum: jobDetails.package_per_annum,
      location: jobDetails.location,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }
    const skillsList = jobDetails.skills
    const updatedSkillsList = skillsList.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))
    const lifeAtCompany = jobDetails.life_at_company
    const updatedLifeAtCompany = {
      description: lifeAtCompany.description,
      lacImageUrl: lifeAtCompany.image_url,
    }
    const similarJobsList = specificJobDetails.similar_jobs
    const updatedSimilarJobsList = similarJobsList.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      title: each.title,
      location: each.location,
      rating: each.rating,
    }))

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      title,
    } = updatedJobDetails
    const {description, lacImageUrl} = updatedLifeAtCompany

    return (
      <div className="jobs-and-similar-jobs-container">
        <div className="job-detail-container">
          <div className="title-lpa-container">
            <div className="title-and-logo-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt=" job details company logo"
              />
              <div className=".title-and-rating-container">
                <h1 className="company-title-1">{title}</h1>
                <div className="rating-container">
                  <BsStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-and-lpa-container">
              <div className="location-employment-type-container">
                <div className="location-employment-type-container">
                  <GoLocation className="location-icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="location-employment-type-container">
                  <BsBriefcase className="location-icon" />
                  <p className="location">{employmentType}</p>
                </div>
              </div>
              <p className="company-title">{packagePerAnnum}</p>
            </div>
          </div>
          <div className="description-container">
            <div className="description-and-website-url-container">
              <h1 className="description-title">Description</h1>
              <button className="visit-button" type="button">
                <a className="visit-text" href={companyWebsiteUrl}>
                  Visit
                </a>
                <GoLinkExternal className="external-link" />
              </button>
            </div>
          </div>
          <p className="job-description-content">{jobDescription}</p>
          <h1 className="skill-set-heading">Skills</h1>
          <ul className="skill-set-container">
            {updatedSkillsList.map(eachSkillSet => (
              <li className="skill-set-item" key={eachSkillSet.name}>
                <img
                  src={eachSkillSet.imageUrl}
                  alt={eachSkillSet.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachSkillSet.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <div className="l-a-c-content-container">
              <h1 className="skill-set-heading ">Life At Company</h1>
              <p className="job-description-content">{description}</p>
            </div>
            <img
              src={lacImageUrl}
              alt="life at company"
              className="l-a-c-image"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {updatedSimilarJobsList.map(eachSimilarJob => (
              <SimilarItem
                similarJobDetails={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  retryJobs = () => {
    this.getTheSpecificJobDetail()
  }

  renderOnFailure = () => (
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

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSpecificJobDetail = () => {
    const {fetchingStatus} = this.state

    switch (fetchingStatus) {
      case statusConst.success:
        return this.renderOnSuccess()
      case statusConst.failure:
        return this.renderOnFailure()
      case statusConst.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-job-detail-container">
        <Header />
        {this.renderSpecificJobDetail()}
      </div>
    )
  }
}

export default SpecificJobDetail
