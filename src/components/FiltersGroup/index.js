import {AiOutlineSearch} from 'react-icons/ai'
import './index.css'

const FiltersGroup = props => {
  const searchRequest = event => {
    const {searchValue} = props
    searchValue(event.target.value)
  }
  const searchInput = () => {
    console.log('search')
    const {searchVal} = props
    return (
      <div>
        <input type="search" onChange={searchRequest} value={searchVal} />
        <AiOutlineSearch />
      </div>
    )
  }

  const renderCategories = () => {
    const {categoryOptions, updateCategory} = props
    return categoryOptions.map(category => {
      console.log('category')
      const changeCategory = () => updateCategory(category.categoryId)
      return (
        <li onClick={changeCategory} key={category.categoryId}>
          {category.name}
        </li>
      )
    })
  }

  const renderRatings = () => {
    const {ratingsList, updateRating} = props
    return ratingsList.map(rating => {
      console.log('rating')
      const changeRating = () => updateRating(rating.ratingId)
      return (
        <li onClick={changeRating} key={rating.ratingId}>
          <img src={rating.imageUrl} alt="rating" />
        </li>
      )
    })
  }

  return (
    <div className="filters-group-container">
      {searchInput()}
      <h1>Category</h1>
      {renderCategories()}
      <h1>Rating</h1>
      {renderRatings()}
      <button type="button">Clear Filters</button>
    </div>
  )
}

export default FiltersGroup
