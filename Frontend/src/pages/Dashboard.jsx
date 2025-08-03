import React from "react";
import { useGetPublicSessionsQuery } from "../store/api/sessionApi";
import SessionCard from "../components/Sessions/SessionCard";
import Layout from "../components/Layout/Layout";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data: sessions, isLoading, error } = useGetPublicSessionsQuery();

  console.log("sessions on dashboard", sessions);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Inner Calm
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore a collection of wellness sessions designed to nurture your
            mind, body, and soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                userName={session.userId.email}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No sessions available
              </h3>
              <p className="text-gray-600">
                Check back later for new wellness sessions.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
