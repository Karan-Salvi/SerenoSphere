import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetMySessionsQuery,
  useDeleteSessionMutation,
} from "../store/api/sessionApi";
import SessionCard from "../components/Sessions/SessionCard";
import Layout from "../components/Layout/Layout";
import { Loader2, Plus } from "lucide-react";
import { useSelector } from "react-redux";

const MySessions = () => {
  const [activeTab, setActiveTab] = useState("drafts");
  const navigate = useNavigate();
  const { data: sessions, isLoading, error } = useGetMySessionsQuery();
  const [deleteSession] = useDeleteSessionMutation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("sessions user : ", user);

  const handleEdit = (session) => {
    navigate(`/edit-session/${session._id}`);
  };

  const handleDelete = async (sessionId) => {
    try {
      await deleteSession(sessionId).unwrap();
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const filteredSessions =
    sessions?.filter((session) =>
      activeTab === "drafts"
        ? session.status === "draft"
        : session.status === "published"
    ) || [];

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unable to load sessions
            </h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Wellness Sessions
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your drafts and published sessions.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-session")}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Session</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("drafts")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "drafts"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => setActiveTab("published")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "published"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Published
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                isOwner={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
                userName={user?.email}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} sessions yet
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "drafts"
                  ? "Start creating your first wellness session draft."
                  : "Publish your first session to see it here."}
              </p>
              <button
                onClick={() => navigate("/create-session")}
                className="btn-primary"
              >
                Create New Session
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MySessions;
