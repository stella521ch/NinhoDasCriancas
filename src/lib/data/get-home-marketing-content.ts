import {
  HOME_FIELD_TO_DB_KEY,
  type HomeMarketingField,
} from "@/lib/constants/home-page-content-keys";
import {
  HOME_MARKETING_DEFAULTS_KO,
  type HomeMarketingContent,
} from "@/lib/data/home-marketing-shared";
import { getSupabaseServer } from "@/lib/supabase/supabase-server-optional";
import { normalizeBrandName } from "@/lib/text/normalize-brand";

export async function getHomeMarketingContent(): Promise<HomeMarketingContent> {
  const supabase = getSupabaseServer();
  const keys = Object.values(HOME_FIELD_TO_DB_KEY);

  if (supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value")
      .in("key", keys);

    if (!error && data != null) {
      const map = new Map(
        data.map((r) => [r.key as string, r.value as string | null | undefined])
      );
      const out = { ...HOME_MARKETING_DEFAULTS_KO };
      for (const field of Object.keys(HOME_FIELD_TO_DB_KEY) as HomeMarketingField[]) {
        const dbKey = HOME_FIELD_TO_DB_KEY[field];
        const v = map.get(dbKey);
        if (v != null && v !== "") out[field] = normalizeBrandName(v);
      }
      return out;
    }
  }

  return { ...HOME_MARKETING_DEFAULTS_KO };
}
