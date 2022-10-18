// import { Component } from 'react';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';

import { Box } from './Box';

import { getImages } from 'api/api';

export const App = () => {
  // state = {
  //   gallery: [],
  //   searchQuery: '',
  //   page: 1,
  //   loading: false,
  //   error: false,
  //   showModal: false,
  //   largeImageURL: null,
  // };

  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function updateGallery() {
      try {
        setLoading(true);
        const data = await getImages(searchQuery, page);
        if (!data.hits.length) {
          return toast.error(
            'There is no images with this request, please, try again'
          );
        }
        setGallery(gallery => [...gallery, ...data.hits]);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    updateGallery();
  }, [searchQuery, page]);

  const onSubmit = searchQuery => {
    setGallery([]);
    setSearchQuery(searchQuery);
    setLoading(true);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
    setLoading(true);
  };

  const showModalImg = () => {
    setShowModal(showModal => !showModal);
  };

  const onClickGalleryImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  return (
    <Box
      as="main"
      position="relative"
      display="grid"
      gridTemplateColumns="1fr"
      gridGap={16}
      pb={24}
    >
      <Searchbar onSubmit={onSubmit} />
      {error && toast.warning(`Something went wrong`)}
      <ImageGallery gallery={gallery} openModal={onClickGalleryImage} />
      {loading && (
        <Box mx="auto">
          <Loader />
        </Box>
      )}
      {gallery.length > 0 && <Button onClick={onLoadMore} />}
      {showModal && <Modal onClose={showModalImg} url={largeImageURL} />}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </Box>
  );
};
