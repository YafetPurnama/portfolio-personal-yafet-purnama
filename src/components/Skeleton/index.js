import React from 'react';
import './Skeleton.css';

export const SkeletonElement = ({ type, style, className = '' }) => {
  const classes = `skeleton ${type} ${className}`.trim();
  return <div className={classes} style={style}></div>;
};

export const SkeletonProfile = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-details">
          <SkeletonElement type="title" style={{ width: '60%', height: '32px' }} />
          <SkeletonElement type="text" style={{ width: '80%', height: '20px' }} />
          <SkeletonElement type="text" style={{ width: '70%', height: '20px' }} />
        </div>
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-card">
        <SkeletonElement type="thumbnail" />
        <div className="skeleton-content">
          <SkeletonElement type="title" style={{ width: '70%' }} />
          <SkeletonElement type="text" style={{ width: '90%' }} />
          <SkeletonElement type="text" style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );
};

export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={`skeleton-text-wrapper ${className}`}>
      {[...Array(lines)].map((_, index) => (
        <SkeletonElement 
          key={index} 
          type="text" 
          style={{
            width: index === lines - 1 ? '80%' : '100%',
            height: '16px',
            marginBottom: index < lines - 1 ? '12px' : '0'
          }} 
        />
      ))}
    </div>
  );
};

export const SkeletonButton = ({ width = '140px', height = '50px', className = '' }) => {
  return (
    <SkeletonElement 
      type="button" 
      className={className}
      style={{ width, height }}
    />
  );
};

export const SkeletonCertificate = () => {
  return (
    <div className="skeleton-wrapper" style={{ height: '100%', marginBottom: '30px' }}>
      <div className="skeleton-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Bagian Thumbnail PDF */}
        <SkeletonElement 
            type="thumbnail" 
            style={{ height: '220px', width: '100%', borderRadius: '5px 5px 0 0' }} 
        />
        
        {/* Bagian Content (Title & Meta) */}
        <div className="skeleton-content" style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* Title Placeholder */}
          <div style={{ marginBottom: '15px' }}>
            <SkeletonElement type="title" style={{ height: '24px', marginBottom: '8px' }} />
            <SkeletonElement type="text" style={{ width: '60%', height: '24px' }} />
          </div>

          {/* Meta Data Placeholder (Issuer & Date) */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <SkeletonElement type="text" style={{ width: '30%', height: '14px' }} />
              <SkeletonElement type="text" style={{ width: '30%', height: '14px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SkeletonElement type="text" style={{ width: '40%', height: '14px' }} />
              <SkeletonElement type="text" style={{ width: '40%', height: '14px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonElement;
