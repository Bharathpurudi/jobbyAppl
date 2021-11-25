import {Link} from 'react-router-dom'
import {BsStar, BsBriefcase} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const JobDetail = props => {
  const renderJobDetail = () => {
    const {jobDetails} = props
    const {
      companyLogoUrl,
      id,
      employmentType,
      title,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
    } = jobDetails

    return (
      <Link className="link-item" to={`/jobs/${id}`}>
        <li className="job-list-item">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-and-rating-container">
              <h1 className="company-title">{title}</h1>
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
          <h1 className="description-heading">Description</h1>
          <p className="description-content">{jobDescription}</p>
        </li>
      </Link>
    )
  }

  return <>{renderJobDetail()}</>
}

export default JobDetail
