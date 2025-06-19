import api from "@/services/api";
import { Bonus } from "@/types/bonus";
import { BonusPurchaseRequest } from "@/types/bonus";

export async function fetchBonuses(): Promise<Bonus[]> {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bonuses`);
  if (!response.ok) {
    throw new Error("Bonuses konnten nicht geladen werden");
  }
  return response.json();
}

export const buyBonus = async (bonusId: string, userId: string): Promise<string> => {
    try {
        const res = await api.post("/shop/buy", {
            userId,
            bonusId,
        });
        return res.data;
    } catch (err: any) {
        if (err.response) {
            console.error("Fehler beim Kauf:", err.response.data);
            throw new Error(err.response.data);
        }
        throw err;
    }
};



