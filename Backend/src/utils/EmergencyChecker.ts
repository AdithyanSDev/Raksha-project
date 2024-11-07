// utils/emergencyChecker.ts
export function isEmergency(message: string): boolean {
    const emergencyKeywords = ["help", "urgent", "emergency"];
    return emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }
  