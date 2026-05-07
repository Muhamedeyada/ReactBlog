import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Modal, IconButton } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export default function OpenIconSpeedDial({ onPostSuccess }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setBlogTitle("");
    setBlogImg("");
    setDescription("");
  };

  const [blogTitle, setBlogTitle] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!blogTitle || !blogImg || !description) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/posts", {
        title: blogTitle,
        image: blogImg,
        description: description,
        user_email: localStorage.getItem("email"),
      });

      const blog = response.data;
      toast.success("Story beamed into the darkness! 🚀");
      handleClose();

      if (onPostSuccess) {
        onPostSuccess(blog);
      }
    } catch (error) {
      console.error(error);
      toast.error("Transmission failed.");
    }
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <SpeedDial
          ariaLabel="Add story"
          sx={{ '& .MuiFab-primary': { bgcolor: '#6366f1', '&:hover': { bgcolor: '#4f46e5' }, width: 68, height: 68, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' } }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClick={handleOpen}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center p-4 backdrop-blur-md"
      >
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative">
          <div className="absolute top-8 right-8">
            <IconButton onClick={handleClose} className="text-slate-400 hover:bg-white/5 transition-all">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="p-10 md:p-14">
            <div className="flex items-center space-x-5 mb-10">
              <div className="bg-indigo-600/20 p-4 rounded-2xl text-indigo-400 border border-indigo-500/20 shadow-inner">
                <FontAwesomeIcon icon={faPen} size="lg" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Broadcast Story</h2>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Drafting Module</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Transmission Title</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Identify your story..."
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Visual Source URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all outline-none"
                    placeholder="https://visuals.source.com/..."
                    value={blogImg}
                    onChange={(e) => setBlogImg(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Narrative Content</label>
                <div className="relative group">
                  <div className="absolute top-5 left-0 pl-5 pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                    <FontAwesomeIcon icon={faInfo} />
                  </div>
                  <textarea
                    rows="5"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all outline-none resize-none"
                    placeholder="Share the signal..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-2xl font-black text-xl hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center space-x-4 transform active:scale-[0.98] uppercase tracking-widest"
              >
                <span>Initialize Feed</span>
                <FontAwesomeIcon icon={faPaperPlane} className="text-indigo-200" />
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
