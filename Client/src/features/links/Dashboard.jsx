import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaLink,
  FaTrashRestore,
    FaFileImport,
  FaChartBar,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  Reorder,
} from "motion/react";

import { useReorderLinks } from "./useReorderLinks";

import { FaUserCog } from "react-icons/fa";
import ProfileSettingsModal from "../profile/ProfileSettingsModal";

import { useAuth } from "../auth/useAuth";
import { useLogout } from "../auth/useLogout";

import { useMyLinks } from "./useMyLinks";

import CreateLinkForm from "./CreateLinkForm";
import LinkCard from "./LinkCard";
import EditLinkModal from "./EditLinkModal";
import DeleteLinkModal from "./DeleteLinkModal";

import { FaQrcode } from "react-icons/fa";
import ProfileQrModal from "../profile/ProfileQrModal";
import ImportLinktreeModal from "./ImportLinktreeModal.jsx";

function Dashboard() {

  const [
  importModalOpen,
  setImportModalOpen,
] = useState(false);
  const { data: authData } = useAuth();
  const { data, isLoading } = useMyLinks();

  const [qrOpen, setQrOpen] =
  useState(false);
  const { mutate: logout } = useLogout();

  const [editingLink, setEditingLink] =
    useState(null);

  const [deletingLink, setDeletingLink] =
    useState(null);

    const [profileSettingsOpen,
  setProfileSettingsOpen] =
  useState(false);

  const links = data?.links || [];

  const [orderedLinks, setOrderedLinks] =
  useState([]);

const {
  mutate: reorderLinks,
} = useReorderLinks();

useEffect(() => {
  setOrderedLinks(links);
}, [links]);

  const profileUrl = `/${authData?.user?.username}`;

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${authData?.user?.username}`
    );

    toast.success("Profile URL copied");
  };



  return (
    <div className="min-h-screen bg-black">


      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-6">
        {/* TOP CARDS */}
        <div className="grid lg:grid-cols-5 gap-4 mb-8">
          {/* TOTAL LINKS */}
          <button
  onClick={() =>
    setImportModalOpen(true)
  }
  className="
    rounded-3xl
    border
    border-zinc-800
    bg-zinc-900
    p-6
    text-left
    hover:border-lime-400
    hover:-translate-y-1
    transition-all
    duration-300
    cursor-pointer
  "
>
  <p className="text-zinc-500 text-sm">
    Import Links
  </p>

  <div className="flex items-center justify-between mt-3">
    <span className="text-white text-xl font-bold">
      Linktree
    </span>

    <FaFileImport className="text-lime-400" />
  </div>
</button>

          {/* PROFILE URL */}
          <button
            onClick={handleCopyProfile}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              text-left
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <p className="text-zinc-500 text-sm">
              Copy Profile URL
            </p>

            <p className="text-white mt-3 font-medium truncate">
              /{authData?.user?.username}
            </p>
          </button>

          {/* PROFILE QR CODE */}
          <button
  onClick={() => setQrOpen(true)}
  className="
    rounded-3xl
    border
    border-zinc-800
    bg-zinc-900
    p-6
    text-left
    hover:border-lime-400
    hover:-translate-y-1
    transition-all
    duration-300
    cursor-pointer
  "
>
  <p className="text-zinc-500 text-sm">
    Profile QR
  </p>

  <div className="flex items-center justify-between mt-3">
    <span className="text-white text-xl font-bold">
      Open
    </span>

    <FaQrcode className="text-lime-400" />
  </div>
</button>

          {/* ANALYTICS */}
          <Link
            to="/dashboard/analytics"
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <p className="text-zinc-500 text-sm">
              Analytics
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-white text-xl font-bold">
                View
              </span>

              <FaChartBar className="text-lime-400" />
            </div>
          </Link>


{/* edit profile */}
          <button
  onClick={() =>
    setProfileSettingsOpen(true)
  }
  className="
    rounded-3xl
    border
    border-zinc-800
    bg-zinc-900
    p-6
    text-left
    hover:border-lime-400
    hover:-translate-y-1
    transition-all
    duration-300
    cursor-pointer
  "
>
  <p className="text-zinc-500 text-sm">
    Profile Settings
  </p>

  <div className="flex items-center justify-between mt-3">
    <span className="text-white text-xl font-bold">
      Edit
    </span>

    <FaUserCog className="text-lime-400" />
  </div>
</button>
        </div>

        {/* CREATE LINK */}
        <div className="mb-8">
          <CreateLinkForm />
        </div>

        {/* LINKS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">
              Your Links
            </h2>

            <span className="text-zinc-500">
              {links.length} links
            </span>
          </div>

          {isLoading ? (
            <div className="text-zinc-500">
              Loading links...
            </div>
          ) : links.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
              <p className="text-zinc-400 text-lg">
                No links yet
              </p>

              <p className="text-zinc-600 mt-2">
                Create your first link and start sharing.
              </p>
            </div>
          ) : (
           <Reorder.Group
  axis="y"
  values={orderedLinks}
  onReorder={(newOrder) => {
    setOrderedLinks(newOrder);

    reorderLinks(
      newOrder.map(
        (link, index) => ({
          id: link._id,
          order: index + 1,
        })
      )
    );
  }}
  className="
   flex flex-col gap-4
  "
>
  {orderedLinks.map((link) => (
    <Reorder.Item
      key={link._id}
      value={link}
      className="cursor-grab"
    >
      <LinkCard
        link={link}
        onEdit={setEditingLink}
        onDelete={setDeletingLink}
      />
    </Reorder.Item>
  ))}
</Reorder.Group>
          )}
        </section>
      </main>

      {/* MODALS */}
      {editingLink && (
        <EditLinkModal
          link={editingLink}
          onClose={() =>
            setEditingLink(null)
          }
        />
      )}

      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onClose={() =>
            setDeletingLink(null)
          }
        />
      )}

      {profileSettingsOpen && (
  <ProfileSettingsModal
    user={authData?.user}
    onClose={() =>
      setProfileSettingsOpen(false)
    }
  />
)}
{qrOpen && (
  <ProfileQrModal
    profileUrl={`${window.location.origin}/${authData?.user?.username}`}
    onClose={() =>
      setQrOpen(false)
    }
  />
)}
{
  importModalOpen && (
    <ImportLinktreeModal
      onClose={() =>
        setImportModalOpen(false)
      }
    />
  )
}
    </div>
  );
}

export default Dashboard;