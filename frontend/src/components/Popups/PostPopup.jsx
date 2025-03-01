// import React, { useState, useEffect } from 'react';
// import { MdOutlineClose } from "react-icons/md";
// import Button from '../Button/Button';

// const PostPopup = ({ open, onClose }) => {

// 	const [isVisible, setIsVisible] = useState(false);
// 	const [mountComponent, setMountComponent] = useState(false);

// 	useEffect(() => {
// 		if (open) {

// 			setMountComponent(true);
// 			const timer = setTimeout(() => {
// 				setIsVisible(true);
// 			}, 10);
// 			return () => clearTimeout(timer);
// 		} else {
// 			setIsVisible(false);
// 			const timer = setTimeout(() => {
// 				setMountComponent(false);
// 			}, 300);
// 			return () => clearTimeout(timer);
// 		}
// 	}, [open]);


// 	if (!mountComponent) {
// 		return null;
// 	}

// 	return (
// 		<div
// 			className={`z-20 fixed top-0 bottom-0 left-0 right-0 flex-center bg-[#00000080] backdrop-blur-[4px] transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
// 			onClick={onClose}
// 		>
// 			<div
// 				className={`max-w-full w-[600px] bg-white rounded-md transition-all duration-300 ease-out transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-[100px]'}`}
// 				onClick={(e) => e.stopPropagation()}
// 			>
// 				<div className="flex justify-between items-center h-[50px] p-8">
// 					<h3>Create a post</h3>
// 					<MdOutlineClose className="cursor-pointer" onClick={onClose} size={20}/>
// 				</div>
// 				<div className='border-b border-slate-400' />

// 				<div className='p-8'>
// 					<textarea className='w-full outline-none h-[300px]' placeholder='What do you want to talk about?' autoFocus/>                        
// 				</div>

// 				<div className='border-b border-slate-400' />

// 				<div className='py-4 px-8 flex gap-2 justify-end'>
// 					<div className='w-[100px]'>
// 						<Button varient={'outlined'} color='slate-700' onClick={onClose}>Cancle</Button>
// 					</div>
// 					<div className='w-[100px]'>
// 						<Button varient={'contained'} color='slate-700'>Post</Button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default PostPopup;

import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from "react-icons/md";
import Button from '../Button/Button';

const PostPopup = ({ open, onClose }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [mountComponent, setMountComponent] = useState(false);
  const [image, setImage] = useState(null); // State to store the selected image
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    if (open) {
      setMountComponent(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setMountComponent(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mountComponent) {
    return null;
  }

  return (
    <div
      className={`z-20 fixed top-0 bottom-0 left-0 right-0 flex-center bg-[#00000080] backdrop-blur-[4px] transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`max-w-full w-[600px] bg-white rounded-md transition-all duration-300 ease-out transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-[100px]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center h-[50px] p-8">
          <h3>Create a post</h3>
          <MdOutlineClose className="cursor-pointer" onClick={onClose} size={20} />
        </div>
        <div className='border-b border-slate-400' />

        <div className='p-8'>
          <textarea className='w-full outline-none h-[300px]' placeholder='What do you want to talk about?' autoFocus />
          
          {/* Image Upload Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Upload an image</label>
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-full h-[200px] object-cover rounded-md" />
              </div>
            )}
          </div>
        </div>

        <div className='border-b border-slate-400' />

        <div className='py-4 px-8 flex gap-2 justify-end'>
          <div className='w-[100px]'>
            <Button variant={'outlined'} color='slate-700' onClick={onClose}>Cancel</Button>
          </div>
          <div className='w-[100px]'>
            <Button variant={'contained'} color='slate-700'>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
