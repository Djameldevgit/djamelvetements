// DetailPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadIcon from '../../images/loading.gif';
import DetailPostCard from '../../components/DetailPostCard'; // Solo imagen + descripción
import { getPost } from "../../redux/actions/postAction";
// ELIMINA los imports de InputComment y Comments

const DetailPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const detailPost = useSelector(state => state.detailPost.detailPost);
  
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getPost({ detailPost, id, auth }));
    }
  }, [dispatch, id, auth, detailPost]);

  // aumentar views
  

  // seleccionar post del array
  useEffect(() => {
    const found = detailPost.find(p => p._id === id);
    if (found) setPost(found);
  }, [detailPost, id]);

  if (!post) return (
    <div className="loading-container">
      <img src={LoadIcon} alt="loading" className="loading-spinner" />
    </div>
  );

  return (
    <div>
      {/* SOLO el DetailPostCard - que incluye CardBodyCarousel + DescriptionPost */}
      <DetailPostCard post={post} />
      
      {/* NO renderizar InputComment y Comments aquí */}
      {/* Los comentarios se manejan exclusivamente a través del modal en CardBodyCarousel */}
    </div>
  );
};

export default DetailPost;