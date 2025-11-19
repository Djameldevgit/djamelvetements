import React, { useMemo } from 'react';
import Carousel from '../../Carousel';
import { useTranslation } from "react-i18next";

const ImageOverlay = ({
  post,
  isDetailPage,
  showInfo,
  styles,
  handleImageClick,
  handleTouchStart,
  handleTouchEnd,
  navigateToDetail,
  setShowOptionsModal,
  isLike,
  loadLike,
  saved,
  saveLoad,
  handleLike,
  handleUnLike,
  handleSavePost,
  handleUnSavePost,
  handleShare,
  viewsCount,
  t,
  auth
}) => {

  // Componente de botón de acción memoizado
  const ActionButton = React.memo(({ icon, color, onClick, count, loading }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <div
        style={styles.actionButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        }}
        onClick={onClick}
      >
        <span className="material-icons" style={{ fontSize: "22px", color, transition: "all 0.3s ease" }}>
          {loading ? "hourglass_empty" : icon}
        </span>
      </div>
      {count !== undefined && (
        <span style={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "white",
          textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
          minWidth: "20px",
          textAlign: "center"
        }}>
          {count}
        </span>
      )}
    </div>
  ));

  return (
    <>
      {/* Botón de opciones */}
      <div style={styles.optionsButton}>
        <div
          style={styles.iconCircle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowOptionsModal(true);
          }}
        >
          <span className="material-icons" style={{ fontSize: "18px", color: "white" }}>
            more_vert
          </span>
        </div>
      </div>

      {/* Información del post */}
      <div style={styles.infoContainer}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: showInfo ? "8px" : "0px",
          transition: 'margin-bottom 0.3s ease'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: "clamp(14px, 2vh, 18px)",
              fontWeight: "bold",
              marginBottom: "2px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: showInfo ? 1 : 0,
              transform: showInfo ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'all 0.3s ease 0.1s'
            }}>
              <span>{post?.subCategory || t('default_category')}</span>
              <span>{post?.destinacionvoyage1 || post?.destinacionvoyage2 || post?.paysDestination}</span>
              {post.user?.isVerified && (
                <span className="material-icons" style={{ fontSize: "16px", color: "#0095f6" }}>
                  verified
                </span>
              )}
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "clamp(10px, 1.5vh, 12px)",
              opacity: showInfo ? 0.9 : 0,
              transform: showInfo ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'all 0.3s ease 0.15s'
            }}>
              <span className="material-icons" style={{ fontSize: "12px" }}>schedule</span>
              <div>
                {post?.wilaya} {post?.datedepar}
              </div>
            </div>
          </div>

          <button
            onClick={navigateToDetail}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "clamp(10px, 1.5vh, 12px)",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              opacity: showInfo ? 1 : 0,
              transform: showInfo ? 'translateX(0)' : 'translateX(10px)'
            }}
          >
            <span>{t('details')}</span>
            <span className="material-icons" style={{ fontSize: "14px" }}>arrow_forward</span>
          </button>
        </div>

        {post.title && (
          <div style={{
            fontSize: "clamp(12px, 1.5vh, 14px)",
            opacity: showInfo ? 0.95 : 0,
            lineHeight: "1.3",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: showInfo ? "4px" : "0px",
            transform: showInfo ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s ease 0.25s'
          }}>
            <strong className='text-warning'>Départ: </strong> {post.commune} : {post.wilaya}
          </div>
        )}
      </div>

      {!showInfo && (
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "4px 12px",
          borderRadius: "15px",
          fontSize: "11px",
          fontWeight: "500",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer"
        }}>
          <span className="material-icons" style={{ fontSize: "14px", marginRight: "4px" }}>
            touch_app
          </span>
          {t('tap_to_see_info')}
        </div>
      )}

      {/* Botones de acción */}
      <div style={styles.actionButtonContainer}>
        <ActionButton
          icon="favorite"
          color={isLike ? "#F91880" : "white"}
          onClick={(e) => {
            e.stopPropagation();
            isLike ? handleUnLike() : handleLike();
          }}
          count={post.likes.length}
          loading={loadLike}
        />

        <ActionButton
          icon="visibility"
          color="#00D4AA"
          onClick={(e) => e.stopPropagation()}
          count={viewsCount}
        />

        <ActionButton
          icon="bookmark"
          color={saved ? "#ff8c00" : "white"}
          onClick={(e) => {
            e.stopPropagation();
            saved ? handleUnSavePost() : handleSavePost();
          }}
          loading={saveLoad}
        />

        <ActionButton
          icon="share"
          color="#4FC3F7"
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
        />
      </div>

      <div className="card" style={{ height: "100%" }}>
        <div
          className="card__image"
          onClick={navigateToDetail}
          style={{ height: "100%", cursor: 'pointer' }}
        >
          <div style={{ height: "100%" }}>
            <Carousel images={post.images} id={post._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ImageOverlay);