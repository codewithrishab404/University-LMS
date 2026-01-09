const ProfileCard = ({ profile }) => (
  <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
    <h2 className="text-xl font-semibold mb-4">Profile</h2>
    <p className="text-gray-300">Email: {profile.email}</p>
    <p className="text-gray-300">Salary: ₹{profile.salary}</p>
    <p className="text-gray-300">DOB: {profile.dob}</p>
  </div>
);
export default ProfileCard;
