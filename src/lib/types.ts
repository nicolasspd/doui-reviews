export type BusinessCategory =
  | "restaurant"
  | "barbershop"
  | "clinic"
  | "gym"
  | "spa"
  | "automotive"
  | "real_estate"
  | "retail"
  | "professional_services";

export interface Business {
  id: string;
  name: string;
  slug: string;
  category: BusinessCategory;
  phone: string;
  address: string;
  googleReviewUrl: string;
  googlePlaceId?: string;
  minStarsForGoogle: number; // typically 4 or 5
  primaryColor: string;
  welcomeMessage: string;
  thankYouMessage: string;
  logoUrl?: string;
  bgType?: "gradient" | "color" | "preset_image" | "custom_image";
  bgColor?: string;
  bgGradient?: string;
  bgPresetImage?: string;
  bgCustomImage?: string;
  bgOverlayOpacity?: number;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
  visitsCount: number;
  averageRating: number;
  tags: string[];
  createdAt: string;
  lastVisitAt: string;
}

export type FeedbackRequestStatus = "pending" | "sent" | "opened" | "completed" | "expired";

export interface FeedbackRequest {
  id: string;
  businessId: string;
  customerId: string;
  token: string;
  channel: "qr_instore" | "email" | "whatsapp" | "sms";
  status: FeedbackRequestStatus;
  sentAt: string;
  openedAt?: string;
  completedAt?: string;
}

export type FeedbackStatus = "new" | "reviewed" | "escalated" | "resolved";
export type RecoveryStatus = "not_needed" | "open" | "contacted" | "compensated" | "resolved" | "lost";

export interface Feedback {
  id: string;
  businessId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  requestId: string;
  rating: number; // 1 to 5
  comment: string;
  negativeReasons?: string[]; // e.g., ["Tiempo de espera", "Atención del personal", "Calidad/Precio"]
  positiveHighlights?: string[]; // e.g., ["Rapidez", "Excelente ambiente", "Calidad del servicio"]
  wantsContact: boolean;
  status: FeedbackStatus;
  recoveryStatus: RecoveryStatus;
  channel: string;
  serviceOrStaff?: string;
  couponId?: string;
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export type CouponType = "percentage" | "fixed_amount" | "free_item" | "second_visit";
export type CouponStatus = "active" | "redeemed" | "expired" | "cancelled";

export interface Coupon {
  id: string;
  businessId: string;
  customerId: string;
  customerName: string;
  feedbackId: string;
  code: string;
  token: string;
  title: string;
  description: string;
  type: CouponType;
  discountValue: number; // e.g. 20 for 20%, 5000 for $5.000 CLP
  minPurchaseAmount?: number;
  expiresAt: string;
  status: CouponStatus;
  createdAt: string;
  redeemedAt?: string;
  redeemedByStaff?: string;
}

export interface Campaign {
  id: string;
  businessId: string;
  name: string;
  channel: "qr_table" | "post_service_email" | "whatsapp_auto";
  status: "active" | "paused" | "draft";
  delayHours: number;
  rewardCouponTitle: string;
  rewardDiscountValue: number;
  rewardType: CouponType;
  sentCount: number;
  completedCount: number;
  responseRate: number;
  averageRating: number;
  createdAt: string;
}

export interface DashboardMetrics {
  totalFeedbacks: number;
  averageRating: number;
  ratingDelta: number;
  responseRatePercentage: number;
  activeRecoveryCases: number;
  totalCouponsIssued: number;
  totalCouponsRedeemed: number;
  redemptionRatePercentage: number;
  googleReviewsRedirected: number;
  estimatedRecoveredRevenue: number;
}
