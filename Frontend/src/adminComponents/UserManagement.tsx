import React, { useEffect, useState } from "react";
import { fetchUsers, toggleUserStatus, IUser } from "../services/UserService";
import Sidebar from "./Sidebar";

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                // Filter out users with the role of "admin"
                const nonAdminUsers = fetchedUsers.filter(user => user.role !== "admin");
                setUsers(nonAdminUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        getUsers();
    }, []);

    const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
        try {
            const updatedUser = await toggleUserStatus(userId, !currentStatus);
            setUsers(prevUsers => 
                prevUsers.map(user => user._id === userId ? { ...user, isBlocked: !currentStatus } : user)
            );
        } catch (error) {
            console.error("Failed to update user status:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-4/5 p-5">
                <h2 className="text-2xl font-bold mb-4">User Management</h2>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">Username</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleToggleStatus(user._id, user.isBlocked)}
                                        className={`p-2 rounded ${user.isBlocked ? "bg-red-500" : "bg-green-500"} text-white`}
                                    >
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
