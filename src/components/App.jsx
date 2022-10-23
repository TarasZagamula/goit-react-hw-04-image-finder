import { useState, useEffect } from 'react';
import { TextButton } from './Button/TextButton/TextButton';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const App = () => {

  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(null)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    if (!searchValue) {return};
    setShowLoader(true)
    fetch(
      `https://pixabay.com/api/?key=29344030-4477c2161924855e32deae646&q=${searchValue}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        if (page !== 1) {return setSearchData(prev => [...prev, ...data.hits]);};
        setSearchData(data.hits);
        }).then(setShowLoader(false));
  }, [page, searchValue]);

  const loadMore = () => {
    setPage(prev => prev + 1)
  };

  const  searchSet = data => {
    setSearchValue(data)
    setPage(1);
  };

  const resetShowModal = () => {
      setShowModal(null)
  };

  const modalImgSet = selectedImg => {
    setShowModal(selectedImg);
  };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={searchSet} />
        <ImageGallery searchData={searchData} onItemClick={modalImgSet} />
        {searchData.length > 0 && (
          <TextButton onClick={loadMore} children="load more" />
        )}
        {showModal && (
          <Modal closeModal={resetShowModal} data={showModal} />
        )}
        {showLoader && <Loader />}
      </div>
    );
  
}

export default App;
