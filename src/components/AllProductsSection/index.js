import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const productsConstants = {
  initial: 'INITiAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    apiStatus: productsConstants.initial,
    categoryId: '',
    ratingId: '',
    searchValue: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: productsConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, categoryId, searchValue, ratingId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&title_search=${searchValue}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: productsConstants.success,
      })
    } else {
      this.setState({
        apiStatus: productsConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  // render products
  productView = () => {
    const {productsList} = this.state
    return (
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    )
  }

  // render no products view
  noProductsView = () => {
    console.log('no products view')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="products failure"
        />
        <h1>No Products Found</h1>
        <p>we could not find any products. try again other filters</p>
      </div>
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const showProducts = productsList.length > 0
    console.log(showProducts)
    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        {showProducts ? this.productView() : this.noProductsView()}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => {
    console.log('failure-view')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
        />
        <p>Oops! Something Went Wrong</p>
        <p>
          We are having some trouble processing request.
          <br />
          Please try again.
        </p>
      </div>
    )
  }

  // render diff cond
  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case productsConstants.success:
        return this.renderProductsList()
      case productsConstants.failure:
        return this.renderFailureView()
      case productsConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  // update category
  updateCategory = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }
  // update rating

  updateRating = ratingId => {
    this.setState({ratingId}, this.getProducts)
  }

  // enter search i/p
  searchValue = searchValue => {
    this.setState({searchValue}, this.getProducts)
  }

  // reset filters
  resetFilters = () => {
    this.setState(
      {
        productsList: [],
        activeOptionId: sortbyOptions[0].optionId,
        apiStatus: productsConstants.initial,
        categoryId: '',
        ratingId: '',
        searchValue: '',
      },
      this.getProducts,
    )
  }

  render() {
    // const {isLoading} = this.state
    const {ratingId, searchValue} = this.state
    console.log(ratingId)
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          updateCategory={this.updateCategory}
          updateRating={this.updateRating}
          searchValue={this.searchValue}
          searchVal={searchValue}
          resetFilters={this.resetFilters}
        />

        {/* isLoading ? this.renderLoader() : this.renderProductsList() */}
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
