import React from "react";
import SectionTitle from "../../../shared/sectionTitle/SectionTitle";
import service1 from "../../../../assets/image/icon/service1.png";
import service2 from "../../../../assets/image/icon/service2.png";
import service3 from "../../../../assets/image/icon/sevice3.png";
const Service = () => {
  return (
    <div className="mt-20 lg:flex gap-5 ">
      <div data-aos="fade-right" className="w-full lg:w-[30%]">
        <SectionTitle title={"What We Give"} />
        <h1 className="text-5xl font-bold">Best Features</h1>
        <h1 className="text-5xl mt-2">For You</h1>
        <p className="text-xs mt-4">
          We will provide the bast features for those of you who want to travel
          comfortably with your family.
        </p>
      </div>



      <div className=" lg:w-[70%] lg:flex items-center justify-evenly">
        <div data-aos="fade-right" className=" lg:w-56 h-44 shadow-lg flex items-center justify-center flex-col p-2">
          <img className="w-10" src={service1} alt="" />
          <h2 className="font-bold my-2">Lat’s of Choices </h2>
          <p className="text-xs ">
            We have provided several choices of destination and very cheap
            travelling packages
          </p>
        </div>

        <div data-aos="fade-right" className=" lg:w-56 h-44 shadow-lg flex items-center justify-center flex-col p-2">
          <img className="w-10" src={service2} alt="" />
          <h2 className="font-bold my-2">Easy Booking </h2>
          <p className="text-xs ">
            We will also make it easier for users to book tickets or book the
            place you want
          </p>
        </div>

        <div data-aos="fade-right" className=" lg:w-56 h-44 shadow-lg flex items-center justify-center flex-col p-2">
          <img className="w-10" src={service3} alt="" />
          <h2 className="font-bold my-2">Bast Tour Guide</h2>
          <p className="text-xs ">
            We provide professional tour guide and provide and people who
            understand the place
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
