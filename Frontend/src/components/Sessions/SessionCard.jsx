import React from "react";
import { Clock, Users, Star, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const SessionCard = ({
  session,
  isOwner = false,
  onEdit,
  onDelete,
  userName,
}) => {
  const getStatusBadge = (status) => {
    if (status === "draft") {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          Draft
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        Published
      </span>
    );
  };

  return (
    <div className="card group">
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/3822187/pexels-photo-3822187.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt={session.title}
          className="w-full h-48 object-cover"
        />
        {isOwner && (
          <div className="absolute top-3 right-3">
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <MoreHorizontal className="w-4 h-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onEdit(session)}
                          className={`${
                            active ? "bg-gray-50" : ""
                          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          <Edit className="w-4 h-4 mr-3" />
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onDelete(session._id)}
                          className={`${
                            active ? "bg-red-50 text-red-600" : "text-red-600"
                          } flex items-center w-full px-4 py-2 text-sm`}
                        >
                          <Trash2 className="w-4 h-4 mr-3" />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
        {session.status && (
          <div className="absolute top-3 left-3">
            {getStatusBadge(session.status)}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              12 Trainees
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />4 Lessons
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {session.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {session.description ||
            "Start your day with a guided meditation to cultivate presence and peace."}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500">Class Progress</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500">Top Trainees</div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-2 border-white"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {userName?.replace("@gmail.com", "")}
                </div>
                <div className="text-xs text-gray-500">Instructor</div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>
        </div>

        {session.tags && session.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {session.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
