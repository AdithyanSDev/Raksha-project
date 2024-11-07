// src/controllers/UserAlertController.ts

import { Request, Response } from "express";
import { AlertService } from "../services/AlertService";

export class UserAlertController {
  private alertService: AlertService;

  constructor() {
    this.alertService = new AlertService();
  }

  // Endpoint to fetch both GDACS and custom alerts for the user
  async getAlertsForUser(req: Request, res: Response): Promise<Response> {
    try {
      const alerts = await this.alertService.getCustomAlerts();
      return res.status(200).json({ success: true, alerts });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error fetching alerts", error });
    }
  }
}
