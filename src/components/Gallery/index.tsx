import React, { Component } from 'react'
import getData, { IData } from '../../utilities/getData'

import SearchForm from './SearchForm'
import ImageGallery from './ImageGallery'
import Button from './Button'
import Loader from './Loader'
import Modal from './Modal'

interface IGallery {
  page: number
  per_page: number
  q: string
  loading: boolean
  errorMessage: string
  hits: IData['hits']
  total: number
  totalHits: number
  isModalOpen: boolean
  modalUrl: string
}

export class Gallery extends Component {
  state: IGallery = {
    page: 1,
    per_page: 12,
    q: '',
    loading: false,
    errorMessage: '',
    hits: [],
    total: 0,
    totalHits: 0,
    isModalOpen: false,
    modalUrl: ''
  }

  updateState = async (): Promise<void> => {
    this.setState({ loading: true })
    const { per_page: perPage, q } = this.state
    const data = await getData({ per_page: perPage, page: 1, q })
      .catch((error) => this.setState({ errorMessage: error.message }))
    this.setState({ loading: false, hits: data?.hits, total: data?.total, totalHits: data?.totalHits })
  }

  loadMore = async (): Promise<void> => {
    this.setState({ loading: true })
    const { page, per_page: perPage, q } = this.state
    const data = await getData({ per_page: perPage, page, q })
      .catch((error) => this.setState({ errorMessage: error.message }))
    if (data !== undefined) {
      this.setState((prevState: IGallery) => {
        return {
          loading: false,
          hits: [...prevState.hits, ...data?.hits],
          total: data?.total,
          totalHits: data?.totalHits,
          loadMore: false
        }
      })
    }
  }

  componentDidUpdate (prevProps: Readonly<{}>, prevState: IGallery): void {
    if (prevState.q !== this.state.q) {
      void this.updateState()
    }
    if (prevState.page !== this.state.page) {
      void this.loadMore()
    }
  }

  updateQ = (qValue: string): void => {
    this.setState({ q: qValue })
  }

  toggleModal = (modalUrl = ''): void => {
    this.setState((prevState: IGallery) => ({
      modalUrl,
      isModalOpen: !prevState.isModalOpen
    }))
  }

  changePage = (): void => {
    this.setState((prevState: IGallery) => ({
      page: prevState.page + 1
    }))
  }

  render (): JSX.Element {
    const pages = Math.ceil(this.state.totalHits / this.state.per_page)
    return <>
      {this.state.loading && <Loader />}
      <SearchForm updateQ={this.updateQ} q={this.state.q} updateState={this.updateState} />
      <ImageGallery hits={this.state.hits} toggleModal={this.toggleModal}/>
      {(this.state.hits.length > 0) && (pages > this.state.page) && <Button changePage={this.changePage}/>}
      {(this.state.isModalOpen) && <Modal modalUrl={this.state.modalUrl} toggleModal={this.toggleModal} />}

    </>
  }
}

export default Gallery
