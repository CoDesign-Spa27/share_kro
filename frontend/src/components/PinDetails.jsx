import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
 
import { useTheme } from "../contexts/ThemeContext";

import MasonryLayout from "./MasonryLayout";

import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetails = ({ user }) => {
  const {theme}=useTheme()

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();
 
 
  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };
 const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) {
    return <Spinner message="Loading Pin Details" />;
  }
  return (
    <>
    <div
      className="flex  xl-flex-row  flex-col m-auto  "
      style={{ maxWidth: "1200px", borderRadius: "32px" ,color: theme === 'light' ? 'black' : 'white' }}
  

    >
      <div className="flex justify-center items-center md:items-start flex-initial ">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          className="rounded-t-2xl rounded-b-lg w-2/4 sm:w-3/12"
          alt="user-Post"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex  items-center justify-center">
          <div className="flex  gap-20 items-center">
            <a
              href={`${pinDetail?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="  w-9 h-9 rounded-full flex items-center my-2 justify-center  text-3xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
            >
              <MdDownloadForOffline />
            </a>
         
          <a href={pinDetail.destination} 
             className=" bg-[#00afb9] flex items-center gap-2   font-bold p-2 pl-4 pr-4 rounded-full opacity-90 hover:opacity-100 hover:shadow-lg "
          target="_blank" rel="noreffer">
       Image Link
          </a>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold break-words mt-3">
            {pinDetail.title}
          </h1>
          <p className="mt-3 capitalize">{pinDetail.about}</p>
        </div>
        {/* //fetching user image and name which tells  which user is uploaded the image */}
        <Link
          to={`user-profile/${pinDetail.postedBy?._id}`}
          className="flex gap-2 mt-5 items-center   rounded-lg"
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={pinDetail.postedBy?.image}
            alt="user-profile"
          />
          <p className="font-semibold capitalize">
            {pinDetail.postedBy?.username}
          </p>
        </Link>


        <h2 className="mt-5 text-2xl">Comments<hr className="h-px   border-0 dark:bg-gray-700"></hr></h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment)=>(
            <div className="flex gap-2 mt-5 rounded-l-full items-center   rounded-lg">
              <img
              src={comment.postedBy.image}
              alt="user-profile"
              className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            <div className="flex flex-col">
                              <p 
                              className="font-bold"
                              >{comment.postedBy.username}</p>
                             <p>{comment.comment}</p>
                            </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3">
        <Link
          to={`user-profile/${pinDetail.postedBy?._id}`}
         
        >
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={pinDetail.postedBy?.image}
            alt="user-profile"
          />
        </Link>
        <input 
        className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-100"
        type="text"
        placeholder="Add a Comment"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        />
        <button
        type="button"
        onClick={addComment}
        className="bg-[#00afb9] text-white rounded-full px-6 py-2 font-semibold text-base outline-none "
        >
          {addingComment ? "Posting the commnet... " : " Post"}
        </button>
        </div>
        </div>
    </div>
    
   {pins?.length ? (
    <>
    <h2 className="text-center font-bold text-2xl mt-8 mb-4">
    More of like this
    </h2>
    <MasonryLayout pins={pins} />
    </>
     ):(<>
      <Spinner message="Loading more Pins" />
      </>)}
      </>
  )
}

export default PinDetails;
