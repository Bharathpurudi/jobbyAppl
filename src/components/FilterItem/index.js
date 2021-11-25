import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    id: uuidV4(),
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    id: uuidV4(),
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    id: uuidV4(),
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    id: uuidV4(),
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
    id: uuidV4(),
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
    id: uuidV4(),
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
    id: uuidV4(),
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
    id: uuidV4(),
  },
]

class FilterItem extends Component {
  onCheckOnCheckbox = event => {
    const {onFilterOnEmploymentType, onRemovingTheEmploymentFilter} = this.props
    const targetValue = event.target.value
    if (event.target.checked === true) {
      onFilterOnEmploymentType(targetValue)
    } else {
      onRemovingTheEmploymentFilter(targetValue)
    }
  }

  onCheckOnRadioButton = event => {
    const {onFilterOnSalaryType} = this.props
    if (event.target.checked === true) {
      onFilterOnSalaryType(event.target.value)
    }
  }

  render() {
    return (
      <div className="filters-container">
        <h1 className="employment-filter-title">Type of Employment</h1>
        <ul className="employment-type-filter-list">
          {employmentTypesList.map(eachEmployment => (
            <li className="employment-list-Item" key={eachEmployment.id}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="check-box"
                  value={eachEmployment.employmentTypeId}
                  onChange={this.onCheckOnCheckbox}
                />
                {eachEmployment.label}
              </label>
            </li>
          ))}
        </ul>
        <h1 className="employment-filter-title" key={1}>
          Salary Range
        </h1>
        <ul className="employment-type-filter-list">
          {salaryRangesList.map(salaryItem => (
            <li className="employment-list-Item" key={salaryItem.id}>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="salary"
                  className="check-box"
                  value={salaryItem.salaryRangeId}
                  onChange={this.onCheckOnRadioButton}
                />
                {salaryItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default FilterItem
