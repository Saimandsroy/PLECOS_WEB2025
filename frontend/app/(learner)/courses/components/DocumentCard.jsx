'use client';

import styles from './DocumentCard.module.css';

const DocumentCard = ({ doc }) => {
  const formatViewCount = (count) => {
    if (typeof count !== 'number' || isNaN(count)) return '0';
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  return (
    <div className={styles.documentCard}>
      <div className={styles.documentInfo}>
        <h3 className={styles.documentTitle}>{doc.title}</h3>
        <div className={styles.documentMeta}>
          <span className={styles.documentType}>{doc.type}</span>
          <span className={styles.uploadedBy}>by {doc.uploadedBy}</span>
          <span className={styles.downloads}>{formatViewCount(doc.downloads)} downloads</span>
        </div>
      </div>
      <button className={styles.actionButton}>
        {doc.type === 'PDF' ? 'Download' : 'View'}
      </button>
    </div>
  );
};

export default DocumentCard;
