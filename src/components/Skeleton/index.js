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

export default SkeletonElement;
