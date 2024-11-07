import { Request, Response } from "express";
import { VolunteerService } from "../services/VolunteerService";
import { UserService } from "../services/UserService";
import { IVolunteer } from "../models/Volunteer";

const volunteerService = new VolunteerService();
const userService = new UserService();

export class VolunteerController {
    async   registerVolunteer(req: Request, res: Response) {
        const { userId, role, skills, experience, location } = req.body;
    
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const volunteerData: Partial<IVolunteer> = {
                userId,
                name: user.username,
                email: user.email,
                phone: user.phoneNumber,
                profilePicture: user.profilePicture,
                role,
                skills,
                experience,
                location,
                status: 'Requested' as 'Requested' // Corrected typing
            };
    
            const savedVolunteer: IVolunteer = await volunteerService.registerVolunteer(volunteerData);

        // Convert savedVolunteer._id to string if userService expects a string
        await userService.linkVolunteerToUser(userId, savedVolunteer._id.toString());
    
            res.status(201).json(savedVolunteer);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Server error", error: error.message });
            } else {
                res.status(500).json({ message: "Server error", error: "An unknown error occurred" });
            }
        }
    }
    

    async getVolunteer(req: Request, res: Response) {
        try {
            const volunteer = await volunteerService.getVolunteer(req.params.userId);
            if (!volunteer) {
                return res.status(404).json({ message: "Volunteer not found" });
            }
            res.status(200).json(volunteer);
        } catch (error:any) {
            res.status(500).json({ error: "Error fetching volunteer data", detail: error.message });
        }
    }

    async updateVolunteer(req: Request, res: Response) {
        try {
            const updatedVolunteer = await volunteerService.updateVolunteer(
                req.params.userId,
                req.body
            );
            if (!updatedVolunteer) {
                return res.status(404).json({ message: "Volunteer not found" });
            }
            res.status(200).json(updatedVolunteer);
        } catch (error:any) {
            res.status(500).json({ error: "Error updating volunteer", detail: error.message });
        }
    }

    async getAllVolunteers(req: Request, res: Response) {
        try {
            const volunteers: IVolunteer[] = await volunteerService.getAllVolunteers();
            res.status(200).json(volunteers);
        } catch (error: any) {
            res.status(500).json({ error: "Error fetching all volunteers", detail: error.message });
        }
    }


    async getPendingVolunteers(req: Request, res: Response) {
        try {
            const pendingVolunteers = await volunteerService.getVolunteersByStatus("Requested");
            res.status(200).json(pendingVolunteers);
        } catch (error:any) {
            res.status(500).json({ error: "Error fetching pending volunteers", detail: error.message });
        }
    }

    async approveVolunteer(req: Request, res: Response) {
        const volunteerId = req.params.volunteerId;
        try {
            const approvedVolunteer = await volunteerService.updateVolunteerStatus(volunteerId,"Approved");
            if (!approvedVolunteer) {
                return res.status(404).json({ message: "Volunteer not found" });
            }
            res.status(200).json({ message: "Volunteer approved successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to approve volunteer" });
        }
    }
    
    async rejectVolunteer(req: Request, res: Response) {
        try {
            const updatedVolunteer = await volunteerService.updateVolunteerStatus(req.params.volunteerId, "Rejected");
            if (!updatedVolunteer) {
                return res.status(404).json({ message: "Volunteer not found" });
            }
            res.status(200).json(updatedVolunteer);
        } catch (error:any) {
            res.status(500).json({ error: "Error rejecting volunteer", detail: error.message });
        }
    }
    async checkVolunteerStatus(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.params;
    
            // Get the user details
            const user = await userService.getUserById(userId);
            if (!user || !user.volunteerId) {
                return res.status(404).json({ message: "User or volunteer not found" });
            }
    
            // Convert the ObjectId to a string
            const volunteerId = user.volunteerId.toString();
            console.log(volunteerId)
            // Now, check if the volunteer's status is 'Approved'
            const isVolunteer = await volunteerService.checkIfUserIsApprovedVolunteer(volunteerId);
            console.log(isVolunteer)
            return res.json({ isVolunteer });
        } catch (error) {
            console.error('Error in VolunteerController:', error);
            return res.status(500).json({ error: 'Failed to check volunteer status' });
        }
    }
    
}