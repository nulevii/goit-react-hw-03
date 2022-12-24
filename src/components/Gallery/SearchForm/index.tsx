import React from 'react'
import style from '../styles.module.css'
function SearchForm (): JSX.Element {
  return (
    <header className={style.searchForm}>
  <form className="form">
  <button type="submit">&#128269; </button>
    <input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>

  )
}

export default SearchForm
