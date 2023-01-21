import {AiOutlineSearch} from 'react-icons/ai'
import './index.css'

const FiltersGroup = props => {
  const searchInput = () => {
    console.log('search')
    return (
      <div>
        <input type="search" />
        <AiOutlineSearch />
      </div>
    )
  }

  const renderCategories = () => {
    const {categoryOptions} = props
    return categoryOptions.map(category => {
      console.log('category')
      return <li>{category.name}</li>
    })
  }

  const renderRatings = () => {
    const {ratingsList} = props
    return ratingsList.map(rating => {
      console.log('rating')
      return (
        <li>
          <img src={rating.imageUrl} alt="rating" />
        </li>
      )
    })
  }

  return (
    <div className="filters-group-container">
      {searchInput()}
      {renderCategories()}
      {renderRatings()}
    </div>
  )
}

export default FiltersGroup
