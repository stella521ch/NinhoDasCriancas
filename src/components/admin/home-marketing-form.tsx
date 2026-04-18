"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { saveHomeMarketingAction } from "@/app/admin/(dashboard)/pages/actions";
import {
  HOME_MARKETING_FORM_FIELDS,
  type HomeMarketingField,
} from "@/lib/constants/home-page-content-keys";
import type { HomeMarketingContent } from "@/lib/data/home-page-content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "flex min-h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
  "outline-none ring-offset-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
);

type FormState = { error?: string; ok?: boolean };

const initialFormState: FormState = {};

export function HomeMarketingForm({
  content,
}: {
  content: HomeMarketingContent;
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(
    saveHomeMarketingAction,
    initialFormState
  );
  const lastOk = useRef(false);

  useEffect(() => {
    if (state.ok && !lastOk.current) {
      lastOk.current = true;
      router.refresh();
    }
    if (!state.ok) lastOk.current = false;
  }, [state.ok, router]);

  let lastSection = "";
  return (
    <form action={formAction} className="space-y-10">
      {state.error ? (
        <p
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-primary" role="status">
          저장되었습니다. 메인 페이지에 반영되었습니다.
        </p>
      ) : null}

      {HOME_MARKETING_FORM_FIELDS.map((spec) => {
        const showHeading = spec.section !== lastSection;
        lastSection = spec.section;
        return (
          <div key={spec.field} className="space-y-3">
            {showHeading ? (
              <h2 className="border-b border-border pb-2 font-heading text-lg font-semibold text-foreground">
                {spec.section}
              </h2>
            ) : null}
            <div className="space-y-2">
              <label
                htmlFor={spec.field}
                className="text-sm font-medium text-foreground"
              >
                {spec.label}
              </label>
              {spec.helper ? (
                <p className="text-xs text-muted-foreground">{spec.helper}</p>
              ) : null}
              {spec.multiline ? (
                <textarea
                  id={spec.field}
                  name={spec.field}
                  rows={4}
                  defaultValue={content[spec.field as HomeMarketingField]}
                  className={cn(inputClass, "min-h-24 resize-y")}
                />
              ) : (
                <input
                  id={spec.field}
                  name={spec.field}
                  type="text"
                  defaultValue={content[spec.field as HomeMarketingField]}
                  className={inputClass}
                />
              )}
            </div>
          </div>
        );
      })}

      <Button type="submit">저장</Button>
    </form>
  );
}
