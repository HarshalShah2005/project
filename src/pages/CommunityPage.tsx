import React from 'react';

const CommunityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Research Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Discussion Forums */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Discussion Forums</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
              <h3 className="font-medium">Machine Learning Research</h3>
              <p className="text-sm text-gray-600">42 active discussions</p>
            </li>
            <li className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
              <h3 className="font-medium">Data Science</h3>
              <p className="text-sm text-gray-600">28 active discussions</p>
            </li>
            <li className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
              <h3 className="font-medium">Computer Science</h3>
              <p className="text-sm text-gray-600">35 active discussions</p>
            </li>
          </ul>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium">New research paper shared</p>
              <p className="text-sm text-gray-600">by John Doe • 2 hours ago</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">Question about methodology</p>
              <p className="text-sm text-gray-600">by Jane Smith • 5 hours ago</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">Conference announcement</p>
              <p className="text-sm text-gray-600">by Admin • 1 day ago</p>
            </div>
          </div>
        </div>

        {/* Members Online */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Members Online</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full"></div>
              <div>
                <p className="font-medium">Alice Johnson</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full"></div>
              <div>
                <p className="font-medium">Bob Wilson</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full"></div>
              <div>
                <p className="font-medium">Carol Martinez</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;