"use client";

import {
  Business,
  Customer,
  Feedback,
  Coupon,
  Campaign,
  DashboardMetrics,
  CouponType,
} from "./types";
import {
  initialBusiness,
  initialCustomers,
  initialFeedbacks,
  initialCoupons,
  initialCampaigns,
  initialMetrics,
} from "./initial-data";

const STORAGE_KEYS = {
  BUSINESS: "reviewflow_business",
  CUSTOMERS: "reviewflow_customers",
  FEEDBACKS: "reviewflow_feedbacks",
  COUPONS: "reviewflow_coupons",
  CAMPAIGNS: "reviewflow_campaigns",
  METRICS: "reviewflow_metrics",
};

// Safe localStorage access
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Error reading localStorage:", e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error writing localStorage:", e);
  }
}

export class ReviewFlowStore {
  private static instance: ReviewFlowStore;

  private business: Business = initialBusiness;
  private customers: Customer[] = initialCustomers;
  private feedbacks: Feedback[] = initialFeedbacks;
  private coupons: Coupon[] = initialCoupons;
  private campaigns: Campaign[] = initialCampaigns;
  private metrics: DashboardMetrics = initialMetrics;
  private listeners: Set<() => void> = new Set();

  private constructor() {
    if (typeof window !== "undefined") {
      this.business = loadFromStorage(STORAGE_KEYS.BUSINESS, initialBusiness);
      this.customers = loadFromStorage(STORAGE_KEYS.CUSTOMERS, initialCustomers);
      this.feedbacks = loadFromStorage(STORAGE_KEYS.FEEDBACKS, initialFeedbacks);
      this.coupons = loadFromStorage(STORAGE_KEYS.COUPONS, initialCoupons);
      this.campaigns = loadFromStorage(STORAGE_KEYS.CAMPAIGNS, initialCampaigns);
      this.metrics = loadFromStorage(STORAGE_KEYS.METRICS, initialMetrics);
    }
  }

  public static getInstance(): ReviewFlowStore {
    if (!ReviewFlowStore.instance) {
      ReviewFlowStore.instance = new ReviewFlowStore();
    }
    return ReviewFlowStore.instance;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    if (typeof window !== "undefined") {
      saveToStorage(STORAGE_KEYS.BUSINESS, this.business);
      saveToStorage(STORAGE_KEYS.CUSTOMERS, this.customers);
      saveToStorage(STORAGE_KEYS.FEEDBACKS, this.feedbacks);
      saveToStorage(STORAGE_KEYS.COUPONS, this.coupons);
      saveToStorage(STORAGE_KEYS.CAMPAIGNS, this.campaigns);
      saveToStorage(STORAGE_KEYS.METRICS, this.recalculateMetrics());
    }
    this.listeners.forEach((l) => l());
  }

  public getBusiness(): Business {
    return { ...this.business };
  }

  public updateBusiness(updates: Partial<Business>): void {
    this.business = { ...this.business, ...updates };
    this.notify();
  }

  public getCustomers(): Customer[] {
    return [...this.customers];
  }

  public getCustomerById(id: string): Customer | undefined {
    return this.customers.find((c) => c.id === id);
  }

  public getFeedbacks(): Feedback[] {
    return [...this.feedbacks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getFeedbackById(id: string): Feedback | undefined {
    return this.feedbacks.find((f) => f.id === id);
  }

  public getCoupons(): Coupon[] {
    return [...this.coupons].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getCouponByIdOrCode(query: string): Coupon | undefined {
    const q = query.trim().toUpperCase();
    return this.coupons.find(
      (c) =>
        c.code.toUpperCase() === q ||
        c.token.toUpperCase() === q ||
        c.id.toUpperCase() === q
    );
  }

  public getCampaigns(): Campaign[] {
    return [...this.campaigns];
  }

  public getMetrics(): DashboardMetrics {
    return this.recalculateMetrics();
  }

  // --- ACTIONS ---

  public submitCustomerFeedback(params: {
    name: string;
    email: string;
    phone?: string;
    rating: number;
    comment: string;
    negativeReasons?: string[];
    positiveHighlights?: string[];
    wantsContact: boolean;
    channel?: string;
  }): { feedback: Feedback; coupon?: Coupon } {
    const now = new Date().toISOString();
    const isPromoter = params.rating >= this.business.minStarsForGoogle;

    // Find or create customer
    let customer = this.customers.find(
      (c) => c.email.toLowerCase() === params.email.toLowerCase()
    );

    if (!customer) {
      customer = {
        id: `cust-${Date.now()}`,
        businessId: this.business.id,
        name: params.name,
        email: params.email,
        phone: params.phone || "",
        visitsCount: 1,
        averageRating: params.rating,
        tags: [isPromoter ? "Promotor" : "Requiere Atención"],
        createdAt: now,
        lastVisitAt: now,
      };
      this.customers.unshift(customer);
    } else {
      customer.visitsCount += 1;
      customer.averageRating = Number(
        ((customer.averageRating * (customer.visitsCount - 1) + params.rating) /
          customer.visitsCount).toFixed(1)
      );
      customer.lastVisitAt = now;
      if (!isPromoter && !customer.tags.includes("Requiere Atención")) {
        customer.tags.push("Requiere Atención");
      }
    }

    // Generate Coupon for the customer (Loyalty reward or recovery courtesy)
    const couponCode = `${isPromoter ? "GRACIAS" : "RECUPERA"}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);

    const coupon: Coupon = {
      id: `coup-${Date.now()}`,
      businessId: this.business.id,
      customerId: customer.id,
      customerName: customer.name,
      feedbackId: `fb-${Date.now()}`,
      code: couponCode,
      token: `tok-${Date.now().toString(36)}`,
      title: isPromoter
        ? "Copa de Vino o Postre de Cortesía"
        : "Cortesía Especial: 20% OFF en tu próxima visita",
      description: isPromoter
        ? "Válido en tu próxima visita por haber compartido tu experiencia."
        : "Queremos compensar tu experiencia y darte la bienvenida nuevamente.",
      type: isPromoter ? ("free_item" as CouponType) : ("percentage" as CouponType),
      discountValue: isPromoter ? 100 : 20,
      expiresAt: expiresDate.toISOString(),
      status: "active",
      createdAt: now,
    };

    const feedback: Feedback = {
      id: coupon.feedbackId,
      businessId: this.business.id,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      requestId: `req-${Date.now()}`,
      rating: params.rating,
      comment: params.comment,
      negativeReasons: params.negativeReasons,
      positiveHighlights: params.positiveHighlights,
      wantsContact: params.wantsContact,
      status: isPromoter ? "reviewed" : "escalated",
      recoveryStatus: isPromoter ? "not_needed" : "open",
      channel: params.channel || "QR en Mesa",
      couponId: coupon.id,
      createdAt: now,
    };

    this.feedbacks.unshift(feedback);
    this.coupons.unshift(coupon);

    this.notify();
    return { feedback, coupon };
  }

  public validateAndRedeemCoupon(
    query: string,
    staffName: string = "Personal de Caja"
  ): { success: boolean; message: string; coupon?: Coupon } {
    const coupon = this.getCouponByIdOrCode(query);

    if (!coupon) {
      return {
        success: false,
        message: `El código "${query}" no fue encontrado en el sistema.`,
      };
    }

    if (coupon.status === "redeemed") {
      return {
        success: false,
        message: `Este cupón YA FUE CANJEADO el ${new Date(
          coupon.redeemedAt || ""
        ).toLocaleDateString("es-CL")} por ${coupon.redeemedByStaff || "personal"}.`,
        coupon,
      };
    }

    if (coupon.status === "expired" || new Date(coupon.expiresAt) < new Date()) {
      coupon.status = "expired";
      this.notify();
      return {
        success: false,
        message: `El cupón expiró el ${new Date(coupon.expiresAt).toLocaleDateString(
          "es-CL"
        )}.`,
        coupon,
      };
    }

    // Success: mark redeemed!
    coupon.status = "redeemed";
    coupon.redeemedAt = new Date().toISOString();
    coupon.redeemedByStaff = staffName;

    this.notify();
    return {
      success: true,
      message: `¡Cupón válido! Se aplicó con éxito: ${coupon.title}.`,
      coupon,
    };
  }

  public resolveRecoveryCase(
    feedbackId: string,
    notes: string,
    offeredBenefit: string
  ): void {
    const fb = this.feedbacks.find((f) => f.id === feedbackId);
    if (fb) {
      fb.recoveryStatus = "resolved";
      fb.status = "resolved";
      fb.resolvedAt = new Date().toISOString();
      fb.resolutionNotes = `${notes} | Compensación: ${offeredBenefit}`;
      this.notify();
    }
  }

  public createCampaign(campaign: Omit<Campaign, "id" | "createdAt" | "sentCount" | "completedCount" | "responseRate" | "averageRating">): Campaign {
    const newCamp: Campaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      sentCount: 0,
      completedCount: 0,
      responseRate: 0,
      averageRating: 5.0,
      createdAt: new Date().toISOString(),
    };
    this.campaigns.unshift(newCamp);
    this.notify();
    return newCamp;
  }

  private recalculateMetrics(): DashboardMetrics {
    const totalFeedbacks = this.feedbacks.length;
    const avgRating =
      totalFeedbacks > 0
        ? Number(
            (
              this.feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
              totalFeedbacks
            ).toFixed(2)
          )
        : 5.0;

    const activeRecoveryCases = this.feedbacks.filter(
      (f) => f.recoveryStatus === "open" || f.recoveryStatus === "contacted"
    ).length;

    const totalCouponsIssued = this.coupons.length;
    const totalCouponsRedeemed = this.coupons.filter(
      (c) => c.status === "redeemed"
    ).length;

    const redemptionRate =
      totalCouponsIssued > 0
        ? Number(((totalCouponsRedeemed / totalCouponsIssued) * 100).toFixed(1))
        : 0;

    const googleRedirects = this.feedbacks.filter(
      (f) => f.rating >= this.business.minStarsForGoogle
    ).length;

    return {
      totalFeedbacks,
      averageRating: avgRating,
      ratingDelta: 0.35,
      responseRatePercentage: 68.4,
      activeRecoveryCases,
      totalCouponsIssued,
      totalCouponsRedeemed,
      redemptionRatePercentage: redemptionRate,
      googleReviewsRedirected: googleRedirects,
      estimatedRecoveredRevenue: activeRecoveryCases * 45000 + 480000,
    };
  }
}

export const store = ReviewFlowStore.getInstance();
