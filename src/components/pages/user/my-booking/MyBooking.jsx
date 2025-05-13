import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useSecureApiEndPoint from "../../../../hooks/useSecureApiEndPoint";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const MyBooking = () => {
  const { user } = useAuth();
  const secureApiEndPoint = useSecureApiEndPoint();
  const ITEMS_PER_PAGE = 5;
  const [hasMore, setHasMore] = useState(true);
  const [displayedItems, setDisplayedItems] = useState([]);

  const { data: bookingData = [], isLoading } = useQuery({
    queryKey: ["bookingData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await secureApiEndPoint.get(
        `/your-hotel-bookings?email=${user?.email}`
      );
      return response.data.data || [];
    },
  });

  useEffect(() => {
    if (bookingData.length > 0) {
      setDisplayedItems(bookingData.slice(0, ITEMS_PER_PAGE));
      setHasMore(bookingData.length > ITEMS_PER_PAGE);
    }
  }, [bookingData]);

  const fetchMoreData = () => {
    if (displayedItems.length >= bookingData.length) {
      setHasMore(false);
      return;
    }
    const nextItems = bookingData.slice(
      displayedItems.length,
      displayedItems.length + ITEMS_PER_PAGE
    );
    setDisplayedItems(prevItems => [...prevItems, ...nextItems]);
    setHasMore(displayedItems.length + ITEMS_PER_PAGE < bookingData.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900">
        My Bookings
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-blue-600 font-semibold">Loading...</span>
        </div>
      ) : !bookingData.length ? (
        <div className="bg-blue-50 text-blue-700 p-6 rounded-lg text-center shadow">
          <p className="text-lg font-medium">You have no bookings yet.</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center h-20">
              <span className="text-blue-600 font-semibold">Loading 5 more bookings...</span>
            </div>
          }
          endMessage={
            <div className="text-center text-gray-500 mt-4">
              <p>No more bookings to load</p>
            </div>
          }
          scrollThreshold="90%"
        >
          <div className="grid gap-6">
            {displayedItems.map((booking) => (
              <div
                key={booking.tranjectionId}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-lg transition"
              >
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h2 className="text-lg font-bold text-blue-800">
                      {booking.roomName}
                    </h2>
                    <span className="ml-0 md:ml-4 text-sm text-gray-500">
                      Booking ID:{" "}
                      <span className="font-mono">{booking.tranjectionId}</span>
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
                    <div>
                      <Link to={`/to/hotel/${booking.hotelId}/hotel-deatils`} className="font-semibold text-blue-500">Hotel</Link>
                    </div>
                    <div>
                      <span className="font-semibold">Name:</span>{" "}
                      {booking.cusName}
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span>{" "}
                      {booking.cusEmail}
                    </div>
                    <div>
                      <span className="font-semibold">Phone:</span>{" "}
                      {booking.cunNumber}
                    </div>
                    <div>
                      <span className="font-semibold">Guests:</span>{" "}
                      {booking.bookingDetails?.adults || 0} Adult
                      {booking.bookingDetails?.children
                        ? `, ${booking.bookingDetails.children} Child`
                        : ""}
                    </div>
                    <div>
                      <span className="font-semibold">Created:</span>{" "}
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "—"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end min-w-[180px]">
                  <div>
                    <span className="font-semibold text-gray-700">Total:</span>{" "}
                    <span className="text-blue-700 font-bold">
                      ৳{booking.amount}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Paid (Advance):
                    </span>{" "}
                    <span className="text-green-600 font-bold">
                      ৳{booking.PartiallyPaid}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Due:
                    </span>{" "}
                    <span className="text-red-500 font-bold">
                      ৳{booking.restAmount}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.paymentStatus === "Partially Paid"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                  {/* <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-xs mt-2"
                    disabled={booking.paymentStatus !== "Partially Paid"}
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MyBooking;