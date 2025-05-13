import React, { useState } from 'react';
import { userImg } from '../../../../provider/ImageProvider';
import { Rating } from '@mui/material';

const HotelReview = () => {
  const [viewImage, setViewImage] = useState('');
  return (
    <div>
      {hotelReviews.map((review, i) => {
        const { userName, createdAt, rating, userAvatar, images, comment } = review;

        return ([
          <div key={i} className='p-2 w-full h-auto'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <img className='w-14 h-14 rounded-full ' src={userAvatar || userImg} alt="" />
                <div>
                  <h2 className='lg:text-lg font-medium text-Headings'>{userName}</h2>
                  <p className='text-sm text-gray-500 font-medium'>{new Date(createdAt || new Date).toISOString().split('T')[0]}</p>
                </div>
              </div>
              <div>
                <span><Rating value={rating} readOnly sx={{ fontSize: '16px' }} /></span>
              </div>
            </div>

            <div>
              <p className='text-[12px] mt-2 text-Headings/90 font-semibold '>{comment}</p>
            </div>

            <div className='flex  space-x-2 mt-2'>
              {images?.map((img, i) => (
                <img key={i} className='w-20 h-20 rounded-xl cursor-pointer' src={img} alt={`image-${i}`} />
              ))}
            </div>
<hr className=' mt-3' />
          </div>
          
        ])
      })}
      


      <div></div>
    </div>
  );
};

export default HotelReview;

export const hotelReviews = [
  {
    "userName": "John Doe",
    "userEmail": "john.doe@example.com",
    "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdLZAJzeEA2iYjsrN4CEXrg8ATQ1tB04blQ&s",
    "hotelId": "H12345",
    "rating": 5,
    "comment": "Amazing hotel with great service!",
    "images": [
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/hotel_images/large-MELRQ70MQgWhatsApp%20Image%202024-12-13%20at%2019.23.15_f4880019.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/room_images/5375083/large-4TmamalyDlSuperior%20Deluxe%20Suite.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/hotel_images/large-MELRQ70MQgWhatsApp%20Image%202024-12-13%20at%2019.23.15_f4880019.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/room_images/5375083/large-4TmamalyDlSuperior%20Deluxe%20Suite.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/hotel_images/large-MELRQ70MQgWhatsApp%20Image%202024-12-13%20at%2019.23.15_f4880019.jpg",
      

    ],
    "createdAt": "2025-02-02T10:00:00.000Z",
    "updatedAt": "2025-02-24T10:00:00.000Z"
  },
  {
    "userName": "Alice Smith",
    "userEmail": "alice.smith@example.com",
    "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdLZAJzeEA2iYjsrN4CEXrg8ATQ1tB04blQ&s",
    "hotelId": "H67890",
    "rating": 4,
    "comment": "Very comfortable stay, but breakfast could be better.",
    "images": [
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/hotel_images/large-MELRQ70MQgWhatsApp%20Image%202024-12-13%20at%2019.23.15_f4880019.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/room_images/5375083/large-4TmamalyDlSuperior%20Deluxe%20Suite.jpg"
    ],
    "createdAt": "2025-01-24T12:30:00.000Z",
    "updatedAt": "2025-02-24T12:30:00.000Z"
  },
  {
    "userName": "Michael Johnson",
    "userEmail": "michael.j@example.com",
    "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdLZAJzeEA2iYjsrN4CEXrg8ATQ1tB04blQ&s",
    "hotelId": "H11111",
    "rating": 3,
    "comment": "Decent place, but the room was smaller than expected.",
    "images": [],
    "createdAt": "2025-02-23T15:45:00.000Z",
    "updatedAt": "2025-02-23T15:45:00.000Z"
  },
  {
    "userName": "Sophia Brown",
    "userEmail": "sophia.b@example.com",
    "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdLZAJzeEA2iYjsrN4CEXrg8ATQ1tB04blQ&s",
    "hotelId": "H54321",
    "rating": 5,
    "comment": "Absolutely loved the spa and pool area! Highly recommended.",
    "images": [
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/hotel_images/large-MELRQ70MQgWhatsApp%20Image%202024-12-13%20at%2019.23.15_f4880019.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/room_images/5375083/large-4TmamalyDlSuperior%20Deluxe%20Suite.jpg"
    ],
    "createdAt": "2025-02-22T08:15:00.000Z",
    "updatedAt": "2025-02-22T08:15:00.000Z"
  },
  {
    "userName": "David Wilson",
    "userEmail": "david.w@example.com",
    "userAvatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdLZAJzeEA2iYjsrN4CEXrg8ATQ1tB04blQ&s",
    "hotelId": "H99999",
    "rating": 2,
    "comment": "Not worth the price. The staff was rude, and the room was not clean.",
    "images": [
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/hotel_images/large-MELRQ70MQgWhatsApp%20Image%202024-12-13%20at%2019.23.15_f4880019.jpg",
      "https://storage.googleapis.com/gz-main-prod-main/media/hotel/688862/gozayaan/room_images/5375083/large-4TmamalyDlSuperior%20Deluxe%20Suite.jpg"
    ],
    "createdAt": "2025-02-21T18:20:00.000Z",
    "updatedAt": "2025-02-21T18:20:00.000Z"
  }
]
