import {BsStar, BsBriefcase} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const SimilarItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-detail-card">
      <div className="title-and-logo-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="title-and-rating-container">
          <h1 className="company-title">{title}</h1>
          <div className="rating-container">
            <BsStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarItem
