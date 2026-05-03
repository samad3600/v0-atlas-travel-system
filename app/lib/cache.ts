import { CachedPlan, TravelPlanInput } from "./agents/types";

const CACHE_PREFIX = "atlas_plan_";
const CACHE_LIST_KEY = "atlas_plan_list";

export const cacheManager = {
  savePlan(input: TravelPlanInput, generatedPlan: string): string {
    const id = `${input.destination}_${Date.now()}`;
    const plan: CachedPlan = {
      ...input,
      id,
      generatedPlan,
      timestamp: Date.now(),
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CACHE_PREFIX + id, JSON.stringify(plan));

        // Update list of plans
        const list = cacheManager.listPlans();
        const newList = [
          { id, destination: input.destination, timestamp: plan.timestamp },
          ...list,
        ].slice(0, 20); // Keep last 20 plans
        localStorage.setItem(CACHE_LIST_KEY, JSON.stringify(newList));

        return id;
      } catch (e) {
        console.error("[v0] Error saving plan to cache:", e);
        return id;
      }
    }
    return id;
  },

  loadPlan(id: string): CachedPlan | null {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem(CACHE_PREFIX + id);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.error("[v0] Error loading plan from cache:", e);
        return null;
      }
    }
    return null;
  },

  listPlans(): Array<{
    id: string;
    destination: string;
    timestamp: number;
  }> {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem(CACHE_LIST_KEY);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error("[v0] Error listing plans from cache:", e);
        return [];
      }
    }
    return [];
  },

  clearCache(): void {
    if (typeof window !== "undefined") {
      try {
        const list = cacheManager.listPlans();
        list.forEach((item) => {
          localStorage.removeItem(CACHE_PREFIX + item.id);
        });
        localStorage.removeItem(CACHE_LIST_KEY);
      } catch (e) {
        console.error("[v0] Error clearing cache:", e);
      }
    }
  },

  deletePlan(id: string): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(CACHE_PREFIX + id);
        const list = cacheManager.listPlans();
        const newList = list.filter((item) => item.id !== id);
        localStorage.setItem(CACHE_LIST_KEY, JSON.stringify(newList));
      } catch (e) {
        console.error("[v0] Error deleting plan from cache:", e);
      }
    }
  },
};
