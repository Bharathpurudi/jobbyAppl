import {GoLocation, GoCloudDownload} from 'react-icons/go'
import {FiPhone} from 'react-icons/fi'
import {FaLinkedinIn} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import {saveAs} from 'file-saver'
import Header from '../Header'
import './index.css'

const UserProfile = () => {
  const saveFile = () => {
    saveAs(
      'https://res.cloudinary.com/dhyg2tdfb/raw/upload/v1637672391/BharathPurudiResume_qv2pdx.docx',
      'BharathPurudi.docx',
    )
  }
  return (
    <div className="user-profile-main-container">
      <Header />
      <div className="user-profile-container">
        <div className="background-image-profile-image-container">
          <img
            src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637651836/BharathPurudiPP_vckyod.jpg"
            alt="profile"
            className="user-profile-image"
          />
        </div>
        <div className="title-and-summary-container">
          <h1 className="name">BHARATH PURUDI</h1>
          <p className="designation">
            Electrical Engineer, Full Stack Developer trainee at NxtWave.
          </p>
          <div className="location-info-container">
            <GoLocation className="icon-class" />
            <p className="location-info">Rayadurg, Andhra Pradesh, India</p>
          </div>
          <h1 className="name">Contact Info</h1>
          <div className="contact-info-container">
            <div className="location-info-container">
              <FiPhone className="icon-class" />
              <p className="location-info ">9177550809</p>
            </div>
            <div className="location-info-container">
              <HiOutlineMail className="icon-class" />
              <p className="location-info ">bharathpurudi.tech@gmail.com</p>
            </div>
            <div className="location-info-container">
              <FaLinkedinIn className="icon-class" />
              <a
                href="https://www.linkedin.com/in/bharathpurudi-0809/"
                className="location-info "
              >
                bharathpurudi-0809/
              </a>
            </div>
          </div>
        </div>
        <div className="resume-container">
          <GoCloudDownload className="download-icon" />
          <button onClick={saveFile} className="download-resume" type="button">
            Download Resume
          </button>
        </div>
        <div className="education-experience-container">
          <div className="education-main-container">
            <div className="education-container">
              <h1 className="education-title">Education</h1>
              <div className="college-container">
                <h1 className="education-title">Bachelors in Technology</h1>
                <p className="stream-name">
                  Electrical and Electronics Engineering
                </p>
                <div className="year-cgpa-container">
                  <p className="stream-name">
                    Year of Passing: <span className="year-bold">2018</span>
                  </p>
                  <p className="stream-name">
                    CGPA: <span className="year-bold">7.3</span>
                  </p>
                </div>
                <p className="stream-name">
                  Sree Vidyanikethan Engineering College,Tirupati.
                </p>
              </div>
              <div className="college-container">
                <h1 className="education-title">Diploma</h1>
                <p className="stream-name">
                  Diploma in Electrical and Electronics Engineering
                </p>
                <div className="year-cgpa-container">
                  <p className="stream-name">
                    Year of Passing: <span className="year-bold">2015</span>
                  </p>
                  <p className="stream-name">
                    Percentage: <span className="year-bold">89.45</span>
                  </p>
                </div>
                <p className="stream-name">
                  Dr. Y.C James Yen Govt Polytechnic College,Kuppam.
                </p>
              </div>
            </div>
            <div className="skill-container">
              <h1 className="education-title">Skills</h1>
              <ul className="skills-list">
                <li className="skill-name">React.Js</li>
                <li className="skill-name">Node.Js</li>
                <li className="skill-name">Express.Js</li>
                <li className="skill-name">MongoDB</li>
                <li className="skill-name">Python</li>
                <li className="skill-name">Java Script</li>
                <li className="skill-name">HTML & CSS</li>
                <li className="skill-name">SQL</li>
              </ul>
            </div>
          </div>
          <div className="education-main-container">
            <h1 className="education-title">Professional Experience</h1>
            <div className="college-container">
              <h1 className="education-title">Senior Engineer</h1>
              <p className="stream-name">Greenko Energy Project Ltd</p>
              <p className="stream-name">
                Duration:{' '}
                <span className="year-bold">Oct-2020 to Jul-2021</span>
              </p>
              <p className="stream-name">Pavagada, Karnataka</p>
              <ul className="roles-and-responsibilities-list">
                <li className="stream-name">
                  Performed daily operations and maintenance on a wide range of
                  equipment in 220/33 kV pooling substation
                </li>
                <li className="stream-name">
                  Efficiently performed the preventive and predictive
                  maintenance schedules with the active collaboration of 20
                  people team and achieved continuous grid uptime for a
                  consistent 83 days without breakdown.
                </li>
              </ul>
            </div>
            <div className="college-container">
              <h1 className="education-title">Senior Electrical Engineer</h1>
              <p className="stream-name">Zunroof Tech Pvt Ltd</p>
              <p className="stream-name">
                Duration:{' '}
                <span className="year-bold">Dec-2019 to Jul-2020</span>
              </p>
              <p className="stream-name">Hyderabad, Telangana</p>
              <ul className="roles-and-responsibilities-list">
                <li className="stream-name">
                  Handled the site surveying, designing, simulating and
                  installation of 800 kW capacity residential solar rooftop
                  plants in Hyderabad.
                </li>
                <li className="stream-name">
                  Handled the 10 plus Installation and Commissioning vendor
                  teams for timely completion of projects.
                </li>
              </ul>
            </div>
            <div className="college-container">
              <h1 className="education-title">Site Incharge</h1>
              <p className="stream-name">Sri Sai Electricals </p>
              <p className="stream-name">
                Duration:{' '}
                <span className="year-bold">May-2018 to Dec-2019</span>
              </p>
              <p className="stream-name">Kolar, Karnataka</p>
              <ul className="roles-and-responsibilities-list">
                <li className="stream-name">
                  Maintained the daily operations and maintenance activities of
                  a 20 MW ground-mounted solar power plant.
                </li>
                <li className="stream-name">
                  Achieved the peak (99.89%) capacity generation with proper
                  preventive and predictive maintenance activities and
                  maintained a minimum TAT to minimize power generation loss.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
