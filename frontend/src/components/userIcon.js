// UserIcon.js
import React from 'react';

export function UserIcon({ imageUrl, size = "text-3xl" }) {
  return (
    <div className={`rounded-full overflow-hidden ${size}`}>
      <img src={imageUrl || '/default-user-image.png'} alt="User" className="w-full h-full object-cover" />
    </div>
  );
}

export default UserIcon;
